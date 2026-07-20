const joinRoutes = (...routes: string[]): string => {
  const joined = routes.map(route => route.replace(/(^\/+|\/+$)/g, '')).join('/');
  return joined.startsWith('/') ? joined : `/${joined}`;
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

export const getModelURL = (model: string) => {
  return joinRoutes(`${import.meta.env.BASE_URL}`, `assets/models/${model}`);
}