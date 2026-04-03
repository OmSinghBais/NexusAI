package observer;

public class UserObserver implements Observer {
    public void update(String event) {
        System.out.println("Notification: " + event);
    }
}