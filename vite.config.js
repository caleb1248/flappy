import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'flappybird',
        short_name: 'flappy',
      },
    }),
  ],
});
