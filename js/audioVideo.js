// Audio Section
var pauseAudio = document.querySelector(".pauseAudio");

var audioElements = [
	document.getElementById("audio1"),
	document.getElementById("audio2"),
	document.getElementById("audio3")
	
  ];
  
  var audio;

  function playAudioSequentially(index) {
	if (index >= audioElements.length) {
	//   return; // Stop when all audio files have been played
		index=0;
	}
  
	audio = audioElements[index];
  
	audio.addEventListener("ended", function() {
	  setTimeout(function() {
		playAudioSequentially(index + 1); // Play the next audio file
	  }, 1000); // Delay between audio files (1 second in this example)
  
	  audio.removeEventListener("ended", arguments.callee); // Remove the event listener
	});
  
	audio.play();
  }
  
  playAudioSequentially(0); // Start playing audio files from the first index
  



  function toggleAudio() {
	if (audio.paused) {
		audio.play();
		pauseAudio.innerHTML = "🔊";
		pauseAudio.style.backgroundImage = "linear-gradient(to right, #ff000000, #00ff00)";

	}
	else {
		audio.pause();
		pauseAudio.innerHTML = "🔇";
		pauseAudio.style.backgroundImage = "linear-gradient(to right, #ff000000, #ff0000)";
	}

}















// Video Section
const love=document.querySelector('#love-button');
love.addEventListener('click',()=>{
    love.classList.add('iconColor')
})

const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');

const playBtn = document.getElementById('play-btn');
const stopBtn = player.querySelector('.stop');

const skipButtons = player.querySelectorAll('[data-skip]');

const speakerIcon = player.querySelector('#speaker_icon');
const ranges = player.querySelectorAll('.player_slider');
/* MUTE button */
const speaker = player.querySelector('.speaker');
const volInput = player.querySelector('input[name="volume"]')
//const speakerIcon = player.querySelector('#speaker_icon'); 

// Play Img
let videoDiv=document.querySelector('.videoDiv');

// videoDiv Play image
videoDiv.addEventListener('click',()=>{
  video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    videoDiv.classList.add('hidden');
    toggleAudio();   //audio pause
})


// show play button when paused
function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'Play');  
}

// toggle between play and pause
function togglePlay() {
  if (video.paused) {
    video.play();

    toggleAudio();   //audio pause


    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause');
    videoDiv.classList.add('hidden');
  } else {
    video.pause();
   
    toggleAudio();   //audio pause

    showPlayIcon();
    videoDiv.classList.remove('hidden');
    
  }
}

// Stop video
function stopVideo() {
  video.currentTime = 0;
  video.pause();
  videoDiv.classList.remove('hidden');
}

// not sure, is this for FF and REW?
function skip() {
  video.currentTime += +(this.dataset.skip);
}

// volume functions
function handleRangeUpdate() {
  video[this.name] = this.value;
  (video['volume'] === 0 ? speakerIcon.className = "fa fa-volume-off" :
    speakerIcon.className = "fa fa-volume-up")
}

let muted = false;

function mute() {
  if (!muted) {
    video['volume'] = 0;
    volInput.value = 0;
    speakerIcon.className = "fa fa-volume-off"
    muted = true;
  } else {
    video['volume'] = 1;
    volInput.value = 1;
    muted = false;
    speakerIcon.className = "fa fa-volume-up"
  }
}

// update progress bar as the video plays
function updateProgress() {
  progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`;
  // currentTime.textContent = `${displayTime(video.currentTime)} /`;
  // duration.textContent = `${displayTime(video.duration)}`;
}
// Calculate display time format
function displayTime(time) {
  const minutes = Math.floor(time / 60);
  let seconds = Math.floor(time % 60);
  seconds = seconds > 9 ? seconds : `0${seconds}`;
  return `${minutes}:${seconds}`;
}

// Click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;
}

function scrub(event) {
  const scrubTime = (event.offsetX / progressRange.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Spacebar used to play and pause
document.body.onkeyup = function (e) {
  if (e.keyCode == 32) {
    togglePlay();
  }
}

// =======================
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress);
// ===================
/*functions linked to elements*/
// play, pause, stop
video.addEventListener('click', togglePlay);
video.addEventListener('keydown', (event) => event.keyCode === 32 && togglePlay());
playBtn.addEventListener('click', togglePlay);
stopBtn.addEventListener('click', stopVideo);
// skip forward or backward
skipButtons.forEach(button => button.addEventListener('click', skip));
// volume
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));
speaker.addEventListener('click', mute)

// progress bar controls
let mouseDown = false;
progressRange.addEventListener('click', scrub);
progressRange.addEventListener('mousemove', (event) => mouseDown && scrub(event));
progressRange.addEventListener('mousedown', () => mouseDown = true);
progressRange.addEventListener('mouseup', () => mouseDown = false);

//fullscreen mode 
const screen_size = player.querySelector('.screenSize');
const controls = player.querySelector('.player_controls');
const screenSize_icon = player.querySelector('#screenSize_icon');

function changeScreenSize() {
  if (player.mozRequestFullScreen) {

    player.mozRequestFullScreen();
    //change icon
    screenSize_icon.className = "fa fa-compress";
    /*control panel once fullscreen*/
    video.addEventListener('mouseout', () => controls.style.transform = 'translateY(100%) translateX(-5px)');
    video.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
    controls.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
    screen_size.addEventListener('click', () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
        screenSize_icon.className = "fa fa-expand";
      }
    });
  } else if (player.webkitRequestFullScreen) {

    player.webkitRequestFullScreen();

    screenSize_icon.className = "fa fa-compress";

    video.addEventListener('mouseout', () => controls.style.transform = 'translateY(100%) translateX(-5px)');
    video.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
    controls.addEventListener('mouseover', () => controls.style.transform = 'translateY(0)');
    screen_size.addEventListener('click', () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
        screenSize_icon.className = "fa fa-expand";
      }
    });
  }
}
screen_size.addEventListener('click', changeScreenSize);
/* end full screen */







//Scroll postion on Video
window.addEventListener('scroll', function() {
  var scrollPosition = window.scrollY; // Get the current scroll position
  console.log(scrollPosition);

  // Check your desired conditions to play/pause
  if (scrollPosition > 200 ) {
    // Pause the video or audio element
    playBtn.classList.replace('fa-play', 'fa-pause');
    // video.pause();
    togglePlay();

    // toggleAudio();   //audio pause
  } else {
    // Play the video or audio element
    // Example: videoElement.play();
    playBtn.classList.replace('fa-pause','fa-play');
    // video.play();
    // toggleAudio();   //audio pause
  }
});

