package builder;

import java.util.*;

public class Playlist {
    private String mood;
    private int duration;
    private List<String> songs;

    public Playlist(String mood, int duration, List<String> songs) {
        this.mood = mood;
        this.duration = duration;
        this.songs = songs;
    }

    public void show() {
        System.out.println("Playlist: " + mood + " (" + duration + " mins)");
        songs.forEach(System.out::println);
    }
}