import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Image,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Layout } from '../components';
import { ERouter } from '../enums';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useScroll, useTelegram } from '../hooks';
import { AddIcon } from '@chakra-ui/icons';

const Rooms = () => {
  const navigate = useNavigate();
  const { showIcon } = useScroll();
  const { user } = useTelegram();
  const location = useLocation()?.search;
  const id = new URLSearchParams(location).get('tgWebAppStartParam');

  const [listRooms, setListRooms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   if (id) {
  //     console.log(id, 11);
  //     const getUser = async () => {
  //       const userData = await axios.post(`http://localhost:3001/create-user`, {
  //         ...user,
  //       });

  //       return userData;
  //     };

  //     getUser();
  //   }
  // }, [id]);

  useEffect(() => {
    if (user) {
      const getUser = async () => {
        const userData = await axios.post(`http://localhost:3001/create-user`, {
          ...user,
        });

        console.log(userData, 19191);

        if (userData.data?.id) {
          sessionStorage.setItem('id', userData.data.id);
        }

        return userData;
      };

      getUser();
    }
  }, [user]);

  useEffect(() => {
    const getAllRooms = async () => {
      const rooms = await axios(`http://localhost:3001/rooms`);
      console.log(rooms.data, 1919);

      setListRooms(rooms.data);

      setIsLoading(false);
      return rooms;
    };

    getAllRooms();
  }, []);

  return (
    <Layout isLoading={isLoading}>
      <Flex gap={2} flexDirection="column" height="100%">
        <SimpleGrid
          spacing={2}
          templateColumns="repeat(auto-fill, minmax(1fr, 1fr))"
          {...(!listRooms?.length && { height: '100%' })}
          // height="100%"
        >
          {listRooms?.length ? (
            listRooms.map((room, index) => (
              <Box
                key={index}
                display="flex"
                flexDirection="row"
                borderRadius="10px"
                padding={2}
                boxShadow="0px 2px 2px 0px teal"
                // overflow="hidden"
                // variant="outline"
                gap={4}
                onClick={() =>
                  navigate({
                    pathname: `${ERouter.Room}/${room.id}`,
                  })
                }
              >
                <Image
                  // width="75px"
                  // margin="0 auto"
                  objectFit="cover"
                  maxW={{ base: '75px', sm: '200px' }}
                  borderRadius="10"
                  src="gibbresh.png"
                  fallbackSrc={
                    room?.room_url?.length
                      ? room.room_url
                      : 'https://via.placeholder.com/75'
                  }
                  cursor="pointer"
                />
                <Stack>
                  <Heading size="sm">{room?.title}</Heading>
                  {room?.description?.length && (
                    <Text p={0} fontSize="xs">
                      {room.description}
                    </Text>
                  )}
                </Stack>
              </Box>
            ))
          ) : (
            <Stack height="100%" justifyContent="center" alignItems="center">
              <Flex>Комнат нет</Flex>
            </Stack>
          )}
        </SimpleGrid>

        <Button
          onClick={() => navigate('/create-room')}
          colorScheme="teal"
          position="fixed"
          bottom="85px"
          right="20px"
        >
          {showIcon ? <Icon as={AddIcon} /> : 'Создать комнату'}
        </Button>
      </Flex>
    </Layout>
  );
};

export default Rooms;
