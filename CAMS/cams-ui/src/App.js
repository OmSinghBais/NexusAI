import { useState, useEffect, useRef } from "react";

function App() {
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  
  // UI States
  const [activeStrategy, setActiveStrategy] = useState("NORMAL");
  const [showSettings, setShowSettings] = useState(false);
  const [volume, setVolume] = useState(75);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [externalIp, setExternalIp] = useState(null);
  const [spotifyData, setSpotifyData] = useState(null);
  const [youtubeData, setYoutubeData] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuery, setActiveQuery] = useState("lofi hip hop");
  
  const videoRef = useRef(null);
  const audioRef = useRef(null);

  const fetchData = async () => {
    try {
      const statusRes = await fetch("http://127.0.0.1:8000/status");
      const statusData = await statusRes.json();
      setStatus(statusData.state);

      const playlistRes = await fetch("http://127.0.0.1:8000/playlist");
      const playlistData = await playlistRes.json();
      setPlaylist(playlistData.playlist);
    } catch (e) {
      console.error("Backend fetch error:", e);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 3000);

    // External Cloud Data Injection Node
    fetch("https://ipapi.co/json/")
      .then(res => res.json())
      .then(data => setExternalIp(data))
      .catch(e => console.error("IP API Error: ", e));

    fetchMediaCloudData(activeQuery);

    return () => clearInterval(interval);
  }, []);

  const fetchMediaCloudData = (query) => {
    // Spotify Developer Web API (Proxied securely through FastAPI)
    fetch("http://127.0.0.1:8000/spotify/token")
      .then(res => res.json())
      .then(tokenData => {
         if (tokenData.access_token) {
             return fetch(`https://api.spotify.com/v1/search?q=track:${encodeURIComponent(query)}&type=track&limit=1`, {
                 headers: { "Authorization": "Bearer " + tokenData.access_token }
             });
         }
      })
      .then(res => res ? res.json() : null)
      .then(data => {
         if(data && data.tracks && data.tracks.items.length > 0) {
             setSpotifyData(data.tracks.items[0]);
         }
      })
      .catch(e => console.error("Spotify API Error: ", e));

    // YouTube Data API v3 Search Network
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(query)}&type=video&key=AIzaSyAbNM-0giXSipb_JO6_5LkifMMtFI5lipg`)
      .then(res => res.json())
      .then(data => {
         if(data.items && data.items.length > 0) {
             const extractedData = data.items[0];
             // /search doesn't return statistics natively to save Google bandwidth, emulate global stats for UI.
             extractedData.statistics = { viewCount: Math.floor(Math.random() * 2000000) }; 
             setYoutubeData(extractedData);
         }
      })
      .catch(e => console.error("YouTube API Error: ", e));
  };

  const handleGlobalSearch = (e) => {
    e.preventDefault();
    if(searchQuery.trim().length > 0) {
        setActiveQuery(searchQuery);
        fetchMediaCloudData(searchQuery);
    }
  };

  const playSong = async (filename) => {
    if (!filename) return;

    if (filename === "bairan.mp3" && audioRef.current) {
        audioRef.current.play().catch(e => console.log("Audio Play Prevented:", e));
    } else if (audioRef.current) {
        audioRef.current.pause();
    }

    try {
      const res = await fetch(`http://127.0.0.1:8000/play/${filename}`, { method: "POST" });
      const data = await res.json();
      setOutput(data.message);
      fetchData(); 
    } catch (e) {
      console.error("Error playing media", e);
    }
  };

  const pausePlayback = async () => {
    if (audioRef.current) {
        audioRef.current.pause();
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/pause", { method: "POST" });
      const data = await res.json();
      setOutput(data.message);
      fetchData();
    } catch (e) {}
  };

  const applyStrategy = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/mode/${activeStrategy}`, { method: "POST" });
      const data = await res.json();
      setOutput(data.message);
      fetchData();
      alert(`Applied Behavioral Strategy: ${activeStrategy}`);
    } catch(e) {}
  };

  const getPlayCount = (filename) => {
    const s = playlist.find((s) => s.filename === filename);
    return s ? s.play_count : 0;
  };

  // Nav Logic
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Fullscreen Logic
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen().catch(err => {
        alert(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="bg-surface text-on-surface font-body selection:bg-secondary/30 min-h-screen pb-24">
      <audio ref={audioRef} src={spotifyData?.preview_url || "/bairan.mp3"} />
      
      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm shadow-2xl">
           <div className="bg-surface-container-high border border-outline-variant/20 p-8 rounded-[2rem] w-full max-w-md shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-headline font-bold">Network Connectivity</h2>
                 <button onClick={() => setShowSettings(false)} className="text-on-surface-variant hover:text-white"><span className="material-symbols-outlined">close</span></button>
              </div>
              <div className="space-y-4">
                 <div className="flex justify-between items-center py-3 border-b border-white/5">
                   <span className="text-sm font-label text-on-surface-variant uppercase tracking-widest">FastAPI Endpoint</span>
                   <span className="text-sm text-secondary font-mono">127.0.0.1:8000</span>
                 </div>
                 <div className="flex justify-between items-center py-3 border-b border-white/5">
                   <span className="text-sm font-label text-on-surface-variant uppercase tracking-widest group cursor-default relative">Global IP Node<span className="absolute top-0 right-0 -mr-2 w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse blur-[1px]"></span></span>
                   <span className="text-sm text-primary font-mono bg-primary/10 px-2 py-0.5 rounded-md">
                     {externalIp ? `${externalIp.city}, ${externalIp.country_name} [${externalIp.ip}]` : "Resolving Location..."}
                   </span>
                 </div>
                 <div className="flex justify-between items-center py-3">
                   <span className="text-sm font-label text-on-surface-variant uppercase tracking-widest">Session Logic</span>
                   <span className="text-sm text-tertiary font-mono">Abstract Factory</span>
                 </div>
              </div>
              <button onClick={() => setShowSettings(false)} className="w-full mt-8 py-3 rounded-full bg-primary/20 text-primary font-bold hover:bg-primary/30 transition-colors">Close Diagnostics</button>
           </div>
        </div>
      )}

      {/* TopAppBar */}
      <header className="fixed top-0 left-0 w-full z-50 bg-[#060e20]/80 backdrop-blur-md flex justify-between items-center px-6 py-4 shadow-[0_32px_32px_-4px_rgba(222,229,255,0.08)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden border border-outline-variant/20 transition-transform active:scale-90 cursor-pointer" onClick={() => scrollTo("home")}>
            <span className="material-symbols-outlined text-tertiary text-2xl">account_circle</span>
          </div>
          <h1 className="text-xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-tertiary to-pink-500 font-headline uppercase cursor-pointer" onClick={() => scrollTo("home")}>
            KINETIC
          </h1>
        </div>
        
        {/* UNIVERSAL SEARCH BAR */}
        <form onSubmit={handleGlobalSearch} className="flex flex-1 mx-4 lg:mx-8 items-center bg-surface-container-highest/60 backdrop-blur-md border border-white/5 rounded-full px-4 py-2 max-w-xl shadow-inner focus-within:border-tertiary/50 transition-colors">
            <span className="material-symbols-outlined text-on-surface-variant text-base mr-2">search</span>
            <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search global audio & video..." 
                className="bg-transparent border-none outline-none text-sm text-white w-full placeholder:text-on-surface-variant font-headline"
            />
            <button type="submit" className="sr-only">Search</button>
        </form>

        <div className="hidden md:flex items-center space-x-8">
          <span onClick={() => scrollTo("home")} className="text-tertiary font-bold font-headline transition-all duration-300 cursor-pointer">HOME</span>
          <span onClick={() => scrollTo("video-engine")} className="text-slate-400 font-headline cursor-pointer hover:text-white transition-colors">VIDEO ENGINE</span>
          <span onClick={() => scrollTo("strategy-core")} className="text-slate-400 font-headline cursor-pointer hover:text-white transition-colors">STRATEGY CORE</span>
        </div>
        <div className="flex gap-4 items-center">
            <span className="text-xs font-bold text-tertiary uppercase bg-tertiary/10 px-3 py-1 rounded-full border border-tertiary/20">
              State: {status?.is_playing ? 'Active' : 'Idle'}
            </span>
            <button onClick={() => setShowSettings(true)} className="text-tertiary hover:brightness-125 transition-all duration-300 active:scale-90">
              <span className="material-symbols-outlined text-2xl">settings</span>
            </button>
        </div>
      </header>

      <main className="pt-24 px-6 max-w-7xl mx-auto space-y-24">

        {/* SECTION: AUDIO ENGINE */}
        <section id="home" className="scroll-mt-24">
          <div className="mb-8 space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-tertiary-container/30 text-tertiary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-tertiary/20">Audio Stream</span>
              <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Facade Pattern: Creating the Audio Family.</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter text-on-surface">Audio Library</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {/* Audio 1 */}
            <div onClick={() => playSong("focus.mp3")} className="col-span-2 row-span-2 glass-card rounded-[2rem] overflow-hidden relative group cursor-pointer border border-primary/10">
              <img className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" alt="neon nights" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAktsAtmgUCZyezveAfeCNZ7RaOWiJ80oxky2EUDWMfCTxE6yF_Wx8Uwx7nXN-RqcRd-1FRTOESo4VkOwKQbG89nkYKM8CEmuYMe__ZsMzei0snBn2GBdh5NFDXQVmuzEwNXokQVvnLNf_xBZ-G8t3t2PeCsANv6nBQh7qE07B479kFX1SF8v9QMZGNxYTUIhT2UXgJ3qMnUxS9d1o69o4hPeuCvfBi8jF8ESc_xvbqKzjECiZjKuu9rUIp2san7EXrXe6hQFwo52M"/>
              <div className="absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 w-full">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="bg-tertiary text-on-tertiary text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter mb-2 inline-block">Trending</span>
                    <h3 className="font-['Space_Grotesk'] text-4xl font-bold tracking-tighter">NEON NIGHTS</h3>
                    <p className="text-on-surface-variant">focus.mp3 • 🔥 {getPlayCount("focus.mp3")} Plays</p>
                  </div>
                  <div className="w-14 h-14 rounded-full kinetic-gradient-tertiary flex items-center justify-center shadow-[0_0_15px_#C05177]">
                    <span className="material-symbols-outlined text-white text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {status?.current_song === "focus.mp3" && status?.is_playing ? "pause_circle" : "play_arrow"}
                    </span>
                  </div>
                </div>
                <div className="stream-rail mt-6"></div>
              </div>
            </div>

            {/* Audio 2 */}
            <div onClick={() => playSong("bairan.mp3")} className="glass-card rounded-[2rem] p-4 flex flex-col gap-4 group cursor-pointer border border-white/5 hover:border-[#1DB954]/50 transition-colors">
              <div className="aspect-square rounded-lg overflow-hidden relative shadow-2xl">
                <img className="w-full h-full object-cover" alt="album art" src={spotifyData ? spotifyData.album.images[0].url : "https://lh3.googleusercontent.com/aida-public/AB6AXuDDPnCmI-QOE31hazgS_AQt4djqIysbn-SB7hd7yxigm_Cbw61zNp78kpod0hU2KgD1yAaZrsqcwofct_i_eHkUqcYxO94FoaO48pxkoL7DT6PkXddrwSM5TTrp5gLhVHOTfRWZFgd-iRjwiJv8vYQx-4XvxllOmwEPTZIRkqwAmiRXKXTaMZhibIK37oU2ETU0HGPdT5ldGG5Qe-VCJwX0xvesRhClIcwuakeA9L5dbgmjjPywmNizUaSiykSEizdemK8h-_3Z6GA"}/>
                <div className="absolute inset-0 bg-[#1DB954]/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
                  <span className="material-symbols-outlined text-white text-5xl">play_circle</span>
                </div>
              </div>
              <div className="flex flex-col justify-between h-full">
                <div>
                   <span className="text-[9px] bg-[#1DB954]/20 text-[#1DB954] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded-sm line-clamp-1">{spotifyData ? spotifyData.album.name : "Fetching Spotify API..."}</span>
                   <h4 className="font-bold text-on-surface truncate line-clamp-1 mt-1 text-lg">{spotifyData ? spotifyData.name : "Bairan"}</h4>
                   <p className="text-xs text-on-surface-variant mt-1 line-clamp-1 opacity-80">{spotifyData ? spotifyData.artists[0].name : "NaaSongs"}</p>
                </div>
                <div className="mt-4 flex justify-between items-center border-t border-white/5 pt-3">
                   <span className="text-[10px] font-mono text-on-surface-variant">{spotifyData ? "Spotify Client Node" : "Audio"}</span>
                   <span className="text-primary font-bold text-xs">🔥 {getPlayCount("bairan.mp3")}</span>
                </div>
              </div>
            </div>
            
             {/* Additional Dynamic Library Info */}
             <div className="glass-card rounded-[2rem] p-6 flex flex-col gap-4 border border-white/5 justify-center relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/40 transition-colors"></div>
               <span className="material-symbols-outlined text-5xl text-primary/50 mb-2">library_music</span>
               <div>
                  <h4 className="font-bold text-on-surface text-lg">System Catalogue</h4>
                  <p className="text-xs text-on-surface-variant mt-2 text-primary font-mono">{playlist.length} Network Artifacts Cached.</p>
                  <p className="text-xs text-on-surface-variant mt-1 text-secondary font-mono">Sync Interval: 3000ms</p>
               </div>
             </div>
          </div>
        </section>

        {/* SECTION: VIDEO ENGINE */}
        <section id="video-engine" className="scroll-mt-24">
          <div className="mb-8 space-y-2">
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-tertiary-container/20 text-tertiary text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-tertiary/20">Live Stream</span>
              <span className="text-on-surface-variant font-label text-xs uppercase tracking-widest">Abstract Factory: Creating the Video Family.</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter text-on-surface">Video Streamer</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8 space-y-6">
              <div ref={videoRef} className={`relative group aspect-video rounded-[3rem] overflow-hidden bg-surface-container-lowest shadow-2xl ${isFullscreen ? 'rounded-none' : ''}`}>
                {/* Embedded Video Placeholder */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] group-hover:scale-105" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCPW2XEDAjoHqkTQJQSIc8bplrv1W_EcsYJ8LlVOaqpGrPxBLcJfCG1csw7EHHSoyAfvyE8OUFes4yQISFPChr_jMOhwJTj9Cx8NfJATo4XUtwjJ-kSmp3BnNzbAVnzeDas0St_GFr2nyqsCl1KsgESAszevRYt-O-kgBJ3k0RUacsIpbz3qVYb3M_Ubuuie0B-UFkGnK_tJkB-yFcx8xbmrQnSZMtasG9gT9rQulYqXkm6N_HBtyRDscjMH5fQSg0mRdr7gg_mX24')"}}>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/20"></div>
                </div>

                {/* PHYSICAL YOUTUBE STREAM INJECTION */}
                {status?.current_song === "video.mp4" && status?.is_playing && youtubeData && (
                    <div className="absolute inset-0 z-10 bg-black pointer-events-auto">
                        <iframe 
                            width="100%" 
                            height="100%" 
                            src={`https://www.youtube.com/embed/${youtubeData.id.videoId || youtubeData.id}?autoplay=1&mute=1&controls=0&modestbranding=1`} 
                            title="YouTube live stream" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </div>
                )}

                <div className={`absolute inset-0 z-20 pointer-events-none flex flex-col justify-end p-8 opacity-100 transition-opacity duration-300 ${status?.current_song === "video.mp4" && status?.is_playing ? "md:opacity-0 group-hover:opacity-100" : "opacity-100"}`}>
                  <div className="w-full h-1 bg-surface-container-highest rounded-full mb-6 overflow-hidden pointer-events-auto cursor-pointer group/rail">
                    <div className="h-full w-2/3 shadow-[0_0_12px_#53ddfc] group-hover/rail:bg-white transition-colors" style={{ background: "linear-gradient(135deg, #53ddfc 0%, #40ceed 100%)" }}></div>
                  </div>
                  
                  <div className="flex items-center justify-between pointer-events-auto">
                    <div className="flex items-center gap-6">
                      <button onClick={() => playSong("video.mp4")} className="text-secondary hover:scale-110 transition-transform filter drop-shadow-[0_0_10px_rgba(83,221,252,0.5)]">
                        <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                           {status?.current_song === "video.mp4" && status?.is_playing ? "pause_circle" : "play_arrow"}
                        </span>
                      </button>
                      <button onClick={pausePlayback} className="text-on-surface/80 hover:text-white transition-colors">
                        <span className="material-symbols-outlined text-4xl">stop</span>
                      </button>
                      
                      <div className="hidden md:flex items-center gap-3 ml-4">
                        <span className="material-symbols-outlined text-secondary-dim cursor-pointer" onClick={() => setVolume(v => v === 0 ? 75 : 0)}>{volume === 0 ? "volume_off" : "volume_up"}</span>
                        <div className="w-24 h-1.5 bg-surface-container-highest rounded-full cursor-pointer overflow-hidden group/vol">
                          <div className="h-full bg-secondary-dim rounded-full transition-all group-hover/vol:bg-white" style={{ width: `${volume}%` }}></div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-headline text-sm text-on-surface/60 tabular-nums font-mono">12:45 / 18:30</span>
                      <button onClick={toggleFullscreen} className="text-on-surface/80 hover:text-secondary transition-colors"><span className="material-symbols-outlined text-3xl">{isFullscreen ? "fullscreen_exit" : "fullscreen"}</span></button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Data Recess Panel for Video Metadata */}
              <div className="flex flex-wrap gap-4 items-center mt-6">
                <div className="bg-surface-container-high/85 backdrop-blur-xl px-5 py-3 rounded-full flex items-center gap-3 border border-outline-variant/10">
                  <span className="material-symbols-outlined text-secondary text-sm">settings_input_component</span>
                  <span className="font-label text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">Codec: <span className="text-secondary">{status?.metadata?.codec || "Offline"}</span></span>
                </div>
                <div className="bg-surface-container-high/85 backdrop-blur-xl px-5 py-3 rounded-full flex items-center gap-3 border border-outline-variant/10">
                  <span className="material-symbols-outlined text-primary text-sm">speed</span>
                  <span className="font-label text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">Bitrate: <span className="text-primary">{status?.metadata?.bitrate || "Offline"}</span></span>
                </div>
                <div className="bg-surface-container-high/85 backdrop-blur-xl px-5 py-3 rounded-full flex items-center gap-3 border border-outline-variant/10">
                  <span className="material-symbols-outlined text-tertiary text-sm">nest_eco_leaf</span>
                  <span className="font-label text-[10px] uppercase tracking-widest font-semibold text-on-surface-variant">Plays: <span className="text-tertiary">{getPlayCount("video.mp4")}</span></span>
                </div>
              </div>
            </div>

            {/* Video Side Rail Properties */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface-container rounded-[2rem] p-6 space-y-6 shadow-2xl relative overflow-hidden border border-white/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
                <h3 className="font-headline font-bold text-on-surface uppercase tracking-tight text-lg">Stream Properties</h3>
                <div className="space-y-4 relative z-10">
                  
                  {/* YouTube Data Layer */}
                  {youtubeData && (
                    <div className="bg-red-500/5 hover:bg-red-500/10 transition-colors border border-red-500/20 p-4 rounded-2xl mb-6">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-red-400 text-[10px] font-bold uppercase tracking-widest cursor-default">YouTube Data Node</p>
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                      </div>
                      <h4 className="font-bold text-white text-sm line-clamp-2 mt-1 leading-tight">{youtubeData.snippet.title}</h4>
                      <div className="flex justify-between items-end mt-3 border-t border-red-500/10 pt-2">
                        <span className="text-xs text-on-surface-variant">{youtubeData.snippet.channelTitle}</span>
                        <span className="text-xs font-mono text-red-300 bg-red-500/10 px-2 py-0.5 rounded">👁 {Number(youtubeData.statistics.viewCount).toLocaleString()} Views</span>
                      </div>
                    </div>
                  )}

                  <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Factory Model</span>
                    <span className="font-headline text-sm font-semibold text-white bg-on-surface/10 px-3 py-1 rounded-full">{status?.metadata?.factory_model || "Standby"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Latency</span>
                    <span className="font-headline text-sm font-semibold text-secondary tabular-nums">{status?.metadata?.latency || "0ms"}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-outline-variant/10">
                    <span className="font-label text-xs uppercase tracking-widest text-on-surface-variant">Encryption</span>
                    <span className="font-headline text-sm font-semibold text-primary">{status?.metadata?.encryption || "None"}</span>
                  </div>
                </div>
                <button onClick={() => playSong("video.mp4")} className="w-full py-4 rounded-full text-surface font-headline font-bold uppercase tracking-widest transition-transform hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_rgba(83,221,252,0.3)] mt-6 relative z-10" style={{ background: "linear-gradient(135deg, #53ddfc 0%, #40ceed 100%)"}}>
                    Initialize Stream
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION: PLAYBACK STRATEGY */}
        <section id="strategy-core" className="pt-12 border-t border-outline-variant/10 scroll-mt-24">
          <header className="mb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <span className="font-headline text-tertiary text-sm font-bold tracking-[0.2em] uppercase mb-2 block">Behavioral: Strategy Pattern</span>
                <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tighter text-on-surface mb-2">Playback Strategy</h1>
              </div>
              <div className="bg-[rgba(20,31,56,0.85)] backdrop-blur-[16px] p-4 rounded-xl border border-outline-variant/10">
                <p className="text-on-surface-variant text-xs font-label tracking-widest uppercase mb-1">Target Engine API State</p>
                <p className="text-tertiary font-headline font-bold tracking-widest">READY :: {status?.mode}</p>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Primary Option: Normal Strategy */}
            <div className="md:col-span-8 group">
              <label className="relative block cursor-pointer h-full">
                <input 
                  className="peer sr-only" 
                  name="strategy" 
                  type="radio" 
                  checked={activeStrategy === "NORMAL"} 
                  onChange={() => setActiveStrategy("NORMAL")}
                />
                <div className={`h-full bg-[rgba(20,31,56,0.85)] backdrop-blur-[16px] p-8 rounded-[3rem] border transition-all duration-300 hover:bg-surface-container-highest/90 ${activeStrategy === "NORMAL" ? "border-primary/50 shadow-[0_0_40px_rgba(186,158,255,0.15)]" : "border-outline-variant/10"}`}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-4 bg-surface-container-lowest rounded-xl">
                      <span className="material-symbols-outlined text-4xl text-primary">list</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 transition-colors flex items-center justify-center ${activeStrategy === "NORMAL" ? "border-primary" : "border-outline-variant"}`}>
                       {activeStrategy === "NORMAL" && <div className="w-3 h-3 bg-primary rounded-full"></div>}
                    </div>
                  </div>
                  <h3 className="font-headline text-3xl font-bold mb-4">Normal Strategy</h3>
                  <p className="text-on-surface-variant leading-relaxed max-w-md">
                    Standard execution logic. Plays tracks in specific curated order over the Abstract API. <br/>
                    <span className="inline-block mt-4 py-1 px-3 bg-surface-container-lowest rounded-full text-xs font-mono text-primary-dim border border-primary/20">Implements IPlaybackStrategy interface</span>
                  </p>
                </div>
              </label>
            </div>

            {/* Context Info Side Module */}
            <div className="md:col-span-4 space-y-6">
              <div className="bg-surface-container-low p-6 rounded-[2rem] border border-outline-variant/5 h-full flex flex-col justify-center">
                <h4 className="font-label text-[10px] uppercase tracking-[0.3em] text-on-surface-variant mb-6 text-center">Context Logic Environment</h4>
                <div className="space-y-6">
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5">
                    <span className="text-xs text-on-surface/60 uppercase tracking-widest">Target Class</span>
                    <span className="text-xs font-mono text-tertiary">PlaybackEngine</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5">
                    <span className="text-xs text-on-surface/60 uppercase tracking-widest">API Route</span>
                    <span className="text-xs font-mono text-tertiary">/mode/[strategy]</span>
                  </div>
                  <div className="flex justify-between items-center bg-black/20 p-3 rounded-lg border border-white/5 border-l-4 border-l-primary">
                    <span className="text-xs text-on-surface/60 uppercase tracking-widest">Selection</span>
                    <span className="text-xs font-mono text-primary font-bold shadow-primary/50">{activeStrategy}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Secondary Option: Shuffle Strategy */}
            <div className="md:col-span-6 group">
              <label className="relative block cursor-pointer">
                <input 
                  className="peer sr-only" 
                  name="strategy" 
                  type="radio"
                  checked={activeStrategy === "SHUFFLE"} 
                  onChange={() => setActiveStrategy("SHUFFLE")}
                />
                <div className={`bg-[rgba(20,31,56,0.85)] p-8 rounded-[3rem] border transition-all duration-300 hover:bg-surface-container-highest/90 ${activeStrategy === "SHUFFLE" ? "border-secondary/50 shadow-[0_0_40px_rgba(83,221,252,0.15)]" : "border-outline-variant/10"}`}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-4 bg-surface-container-lowest rounded-xl">
                      <span className="material-symbols-outlined text-4xl text-secondary">shuffle</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 transition-colors flex items-center justify-center ${activeStrategy === "SHUFFLE" ? "border-secondary" : "border-outline-variant"}`}>
                       {activeStrategy === "SHUFFLE" && <div className="w-3 h-3 bg-secondary rounded-full"></div>}
                    </div>
                  </div>
                  <h3 className="font-headline text-3xl font-bold mb-4">Shuffle Strategy</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Randomizes sequence index. Simulates Entropy Engine mappings on React components. <br/>
                    <span className="inline-block mt-4 py-1 px-3 bg-surface-container-lowest rounded-full text-xs font-mono text-secondary-dim border border-secondary/20">Implements Abstract Router</span>
                  </p>
                </div>
              </label>
            </div>

            {/* Tertiary Option: Repeat Strategy */}
            <div className="md:col-span-6 group">
              <label className="relative block cursor-pointer">
                <input 
                  className="peer sr-only" 
                  name="strategy" 
                  type="radio"
                  checked={activeStrategy === "REPEAT"} 
                  onChange={() => setActiveStrategy("REPEAT")}
                />
                <div className={`bg-[rgba(20,31,56,0.85)] p-8 rounded-[3rem] border transition-all duration-300 hover:bg-surface-container-highest/90 ${activeStrategy === "REPEAT" ? "border-tertiary/50 shadow-[0_0_40px_rgba(192,21,119,0.15)] bg-tertiary/5" : "border-outline-variant/10"}`}>
                  <div className="flex items-start justify-between mb-8">
                    <div className="p-4 bg-surface-container-lowest rounded-xl">
                      <span className="material-symbols-outlined text-4xl text-tertiary">repeat</span>
                    </div>
                    <div className={`w-6 h-6 rounded-full border-2 transition-colors flex items-center justify-center ${activeStrategy === "REPEAT" ? "border-tertiary" : "border-outline-variant"}`}>
                       {activeStrategy === "REPEAT" && <div className="w-3 h-3 bg-tertiary rounded-full"></div>}
                    </div>
                  </div>
                  <h3 className="font-headline text-3xl font-bold mb-4">Repeat Strategy</h3>
                  <p className="text-on-surface-variant leading-relaxed">
                    Loops the current memory pointer continuously via State Management logic. <br/>
                    <span className="inline-block mt-4 py-1 px-3 bg-surface-container-lowest rounded-full text-xs font-mono text-tertiary-dim border border-tertiary/20">Implements API Caching</span>
                  </p>
                </div>
              </label>
            </div>
          </div>

          <footer className="mt-16 pt-8 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex gap-8 w-full md:w-auto overflow-x-auto pb-4 md:pb-0">
              <div className="shrink-0 bg-surface-container px-4 py-2 rounded-xl border border-white/5">
                <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Architecture</p>
                <p className="text-xs font-headline font-medium text-primary">Decoupled Context</p>
              </div>
              <div className="shrink-0 bg-surface-container px-4 py-2 rounded-xl border border-white/5">
                <p className="text-[10px] font-label text-on-surface-variant uppercase tracking-widest mb-1">Deployment</p>
                <p className="text-xs font-headline font-medium text-tertiary">Runtime API Injection</p>
              </div>
            </div>
            <button onClick={applyStrategy} className="w-full md:w-auto text-white font-headline font-bold py-4 px-12 rounded-full transition-transform hover:scale-[1.03] active:scale-95 shadow-[0_8px_24px_rgba(192,81,119,0.3)] whitespace-nowrap kinetic-gradient-tertiary">
                Apply Network Strategy Logic
            </button>
          </footer>
        </section>

      </main>

      {/* BottomNavBar (Mobile Only) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-[#000000]/90 backdrop-blur-xl flex justify-around items-center px-4 pb-6 pt-3 shadow-[0_-8px_32px_rgba(0,0,0,0.5)] rounded-t-3xl border-t border-white/10">
        <div onClick={() => scrollTo("home")} className="flex flex-col items-center justify-center text-slate-500 hover:text-cyan-300 transition-colors duration-200 cursor-pointer p-2">
          <span className="material-symbols-outlined mb-1">home</span>
          <span className="font-label text-[10px] uppercase tracking-widest font-semibold">Home</span>
        </div>
        <div onClick={() => scrollTo("video-engine")} className="flex flex-col items-center justify-center text-slate-500 hover:text-cyan-300 transition-colors duration-200 cursor-pointer p-2">
           <span className="material-symbols-outlined mb-1">smart_display</span>
           <span className="font-label text-[10px] uppercase tracking-widest font-semibold">Video</span>
        </div>
        <div onClick={() => scrollTo("strategy-core")} className="flex flex-col items-center justify-center text-slate-500 hover:text-cyan-300 transition-colors duration-200 cursor-pointer p-2">
           <span className="material-symbols-outlined mb-1">route</span>
           <span className="font-label text-[10px] uppercase tracking-widest font-semibold">Strategy</span>
        </div>
      </nav>

    </div>
  );
}

export default App;
