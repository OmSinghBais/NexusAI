package player;

import strategy.*;

public class VideoPlayer implements MediaPlayer {

    private PlaybackStrategy strategy;

    public void setStrategy(PlaybackStrategy strategy) {
        this.strategy = strategy;
    }

    public void play(String file) {
        System.out.println("Playing video: " + file);

        // ✅ Safe fallback
        if(strategy == null) {
            System.out.println("No strategy set → using default");
            strategy = new NormalStrategy();
        }

        strategy.execute();
    }

    public void pause() {
        System.out.println("Video paused");
    }
}