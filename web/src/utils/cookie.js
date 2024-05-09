import Cookies from "js-cookie";

export const setCookie = (key, value, exp = 7) => {
  return Cookies.set(key, JSON.stringify(value), { expires: exp });
};

export const getCookie = (key) => {
  return JSON.parse(Cookies.get(key) || null);
};

export const removeCookie = (key) => {
  return Cookies.remove(key);
};
