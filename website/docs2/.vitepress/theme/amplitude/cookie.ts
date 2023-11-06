export const AMPLITUDE_COOKIE_NAME = '_ampl';
export const AMPLITUDE_COOKIE_EXP_DATE = 30;

export const getCookie = (name: string): string => {
  const cookie = {};

  document.cookie.split(';').forEach((el) => {
    const [k, v] = el.split('=');
    cookie[k.trim()] = v;
  });

  return cookie[name] || '';
};

export const setCookie = (cname: string, cvalue: string, exdays: number) => {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = `expires=${d.toUTCString()}`;

  document.cookie = `${cname}=${cvalue};${expires};path=/;SameSite=None;Secure`;
};
