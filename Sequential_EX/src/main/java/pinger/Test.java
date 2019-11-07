/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package pinger;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

/**
 *
 * @author Camilla
 */
   public class Test {
   private static ExecutorService executor = Executors.newCachedThreadPool();
   
   private static List<Future<String>> futureList = new ArrayList();
   
   
   
   public static void main(String[] args) throws InterruptedException, ExecutionException {
       for (int i = 0; i < 100; i++) {
           Future<String> future = executor.submit(new Callable<String>() {
               @Override
               public String call() throws Exception {
                   return Thread.currentThread().getName();
               }
               
           });
           
           // get blokerer
           //String result = future.get();
           //System.out.println(result);
           futureList.add(future);
       }
       executor.shutdown();
       for (int i = 0; i < futureList.size(); i++) {
           System.out.println(futureList.get(i).get());
       }
       System.out.println("Finished");
       
   }
}