package ui;

import javax.swing.*;
import java.awt.*;
import java.awt.event.*;
import facade.MediaFacade;
import java.net.HttpURLConnection;
import java.net.URL;

public class MediaUI {

    private static JProgressBar progressBar;
    private static Timer timer;

    public static void main(String[] args) {

        MediaFacade media = MediaFacade.getInstance();

        JFrame frame = new JFrame("🎵 CAMS+ Player");
        frame.setSize(700, 450);
        frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        frame.setLayout(new BorderLayout());

        Color bg = new Color(18,18,18);
        Color panel = new Color(30,30,30);
        Color accent = new Color(29,185,84);

        frame.getContentPane().setBackground(bg);

        // 🔷 LEFT PANEL (Playlist)
        DefaultListModel<String> listModel = new DefaultListModel<>();
        listModel.addElement("lofi.mp3");
        listModel.addElement("gym.mp4");
        listModel.addElement("focus.mp3");

        JList<String> playlist = new JList<>(listModel);
        playlist.setBackground(Color.BLACK);
        playlist.setForeground(Color.WHITE);

        JScrollPane leftPanel = new JScrollPane(playlist);
        leftPanel.setPreferredSize(new Dimension(150, 0));

        // 🔷 TOP PANEL
        JPanel top = new JPanel();
        top.setBackground(panel);

        JLabel modeLabel = new JLabel("Mode:");
        modeLabel.setForeground(Color.WHITE);

        String[] modes = {"STUDY", "WORKOUT", "NORMAL"};
        JComboBox<String> modeBox = new JComboBox<>(modes);

        JTextField input = new JTextField("song.mp3", 15);

        top.add(modeLabel);
        top.add(modeBox);
        top.add(input);

        // 🔷 CENTER OUTPUT
        JTextArea output = new JTextArea();
        output.setBackground(Color.BLACK);
        output.setForeground(Color.GREEN);
        output.setEditable(false);

        JScrollPane center = new JScrollPane(output);

        // 🔷 PROGRESS BAR
        progressBar = new JProgressBar(0, 100);
        progressBar.setStringPainted(true);

        // 🔷 BUTTON PANEL
        JPanel bottom = new JPanel();
        bottom.setBackground(panel);

        JButton play = new JButton("▶");
        JButton pause = new JButton("⏸");

        play.setBackground(accent);
        play.setForeground(Color.WHITE);

        pause.setBackground(Color.GRAY);
        pause.setForeground(Color.WHITE);

        bottom.add(play);
        bottom.add(pause);

        // 🔥 PLAY ACTION
        play.addActionListener(e -> {

            String mode = (String) modeBox.getSelectedItem();
            String file = playlist.getSelectedValue();

            if(file == null) file = input.getText();

            media.setMode(mode);
            media.playMedia(file);

            output.append("▶ Playing: " + file + "\n");

            // 🔥 STAGE 4: SEND REST API CALL TO DISTRIBUTED BACKEND
            sendPostRequest("http://127.0.0.1:8000/play/" + file);

            startProgress();
        });

        // 🔥 PAUSE ACTION
        pause.addActionListener(e -> {
            media.pause();
            output.append("⏸ Paused\n");
            
            // 🔥 STAGE 4: SEND REST API CALL TO DISTRIBUTED BACKEND
            sendPostRequest("http://127.0.0.1:8000/pause");
            
            stopProgress();
        });

        // 🔷 ADD ALL
        frame.add(top, BorderLayout.NORTH);
        frame.add(leftPanel, BorderLayout.WEST);
        frame.add(center, BorderLayout.CENTER);
        frame.add(progressBar, BorderLayout.SOUTH);
        frame.add(bottom, BorderLayout.PAGE_END);

        frame.setVisible(true);
    }

    // 🔥 PROGRESS SIMULATION
    private static void startProgress() {
        progressBar.setValue(0);

        timer = new Timer(100, new ActionListener() {
            int progress = 0;

            public void actionPerformed(ActionEvent e) {
                progress += 2;
                progressBar.setValue(progress);

                if(progress >= 100) {
                    timer.stop();
                }
            }
        });

        timer.start();
    }

    private static void stopProgress() {
        if(timer != null) timer.stop();
    }

    // 🔥 API CONNECTION LOGIC (DISTRIBUTED MICROSERVICES)
    private static void sendPostRequest(String urlString) {
        // Run in new thread so it doesn't freeze the Swing UI
        new Thread(() -> {
            try {
                URL url = java.net.URI.create(urlString.replace(" ", "%20")).toURL();
                HttpURLConnection conn = (HttpURLConnection) url.openConnection();
                conn.setRequestMethod("POST");
                conn.setDoOutput(true);
                
                int responseCode = conn.getResponseCode();
                System.out.println("✅ Distributed Backend Sync [" + responseCode + "] -> " + urlString);
            } catch (Exception ex) {
                System.err.println("❌ FastAPI Backend Error: " + ex.getMessage());
            }
        }).start();
    }
}