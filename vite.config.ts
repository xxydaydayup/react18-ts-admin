import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    // root 指向项目根目录（index.html）。可以绝对路径也可以相对此文件的相对路径
    root: './',
    // base: './api/',
    publicDir: 'public', // 静态资源目录
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    },
    server: {
        // host: 'localhost',
        port: 8080,
        proxy: {
            '/api': {
                target: 'http://api-driver.marsview.cc',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    },
    plugins: [react()]
})
