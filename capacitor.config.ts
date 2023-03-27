import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.todo',
  appName: 'ToDo-App',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '668049412758-mgqq5of12cuq02pf1qf9co2u9u24313d.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
    LocalNotifications: {
      "smallIcon": "ic_stat_icon_config_sample",
      "iconColor": "#488AFF",
      "sound": "beep.wav"
    }
  },
};

export default config;
