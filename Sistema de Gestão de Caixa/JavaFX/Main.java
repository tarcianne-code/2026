import javafx.application.Application;
import javafx.stage.Stage;

public class Main extends Application {

    @Override
    public void start(Stage stage) {
        LoginView login = new LoginView(stage);
        login.show();
    }

    public static void main(String[] args) {
        launch(args);
    }
}
