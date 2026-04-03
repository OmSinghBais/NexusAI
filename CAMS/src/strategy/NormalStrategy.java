package strategy;

public class NormalStrategy implements PlaybackStrategy {
    public void execute() {
        System.out.println("Normal playback");
    }
}