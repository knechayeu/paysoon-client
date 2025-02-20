import {
  Box,
  Button,
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
import { useScroll, useTelegram } from '../hooks';
import { AddIcon } from '@chakra-ui/icons';
import RoomPreview from '../sections/rooms/room-preview';
import { createUser, getAllRooms } from '../services/api';

interface Room {
  id: number;
  title: string;
  description?: string;
  room_url?: string;
}

const Rooms = () => {
  const navigate = useNavigate();
  const { showIcon } = useScroll();
  const { user } = useTelegram();
  const location = useLocation()?.search;
  const id = new URLSearchParams(location).get('tgWebAppStartParam');

  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      createUser(user).then((userData) => {
        if (userData?.id) {
          sessionStorage.setItem('id', userData.id);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsData = await getAllRooms();
        setRooms(roomsData);
      } catch (error) {
        console.error('Failed to fetch rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handleViewDetails = (roomId: any) => {
    navigate(`/room/${roomId}`);

    console.log(`View details for room ${roomId}`);
  };

  return (
    <Layout isLoading={isLoading}>
      <Flex flex="1" gap={4} alignItems="flex-start">
        <SimpleGrid
          spacing={2}
          templateColumns="repeat(2, 1fr)"
          gap={4}
          w="100%"
        >
          {rooms.length ? (
            rooms.map((room) => (
              <RoomPreview
                key={room.id}
                title={room.title}
                description={room.description || ''}
                onViewDetails={() => handleViewDetails(room.id)}
              />
            ))
          ) : (
            <Stack height="100%" justifyContent="center" alignItems="center">
              <Flex>Нет доступных комнат</Flex>
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
