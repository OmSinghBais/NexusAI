import facade.MediaFacade;
import builder.*;
import command.*;
import factory.*;
import player.*;
import strategy.*;

public class Main {
    public static void main(String[] args) {

        MediaFacade media = MediaFacade.getInstance();

        // 🔹 Builder Pattern
        Playlist playlist = new PlaylistBuilder()
                .setMood("Focus")
                .setDuration(60)
                .addSong("lofi1.mp3")
                .addSong("lofi2.mp3")
                .build();

        playlist.show();

        // 🔹 Facade + Factory + Strategy + Observer
        media.setMode("STUDY");
        media.playMedia("lofi.mp3");

        media.setMode("WORKOUT");
        media.playMedia("gym.mp4");

        // 🔹 Command Pattern (FIXED)
        MediaPlayer player = new AudioFactory().createPlayer();
        player.setStrategy(new NormalStrategy()); // ✅ FIX

        Command play = new PlayCommand(player, "extra.mp3");
        Command pause = new PauseCommand(player);

        play.execute();
        pause.execute();

        media.pause();
    }
}