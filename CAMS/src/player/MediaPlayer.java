package player;

import strategy.PlaybackStrategy;

public interface MediaPlayer {
    void play(String file);
    void pause();
    void setStrategy(PlaybackStrategy strategy);
}