package rest;

import java.util.Map;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import pinger.DataFacade;

/**
 *
 * @author Camilla
 */
@Path("pinger")
public class PingerResource {

    private static final DataFacade facade = new DataFacade();

    @GET
    @Produces({MediaType.APPLICATION_JSON})
    public String data() {
        return "{\"msg\": \"startdata created\"}";
    }

    // http://localhost:8080/Sequential_EX/api/pinger
    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Map prices(String[] symbols) throws Exception {
        return facade.binancePricesList(symbols);
    }
}
