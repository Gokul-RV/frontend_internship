const songs = [
    {title:"Song 1", artist:"Artist 1", src:"music/song1.mp3"},
    {title:"Song 2", artist:"Artist 2", src:"music/song2.mp3"},
    {title:"Song 3", artist:"Artist 3", src:"music/song3.mp3"}
];

let songIndex = 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const playBtn = document.getElementById("playBtn");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volumeControl = document.getElementById("volume");
const playlist = document.getElementById("playlist");

function loadSong(song){
    title.innerText = song.title;
    artist.innerText = song.artist;
    audio.src = song.src;
}

function togglePlay(){
    if(audio.paused){
        audio.play().catch(()=>{});
        playBtn.innerText="⏸";
    } else {
        audio.pause();
        playBtn.innerText="▶";
    }
}

function nextSong(){
    songIndex=(songIndex+1)%songs.length;
    loadSong(songs[songIndex]);
    audio.play().catch(()=>{});
}

function prevSong(){
    songIndex=(songIndex-1+songs.length)%songs.length;
    loadSong(songs[songIndex]);
    audio.play().catch(()=>{});
}

audio.addEventListener("timeupdate",()=>{
    const percent=(audio.currentTime/audio.duration)*100;
    progress.style.width=percent+"%";

    const format=(time)=>{
        const min=Math.floor(time/60);
        const sec=Math.floor(time%60);
        return min+":"+(sec<10?"0":"")+sec;
    };

    currentTimeEl.innerText=format(audio.currentTime);
    durationEl.innerText=format(audio.duration||0);
});

progressContainer.addEventListener("click",(e)=>{
    const width=progressContainer.clientWidth;
    audio.currentTime=(e.offsetX/width)*audio.duration;
});

volumeControl.addEventListener("input",()=>{
    audio.volume=volumeControl.value;
});

audio.addEventListener("ended",nextSong);

songs.forEach((song,index)=>{
    const div=document.createElement("div");
    div.innerText=song.title+" - "+song.artist;
    div.addEventListener("click",()=>{
        songIndex=index;
        loadSong(song);
        audio.play().catch(()=>{});
    });
    playlist.appendChild(div);
});

loadSong(songs[songIndex]);
