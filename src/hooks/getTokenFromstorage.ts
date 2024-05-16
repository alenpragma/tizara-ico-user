export const getTizaraUserToken = () => {
  const token = localStorage.getItem('tizaraUserToken');

  return token;
};

export const setTizaraUserToken = (token: string) => {
  localStorage.setItem('tizaraUserToken', token);
};

export const removeTizaraUserToken = () => {
  localStorage.removeItem('tizaraUserToken');
};
