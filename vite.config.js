import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // extra use korahe from chatgpt this server  || for vite error ||we must use  http://localhost:2000/
  server: {
    host: '127.0.0.1', // IPv4 localhost
    port: 2000 // চাইলে অন্য ফ্রি পোর্ট দিতে পারো
  }
})
