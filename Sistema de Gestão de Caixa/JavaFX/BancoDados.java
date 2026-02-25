import java.io.*;
import java.util.*;

public class BancoDados {

    private static final String ARQ="dados.dat";

    public static List<Usuario> carregar(){
        try(ObjectInputStream o =
            new ObjectInputStream(new FileInputStream(ARQ))){
            return (List<Usuario>) o.readObject();
        }catch(Exception e){
            return new ArrayList<>();
        }
    }

    public static void salvar(List<Usuario> lista){
        try(ObjectOutputStream o =
            new ObjectOutputStream(new FileOutputStream(ARQ))){
            o.writeObject(lista);
        }catch(Exception e){
            e.printStackTrace();
        }
    }
}
