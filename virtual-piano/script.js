const piano = document.querySelector('.piano');

const pianoКeys = document.querySelectorAll('.piano-key');

const audio = document.querySelector(`audio`);

const btnLetters = document.querySelector('.btn-letters');

const btnNotes = document.querySelector('.btn-notes');

let isMousePressed = false;

btnLetters.addEventListener('click', () => {
  btnLetters.classList.add('btn-active');
  btnNotes.classList.remove('btn-active');

  pianoКeys.forEach(x => {
    x.classList.add('piano-key-letter', 'letter');
  })
})

btnNotes.addEventListener('click', () => {
  btnNotes.classList.add('btn-active');
  btnLetters.classList.remove('btn-active');

  pianoКeys.forEach(x => {
    x.classList.remove('piano-key-letter', 'letter');
  })
})

const playAudio = (src) => {
  const audio = new Audio();
  audio.src = src;
  audio.currentTime = 0;
  audio.play();
};

piano.addEventListener('mousedown', (event) => {
  if(event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }   
})

const startPlayAudio = (event) => {
  if (!isMousePressed) return;
  event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
  audio.currentTime = 0;

  if(event.target.classList.contains('piano-key')) {
    const note = event.target.dataset.note;
    const src = `assets/audio/${note}.mp3`;
    playAudio(src);
  }   
};

const stopPlayAudio = (event) => {
  event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
};

const startCorrespondOver = (event) => {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.add('active');
  }
  isMousePressed = true;
  pianoКeys.forEach((elem) => {
    elem.addEventListener('mouseover', startPlayAudio)
    elem.addEventListener('mouseout', stopPlayAudio)
  })

};

const stopCorrespondOver = () => {
  pianoКeys.forEach((elem) => {
    elem.classList.remove('active');
    elem.removeEventListener('mouseover', startPlayAudio);
    elem.removeEventListener('mouseout', stopPlayAudio);
    isMousePressed = false;
  });
}

document.addEventListener('mousedown', (event) => {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.add('piano-key-active', 'piano-key-active-pseudo');
  }
  isMousePressed = true;
})

document.addEventListener('mouseup', (event) => {
  if (event.target.classList.contains('piano-key')) {
    event.target.classList.remove('piano-key-active', 'piano-key-active-pseudo');
  }
  isMousePressed = false;
})

piano.addEventListener('mousedown', startCorrespondOver, false);
document.addEventListener('mouseup', stopCorrespondOver);


function playSound (e) {
  const audio = document.querySelector(`audio[data-key="${e.code}"]`);
  const key = document.querySelector(`div[data-key="${e.code}"]`);
  if (!audio) return;
  if (e.repeat) return;
 
  audio.currentTime = 0;
  audio.play();
  key.classList.add('piano-key-active');
} 

function removeKey (e) {
  const key = document.querySelector(`div[data-key="${e.code}"]`);
  key.classList.remove('piano-key-active');
}
window.addEventListener('keydown', playSound);
window.addEventListener('keyup', removeKey);

document.addEventListener('click', function (event) {
  if (!event.target.hasAttribute('data-toggle-fullscreen')) return;
  if (document.fullscreenElement) {
    document.exitFullscreen();
  } else {
    document.documentElement.requestFullscreen();
  }
}, false);






