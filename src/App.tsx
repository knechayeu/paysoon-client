import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';
import { useTelegram } from './hooks';
import { useProfileStore } from './store';
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
    if (user?.id) {
      userProfileStore.updateUser(user);
    }
  }, [user]);

  useEffect(() => {
    tg.expand();
    tg.ready();
    tg.setHeaderColor('#000');
    tg.disableVerticalSwipes();
  }, [tg]);

  return <RouterProvider router={router} />;
};

export default App;
