
package pinger;

import com.google.gson.Gson;

/**
 *
 * @author Camilla
 */
public class TestMain {
    public static void main(String[] args) throws Exception {
        DataFacade facade = new DataFacade();
        Gson gson = new Gson();
        String[] symbols = {"ADATUSD","ATOMTUSD","BATTUSD","BNBTUSD","BTCTUSD","EOSTUSD","ETCTUSD","ETHTUSD","LTCTUSD","NEOTUSD","TRXTUSD","XRPTUSD"};
        System.out.println(gson.toJson(facade.binancePricesList(symbols)));
        
        
    }
}
