import { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { useColorMode } from '@chakra-ui/react';
import axios from 'axios';
import { useProfileStore, useTelegram } from './hooks';
import { router } from './config';

const App = () => {
  const { tg, user }: { tg: WebApp; user: any } = useTelegram();
  const { colorMode, toggleColorMode } = useColorMode();
  const userProfileStore = useProfileStore((state: any) => state);

  useEffect(() => {
    if (user?.id) {
      const getUser = async () => {
        const userData = await axios(
          `http://localhost:3001/user?id=${user.id}`
        );
        userProfileStore.updateUser(userData.data);

        console.log(userData.data)

        return userData;
      };

      getUser();
    }
  }, [user?.id]);

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
