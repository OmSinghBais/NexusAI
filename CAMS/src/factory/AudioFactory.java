package factory;

import player.*;

public class AudioFactory implements MediaFactory {
    public MediaPlayer createPlayer() {
        return new AudioPlayer();
    }
}