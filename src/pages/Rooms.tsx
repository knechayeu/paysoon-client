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
import { useNavigate } from 'react-router-dom';

import { Layout } from '../components';

const Rooms = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <Flex gap={2} flexDirection="column">
        <SimpleGrid
          spacing={2}
          templateColumns="repeat(auto-fill, minmax(1fr, 1fr))"
        >
          {Array.from({ length: 3 }, (v, index) => (
            <Card>
              <CardHeader>
                <Heading size="md">Room {index}</Heading>
              </CardHeader>
              <CardBody>
                <Text>
                  View a summary of all your customers over the last month.
                </Text>
              </CardBody>
              <CardFooter>
                <Button>Join</Button>
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
