import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Layout } from '../components';
import { ERouter } from '../enums';
import { useEffect } from 'react';
import axios from 'axios';
import { useTelegram } from '../hooks';

const Rooms = () => {
  const navigate = useNavigate();
  const { user } = useTelegram();
  const location = useLocation()?.search;
  const id = new URLSearchParams(location).get('tgWebAppStartParam');
  console.log(location, id, 1)

  useEffect(() => {
    if (id) {
      console.log(id, 11);
      const getUser = async () => {
        const userData = await axios.post(`http://localhost:3001/create-user`, {
          id: user?.id,
        });

        return userData;
      };

      getUser();
    }
  }, [id]);

  return (
    <Layout>
      <Flex gap={2} flexDirection="column">
        <SimpleGrid
          spacing={2}
          templateColumns="repeat(auto-fill, minmax(1fr, 1fr))"
        >
          {Array.from({ length: 3 }, (v, index) => (
            <Card key={index}>
              <CardHeader>
                <Heading size="md">Room {index}</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter>
                <Button
                  onClick={() =>
                    navigate({
                      pathname: ERouter.Room,
                      search: `?name=Писюн`,
                    })
                  }
                >
                  Join
                </Button>
              </CardFooter>
            </Card>
          ))}
        </SimpleGrid>

        <Button size="lg" bg="teal" onClick={() => navigate('/create-room')}>
          Create new Room
        </Button>
      </Flex>
    </Layout>
  );
};

export default Rooms;
