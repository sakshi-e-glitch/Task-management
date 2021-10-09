let allMusic = [
  {
      name: "And So It Begins",
      artist: "Anonymous",
      img: "carousel_1.gif",
      src: "music/And-So-It-Begins-Inspired-By-Crush-Sometimes.mp3"
  },
  {
      name: "Trippin Coffee",
      artist: "Anonymous",
      img: "carousel_2.gif",
      src: "music/audionautix-trippin-coffee.mp3"
  },
  {
      name: "Water, wood and Stone",
      artist: "Anonymous",
      img: "carousel_3.gif",
      src: "music/audionautix-water-wood-and-stone.mp3"
  },
  {
      name: "Fragile",
      artist: "Anonymous",
      img: "carousel_4.gif",
      src: "music/Fragile-Lo-Fi-Chill-Melancholic-Music.mp3"
  },
  {
      name: "Herbal Tea",
      artist: "Anonymous",
      img: "carousel_5.gif",
      src: "music/herbal-tea.mp3"
  },
  {
      name: "Merry Bay Upbeat",
      artist: "Anonymous",
      img: "assets/boy_3.gif",
      src: "music/Merry-Bay-Upbeat-Summer-Lofi.mp3"
  },
  {
      name: "Midnight Stroll",
      artist: "Anonymous",
      img: "assets/girl_new.gif",
      src: "music/Midnight-Stroll-Lofi-Study-Music.mp3"
  },
  {
      name: "Purple Cat Equinox",
      artist: "Anonymous",
      img: "assets/boy_4.jpg",
      src: "music/purrple-cat-equinox.mp3"
  },
  {
      name: "Purple Cat Floating Castle",
      artist: "Anonymous",
      img: "assets/girl.gif",
      src: "music/purrple-cat-floating-castle.mp3"
  }

]

let  card= document.getElementById("content"),
musicImg = document.querySelector("#music-image"),
musicName = document.querySelector("#music-name"),
musicArtist = document.getElementById("singer"),
playPauseBtn = document.getElementById("play-pause"),
prevBtn = document.querySelector("#prev"),
nextBtn = document.querySelector("#next"),
mainAudio = document.querySelector("#main-audio"),
progressArea = document.querySelector(".progress-area"),
progressBar = progressArea.querySelector(".progress-bar");
// musicList = document.querySelector(".music-list"),
// moreMusicBtn = document.querySelector("#more-music"),
// closemoreMusic = musicList.querySelector("#close");
let isMusicPaused = true;

console.log(musicImg)
console.log(mainAudio)
console.log(playPauseBtn)
console.log(card)

// let musicIndex = Math.floor((Math.random() * allMusic.length) + 1);
// isMusicPaused = true;

let musicIndex = 7;
window.addEventListener("load", ()=>{
  loadMusic(musicIndex);
  // playingSong(); 
});
function loadMusic(indexNumb){
  // musicName.innerText = allMusic[indexNumb - 1].name;
  musicName.innerText =  allMusic[indexNumb - 1].name;
  musicArtist.innerText = allMusic[indexNumb - 1].artist;
  // musicImg.src = `${allMusic[indexNumb - 1].img}`;
  musicImg.src = `${allMusic[indexNumb - 1].img}`;
  mainAudio.src = `${allMusic[indexNumb - 1].src}`;
}

//play music function
function playMusic(){
    card.classList.add("paused");
    // playPauseBtn.querySelector("i").innerText = "pause";
    mainAudio.play();
    // if(currentTime === audioDuration)
    // nextMusic()
  }
  //pause music function
  function pauseMusic(){
    card.classList.remove("paused");
    // playPauseBtn.querySelector("i").innerText = "play_arrow";
    mainAudio.pause();
  }



  function prevMusic(){
    musicIndex--;  
    musicIndex < 1 ? musicIndex = allMusic.length : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
    //playingSong(); 
  }

  function nextMusic(){
    musicIndex++;
    musicIndex > allMusic.length ? musicIndex = 1 : musicIndex = musicIndex;
    loadMusic(musicIndex);
    playMusic();
  }

  console.log(typeof(isMusicPaused))
  playPauseBtn.addEventListener("click" , () => {
       
      const isMusicPaused = card.classList.contains("paused")
    
       isMusicPaused ?  pauseMusic():playMusic() 
      
      
  })

  prevBtn.addEventListener("click", ()=>{
    prevMusic();
  });
  nextBtn.addEventListener("click" , () => {
    nextMusic()
  })

  mainAudio.addEventListener("timeupdate", (e)=>{
    let currentTime = e.target.currentTime;
    let duration = e.target.duration;
    let progressWidth = (currentTime/duration)*100;
    progressBar.style.width = `${progressWidth}%`

    let musicCurrentTime = card.querySelector("#current"),
    musicDuration = card.querySelector("#duration");

    mainAudio.addEventListener("loadeddata", () => {
      // let musicCurrentTime = card.querySelector("#current"),
      //  musicDuration = card.querySelector("#duration");


      //update song total duration 
      let audioDuration = mainAudio.duration;
      let totalMin = Math.floor(audioDuration /60);
      let totalSec = Math.floor(audioDuration % 60);
      if(totalSec < 10){
        totalSec = `0${totalSec}`;
      }
      musicDuration.innerText = `${totalMin}:${totalSec}`;
    });

      //update playing song current time 
      //let audioDuration = mainAudio.duration;
      let currentMin = Math.floor(currentTime /60);
      let currentSec = Math.floor(currentTime % 60);
      if(currentSec < 10){
        currentSec = `0${currentSec}`;
      }
      musicCurrentTime.innerText = `${currentMin}:${currentSec}`;
  
    // console.log(e)
  });






  progressArea.addEventListener("click", (e) =>{
    let progressWidthVal = progressArea.clientWidth;
    let clickedOffSetX = e.offsetX;

    let songDuration = mainAudio.duration;
    mainAudio.currentTime = (clickedOffSetX / progressWidthVal) * songDuration;
    playMusic();
  })

 const repeatBtn = card.querySelector("#repeat-plist")
 repeatBtn.addEventListener("click", () => {
       mainAudio.currentTime = 0;
       loadMusic(indexNumb)
   })



// })

mainAudio.addEventListener("ended", () => {
  nextMusic();
})



