import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useTelegram } from './hooks';
import { router } from './config/router';


const App = () => {
  const { tg }: { tg: WebApp } = useTelegram();

  useEffect(() => {
    console.log(tg.initDataUnsafe);
  }, [tg.initDataUnsafe])

  useEffect(() => {
    tg.ready();
  }, [tg]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
