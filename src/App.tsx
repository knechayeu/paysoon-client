import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';
import { useProfileStore, useTelegram } from './hooks';
import { router } from './config';

const App = () => {
  const { tg, user }: { tg: WebApp; user: any } = useTelegram();
  const { colorMode, toggleColorMode } = useColorMode();
  const userProfileStore = useProfileStore((state: any) => state);

  useEffect(() => {
    if (colorMode === 'light') {
      toggleColorMode();
    }
  }, [colorMode]);

  useEffect(() => {
    tg.expand();
    tg.ready();
  }, [tg]);

  return <RouterProvider router={router} />;
};

export default App;
