import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Relative base so the build works at https://<user>.github.io/corevm-apps/
// as well as at the domain root.
export default defineConfig({ base: './', plugins: [vue()] });
