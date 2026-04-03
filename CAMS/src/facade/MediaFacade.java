package facade;

import factory.*;
import player.*;
import strategy.*;
import context.*;
import observer.*;

public class MediaFacade {

    private static MediaFacade instance = new MediaFacade();

    private MediaPlayer player;
    private PlaybackStrategy strategy;

    private MediaFacade() {}

    public static MediaFacade getInstance() {
        return instance;
    }

    public void setMode(String mode) {

        ContextManager context = new ContextManager();
        context.addObserver(new UserObserver());
        context.notifyObservers("Mode changed to " + mode);

        if(mode.equalsIgnoreCase("STUDY")) {
            strategy = new RepeatStrategy();
            player = new AudioFactory().createPlayer();
        } else if(mode.equalsIgnoreCase("WORKOUT")) {
            strategy = new ShuffleStrategy();
            player = new VideoFactory().createPlayer();
        } else {
            strategy = new NormalStrategy();
            player = new AudioFactory().createPlayer();
        }

        player.setStrategy(strategy);
        System.out.println("Mode set to: " + mode);
    }

    public void playMedia(String file) {
        player.play(file);
    }

    public void pause() {
        player.pause();
    }
}