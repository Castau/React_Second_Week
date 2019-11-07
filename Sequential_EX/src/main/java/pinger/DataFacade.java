package pinger;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

/**
 *
 * @author Camilla
 */
public class DataFacade {

    private ExecutorService executor = Executors.newCachedThreadPool();
    private List<Future<String>> futureList;
    private String url = "https://api.binance.com/api/v3/avgPrice?symbol=";

    public Map<String, Double> binancePricesList(final String[] symbols) throws InterruptedException, ExecutionException, TimeoutException {
        futureList = new ArrayList();
        Map<String, Double> result = new HashMap();

        for (int i = 0; i < symbols.length; i++) {
            final int count = i;
            Future<String> future = executor.submit(new Callable<String>() {
                @Override
                public String call() throws Exception {
                    String symbol = symbols[count];
                    String price = symbolPrice(url + symbol);
                    return symbol + "," + price;
                }
            });
            futureList.add(future);
        }
        for (int i = 0; i < futureList.size(); i++) {
            String temp = futureList.get(i).get(2, TimeUnit.SECONDS);
            String[] pair = temp.split(",");
            result.put(pair[0], Double.valueOf(pair[1]));
        }
        executor.shutdown();
        return result;
    }

    private String symbolPrice(String url) {
        String result = "";
        try {
            URL siteURL = new URL(url);
            HttpURLConnection connection = (HttpURLConnection) siteURL.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("Accept", "application/json;charset=UTF-8");
            try (Scanner scan = new Scanner(connection.getInputStream())) {
                String response = "";
                while(scan.hasNext()) {
                    response += scan.nextLine();
                }
                Gson gson = new Gson();
                result = gson.fromJson(response, JsonObject.class).get("price").toString();
                result = result.substring(1, result.length()-1);
            }
        } catch (Exception e) {
            result = "";
        }
        return result;
    }
}
