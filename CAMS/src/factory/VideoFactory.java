package factory;

import player.*;

public class VideoFactory implements MediaFactory {
    public MediaPlayer createPlayer() {
        return new VideoPlayer();
    }
}