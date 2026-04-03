package context;

import observer.Observer;
import java.util.*;

public class ContextManager {

    private List<Observer> observers = new ArrayList<>();

    public void addObserver(Observer obs) {
        observers.add(obs);
    }

    public void notifyObservers(String event) {
        for(Observer o : observers) {
            o.update(event);
        }
    }
}