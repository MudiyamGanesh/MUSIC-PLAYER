const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');
const currTime = document.querySelector('#currTime');
const durTime = document.querySelector('#durTime');

// Song titles
const songs = ["Ney Veyrey", "Adhento Gaani","Naan Gaali","Enna Sona", "Neela yevaru", "Sajni", "Ye Mantramo", "Cheliya Cheliya"];

// Keep track of song
let songIndex = 4;

// Initially load song details into DOM
loadSong(songs[songIndex]);

// Update song details
function loadSong(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  cover.src = `images/${song}.jpg`;
}

function playSong(){
  musicContainer.classList.add('play');
  playBtn.querySelector('i.bx').classList.remove('bx-play');
  playBtn.querySelector('i.bx').classList.add('bx-pause');
  audio.play();
}
function pauseSong(){
  musicContainer.classList.remove('play');
  playBtn.querySelector('i.bx').classList.add('bx-play');
  playBtn.querySelector('i.bx').classList.remove('bx-pause');
  audio.pause();
}

function prevSong(){
  
  const isPlaying=musicContainer.classList.contains('play');songIndex--;
  if(songIndex<0){
    console.log();
    songIndex=songs.length-1;
  }
  loadSong(songs[songIndex]);
  if(isPlaying){
    playSong();
  }
}
function nextSong(){
  const isPlaying=musicContainer.classList.contains('play');
  songIndex++;
  if(songIndex >songs.length-1){
    songIndex=0;
  }
  loadSong(songs[songIndex]);
  if(isPlaying){
    playSong();
  }
}
function updateProgress(e){
  const {duration, currentTime}=e.srcElement;
  const progressPercent=(currentTime/duration)*100;
  progress.style.width=`${progressPercent}%`;
}
function setProgress(e){
  const width=this.clientWidth;
  const clickX=e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX/width)*duration;
}
function color1(){
  musicContainer.style.background= "whitesmoke";
}
function color2(){
  musicContainer.style.background= "whitesmoke";
}
//Event Listener
playBtn.addEventListener('click',()=>{
  const isPlaying=musicContainer.classList.contains('play');
  if(isPlaying){
    pauseSong();
  }
  else{
    playSong();
  }
});

//Change song events
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
prevBtn.addEventListener('click', color1);
nextBtn.addEventListener('click', color2);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click',setProgress);
audio.addEventListener('ended', nextSong);
