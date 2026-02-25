import java.io.Serializable;
import java.util.*;

public class Usuario implements Serializable {

    public String user;
    public String pass;

    public Map<String,
        Map<String, List<Movimento>>> dados = new HashMap<>();

    public Usuario(String u, String p){
        user = u;
        pass = p;
    }
}
