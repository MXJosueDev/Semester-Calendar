import { getSoundURL } from "./resources";

export const playClickSound = () => {
  const click_sound = new Audio(getSoundURL("click.ogg"));
  
  click_sound.currentTime = 0;
  click_sound.play();
}