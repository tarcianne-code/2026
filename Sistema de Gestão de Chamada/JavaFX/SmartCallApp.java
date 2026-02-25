import javafx.application.Application;
import javafx.geometry.*;
import javafx.scene.Scene;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;

import java.time.LocalTime;
import java.util.*;

public class SmartCallApp extends Application {

    private Map<String, Aluno> alunos = new HashMap<>();
    private TextArea listaArea = new TextArea();
    private Label resultado = new Label();

    public static void main(String[] args) {
        launch(args);
    }

    @Override
    public void start(Stage stage) {

        // LOGIN
        TextField user = new TextField();
        PasswordField pass = new PasswordField();
        Button loginBtn = new Button("Entrar");

        VBox loginLayout = new VBox(10,
                new Label("SmartCall Login"),
                user,
                pass,
                loginBtn);

        loginLayout.setAlignment(Pos.CENTER);
        Scene loginScene = new Scene(loginLayout,400,300);

        // SISTEMA
        TextField nomeField = new TextField();
        ComboBox<String> serie =
                new ComboBox<>();
        serie.getItems().addAll("1º","2º","3º");

        ComboBox<String> curso =
                new ComboBox<>();
        curso.getItems().addAll(
                "Informática",
                "Enfermagem",
                "Guia");

        Button cadastrar = new Button("Cadastrar");

        TextField idBusca =
                new TextField();

        Button registrar =
                new Button("Registrar Entrada");

        listaArea.setEditable(false);

        VBox sistema = new VBox(10,
                new Label("Cadastro"),
                nomeField,
                serie,
                curso,
                cadastrar,
                new Separator(),
                new Label("Registrar Presença"),
                idBusca,
                registrar,
                resultado,
                new Separator(),
                new Label("Alunos"),
                listaArea);

        sistema.setPadding(new Insets(15));

        Scene sistemaScene =
                new Scene(sistema,600,600);

        // LOGIN ACTION
        loginBtn.setOnAction(e->{
            if(user.getText().equals("admin")
                    && pass.getText().equals("123")){
                stage.setScene(sistemaScene);
            }
        });

        // CADASTRO
        cadastrar.setOnAction(e->{

            String nome =
                    nomeField.getText();

            if(nome.isEmpty()) return;

            String id = gerarID(nome);

            alunos.put(id,
                    new Aluno(
                            id,
                            nome,
                            serie.getValue(),
                            curso.getValue()
                    ));

            atualizarLista();
            nomeField.clear();
        });

        // PRESENÇA
        registrar.setOnAction(e->{

            String id =
                    idBusca.getText().toUpperCase();

            Aluno a = alunos.get(id);

            if(a==null){
                resultado.setText("Aluno não encontrado");
                return;
            }

            LocalTime agora =
                    LocalTime.now();

            String status =
                    agora.isAfter(
                            LocalTime.of(7,10))
                            ? "Atraso"
                            : "Presente";

            resultado.setText(
                    a.nome+" - "+status);
        });

        stage.setTitle("SmartCall Desktop");
        stage.setScene(loginScene);
        stage.show();
    }

    private String gerarID(String nome){

        String base =
                nome.substring(0,
                        Math.min(3,nome.length()))
                        .toUpperCase();

        String id = base;
        int i=1;

        while(alunos.containsKey(id)){
            id = base+"-"+i++;
        }

        return id;
    }

    private void atualizarLista(){

        listaArea.clear();

        alunos.values().forEach(a->
                listaArea.appendText(
                        a.nome+
                        " | "+a.id+
                        " | "+a.serie+
                        " "+a.curso+"\n"));
    }

    class Aluno{
        String id,nome,serie,curso;

        Aluno(String id,
              String nome,
              String serie,
              String curso){

            this.id=id;
            this.nome=nome;
            this.serie=serie;
            this.curso=curso;
        }
    }
}
