package builder;

import java.util.*;

public class PlaylistBuilder {

    private String mood;
    private int duration;
    private List<String> songs = new ArrayList<>();

    public PlaylistBuilder setMood(String mood) {
        this.mood = mood;
        return this;
    }

    public PlaylistBuilder setDuration(int duration) {
        this.duration = duration;
        return this;
    }

    public PlaylistBuilder addSong(String song) {
        songs.add(song);
        return this;
    }

    public Playlist build() {
        return new Playlist(mood, duration, songs);
    }
}