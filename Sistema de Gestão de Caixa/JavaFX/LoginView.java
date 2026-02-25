import javafx.scene.*;
import javafx.scene.control.*;
import javafx.scene.layout.*;
import javafx.stage.Stage;
import java.util.*;

public class LoginView {

    Stage stage;

    public LoginView(Stage s){
        stage=s;
    }

    public void show(){

        TextField user = new TextField();
        PasswordField pass = new PasswordField();

        Button entrar = new Button("Entrar");
        Button cadastrar = new Button("Cadastrar");

        VBox root = new VBox(10,
                new Label("Usuário"),user,
                new Label("Senha"),pass,
                entrar,cadastrar);

        entrar.setOnAction(e->login(
                user.getText(),
                pass.getText()));

        cadastrar.setOnAction(e->cadastro(
                user.getText(),
                pass.getText()));

        stage.setScene(new Scene(root,300,250));
        stage.setTitle("Caixa Pro");
        stage.show();
    }

    void login(String u,String p){
        List<Usuario> lista=BancoDados.carregar();

        for(Usuario user:lista){
            if(user.user.equals(u)
            && user.pass.equals(p)){
                new DashboardView(stage,user).show();
                return;
            }
        }

        alerta("Login inválido");
    }

    void cadastro(String u,String p){
        List<Usuario> lista=BancoDados.carregar();

        lista.add(new Usuario(u,p));
        BancoDados.salvar(lista);

        alerta("Cadastrado");
    }

    void alerta(String msg){
        new Alert(Alert.AlertType.INFORMATION,msg).show();
    }
}
