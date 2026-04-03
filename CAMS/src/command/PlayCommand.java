package command;

import player.MediaPlayer;

public class PlayCommand implements Command {

    private MediaPlayer player;
    private String file;

    public PlayCommand(MediaPlayer player, String file) {
        this.player = player;
        this.file = file;
    }

    public void execute() {
        player.play(file);
    }
}