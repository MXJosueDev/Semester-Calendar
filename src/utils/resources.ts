export const joinRoutes = (...routes: string[]): string => {
  return routes.map(route => route.replace(/(^\/+|\/+$)/g, '')).join('/');
}

export const getTextureURL = (texture: string) => {
  return joinRoutes(`${import.meta.env.BASE_URL}`, `/assets/textures/${texture}`);
};

export const getMusicURL = (music: string) => {
  return joinRoutes(`${import.meta.env.BASE_URL}`, `/assets/music/${music}`);
}

export const getSoundURL = (sound: string) => {
  return joinRoutes(`${import.meta.env.BASE_URL}`, `assets/sounds/${sound}`);
}
