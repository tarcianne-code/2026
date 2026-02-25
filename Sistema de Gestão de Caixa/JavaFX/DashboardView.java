import javafx.scene.*;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;
import java.util.*;

public class DashboardView {

    Stage stage;
    Usuario usuario;

    String anoAtual;
    String mesAtual;

    ListView<String> lista = new ListView<>();
    TextArea tabela = new TextArea();

    public DashboardView(Stage s,Usuario u){
        stage=s;
        usuario=u;
    }

    public void show(){

        Button novoAno = new Button("Novo Ano");
        Button novoMes = new Button("Novo Mês");

        novoAno.setOnAction(e->criarAno());
        novoMes.setOnAction(e->criarMes());

        VBox left =
            new VBox(10,lista,novoAno,novoMes);

        TextField desc=new TextField();
        TextField valor=new TextField();

        ComboBox<String> tipo =
            new ComboBox<>();

        tipo.getItems().addAll(
            "Entrada","Saida");

        Button add=new Button("Adicionar");

        add.setOnAction(e->
            adicionar(desc.getText(),
            tipo.getValue(),
            Double.parseDouble(valor.getText()))
        );

        VBox center =
            new VBox(10,desc,valor,tipo,add,tabela);

        BorderPane root =
            new BorderPane(center,null,null,null,left);

        stage.setScene(new Scene(root,700,400));
        stage.show();
    }

    void criarAno(){
        TextInputDialog d =
            new TextInputDialog();

        d.showAndWait().ifPresent(ano->{
            usuario.dados.putIfAbsent(
                ano,new HashMap<>());
        });
    }

    void criarMes(){
        if(anoAtual==null)return;

        TextInputDialog d =
            new TextInputDialog();

        d.showAndWait().ifPresent(mes->{
            usuario.dados
            .get(anoAtual)
            .putIfAbsent(mes,new ArrayList<>());
        });
    }

    void adicionar(String desc,
                   String tipo,
                   double valor){

        Movimento m=
            new Movimento(
                "Hoje",tipo,desc,valor);

        usuario.dados
        .get(anoAtual)
        .get(mesAtual)
        .add(m);

        atualizar();
    }

    void atualizar(){

        List<Movimento> movs =
        usuario.dados
        .get(anoAtual)
        .get(mesAtual);

        double ent=0,sai=0;

        StringBuilder txt=
            new StringBuilder();

        for(Movimento m:movs){
            txt.append(
                m.descricao+" - "+
                m.valor+"\n");

            if(m.tipo.equals("Entrada"))
                ent+=m.valor;
            else sai+=m.valor;
        }

        txt.append("\nSaldo: "+(ent-sai));

        tabela.setText(txt.toString());
    }
}
