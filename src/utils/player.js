import local_storage from "./local_storage";

let enableSound = local_storage.getDefaults().enableSound;

const toggleSound = () => {
  enableSound = !enableSound;

  local_storage.setDefaults({
    enableSound
  });
};

const playSound = (obj = "#beep-one") => {
  if (enableSound) {
    var audioObj = document.querySelector(obj);
    audioObj.play();
  }
};

const stopSound = (obj = "#beep-one") => {
  var audioObj = document.querySelector(obj);
  audioObj.pause();
  audioObj.currentTime = 0;
};

export default {
  enableSound,
  toggleSound,
  playSound,
  stopSound
};
