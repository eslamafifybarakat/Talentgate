export interface Theme {
  name: string;
  properties: any;
}

export const light: Theme = {
  name: "light",
  properties: {
    "--text-main-color": " #006643",
    "--bg-main-color": " #006643",
    "--bg-white-color": "#fff",
    "--bg-onBoarding-color": "#f7f7f7",
    '--bg-input-color': "#fff",
    '--text-dark-color': "#111",
    '--bg-dark-color': "#111",

  },
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--text-main-color": " #000",
    "--bg-main-color": " #000",
    "--bg-white-color": "#111",
    "--bg-onBoarding-color": "#06141D",
    '--bg-input-color': "#1B2730",
    '--text-dark-color': "#fff",
    '--bg-dark-color': "#fff",
  }
}
