const keyEnableSound = "enableSound";

const getDefaults = () => {
  let ls = JSON.parse(localStorage.getItem(keyEnableSound));
  ls = ls !== null ? ls : true;

  return {
    enableSound: ls
  };
};

const setDefaults = (settings) => {
  localStorage.setItem(keyEnableSound, settings[keyEnableSound]);
};

export default {
  getDefaults,
  setDefaults
};
