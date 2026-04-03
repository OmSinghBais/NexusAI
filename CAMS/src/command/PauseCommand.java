package command;

import player.MediaPlayer;

public class PauseCommand implements Command {

    private MediaPlayer player;

    public PauseCommand(MediaPlayer player) {
        this.player = player;
    }

    public void execute() {
        player.pause();
    }
}