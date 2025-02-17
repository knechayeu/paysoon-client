# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Конечно! Вот пример инструкции для `README.md`, которая описывает, как настроить и запустить ваше приложение с использованием `mkcert` для создания локального сертификата и Vite для разработки.

---

# Paysoon Client

## Требования

- Node.js (рекомендуется версия 14 или выше)
- npm или Yarn
- `mkcert` (для создания локальных сертификатов)

## Установка

1. **Установите зависимости**:

   ```sh
   npm install
   ```

   или

   ```sh
   yarn install
   ```

2. **Установите `mkcert`**:
   - **Windows**:
     ```sh
     choco install mkcert
     ```
   - **macOS и Linux**:
     ```sh
     brew install mkcert
     ```

## Настройка сертификата

1. **Создайте директорию для сертификатов**:

   ```sh
   mkdir -p .cert
   ```

2. **Создайте сертификат для `localhost`**:
   ```sh
   mkcert -key-file ./.cert/localhost-key.pem -cert-file ./.cert/localhost.pem localhost
   ```

## Настройка Vite

Создайте или отредактируйте файл `vite.config.js` в корневом каталоге проекта:

```js
import { defineConfig } from 'vite';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
    hmr: {
      host: 'tg-paysoon-mini-app.local',
      port: 5173
    },
    https: {
      key: fs.readFileSync('./.cert/localhost-key.pem'),
      cert: fs.readFileSync('./.cert/localhost.pem')
    }
  }
});
```

## Запуск приложения

Запустите приложение с использованием HTTPS:

```sh
npm run dev
```

или

```sh
yarn dev
```

Ваше приложение должно быть доступно по адресу `https://localhost:5173/` (или другому порту, который вы указали в конфигурации).