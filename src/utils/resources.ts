export const getTextureURL = (texture: string) => {
  return `${import.meta.env.BASE_URL}assets/textures/${texture}`;
};

export const getMusicURL = (music: string) => {
  return `${import.meta.env.BASE_URL}assets/music/${music}`;
}

export const getSoundURL = (sound: string) => {
  return `${import.meta.env.BASE_URL}assets/sounds/${sound}`;
}
