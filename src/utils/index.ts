import { serverUrl } from "../constants/envs";

export const formatter = new Intl.DateTimeFormat("sv-SE", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export const formatDate = (date: Date) => {
  return formatter.format(date);
};

export const imgUrl = (path: string) => {
  return `${serverUrl}/${path}`;
};

export const setNewDate = (date: string | null | undefined) => {
  return new Date(date || Date.now()).toISOString().split("T")[0];
};

export const ls = {
  key: "userId",
  set: function (id: number) {
    localStorage.setItem(this.key, String(id));
  },
  get: function () {
    return localStorage.getItem(this.key);
  },
  remove: function () {
    localStorage.removeItem(this.key);
  },
};
