import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode }: { mode: string }) => {
    const env = loadEnv(mode, '.', '');
    return {
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(path.dirname(import.meta.url), '.'),
        }
      },
      base: '/PlanNus/', // Replace 'PlanNus' with your repository name if different
    };
});
