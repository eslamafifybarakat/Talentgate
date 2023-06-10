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
    '--bg-counterDot': "#cdd3df",
    '--body-color': "#ebeef5",
    '--grey-900': '#0000008a',
    '--text-form-title-color': '#3A5380',
    '--bg-register-input-color': '#576f9333',
    '--register-photo-color': '#9aa8be'

  },
};

export const dark: Theme = {
  name: "dark",
  properties: {
    "--text-main-color": " #000",
    "--bg-main-color": " #000",
    "--bg-white-color": "#1B2730",
    "--bg-onBoarding-color": "#06141D",
    '--bg-input-color': "#576F9333",
    '--text-dark-color': "#fff",
    '--bg-dark-color': "#fff",
    '--bg-counterDot': "#0F2656",
    '--body-color': "#06141D",
    '--grey-900': '#ffffff8a',
    '--text-form-title-color': '#FFFFFF',
    '--bg-register-input-color': '#576F9333',
    '--register-photo-color': '#3e526b'
  }
}
