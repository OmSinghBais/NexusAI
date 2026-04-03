package strategy;

public class RepeatStrategy implements PlaybackStrategy {
    public void execute() {
        System.out.println("Repeat playback");
    }
}