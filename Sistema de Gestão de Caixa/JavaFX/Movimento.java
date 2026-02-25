import java.io.Serializable;

public class Movimento implements Serializable {

    public String data;
    public String tipo;
    public String descricao;
    public double valor;

    public Movimento(String d,String t,String desc,double v){
        data=d;
        tipo=t;
        descricao=desc;
        valor=v;
    }
}
