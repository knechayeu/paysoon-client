import {
  Heading,
  Image,
  Flex,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Box,
  Button,
  Avatar,
  Badge,
  Fade,
  useDisclosure,
  Slide,
  IconButton,
  Input,
  Icon,
} from '@chakra-ui/react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Layout } from '../components';
import { AddIcon, ArrowBackIcon, CloseIcon } from '@chakra-ui/icons';
import { useScroll } from '../hooks';
import { ERouter } from '../enums';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from '../constants';

const Room = () => {
  const { isOpen, onToggle } = useDisclosure();
  const { showIcon } = useScroll();
  let params = useParams();
  const navigate = useNavigate();
  const location = useLocation()?.search;

  const [currentRoom, setCurrentRoom] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      const getCurrentRoom = async () => {
        try {
          const room = await axios(`${BACKEND_URL.GetRoom}/${params.id}`);
          console.log(room, 1919);

          setCurrentRoom(room.data);
          setIsLoading(false);

          return room;
        } catch (e: any) {
          if (e?.status === 307) {
            navigate(-1);
          }
        }
      };

      getCurrentRoom();
    }
  }, [params.id]);

  return (
    <Layout isLoading={isLoading}>
      <Icon
        mb={4}
        onClick={() => navigate(-1)}
        as={ArrowBackIcon}
        w={7}
        h={7}
      />
      <Flex alignItems="flex-start" flexDirection="column" gap={4}>
        <Flex alignItems="center" gap={4}>
          <Image
            borderRadius="10"
            src="gibbresh.png"
            fallbackSrc="https://via.placeholder.com/75"
          />
          <Box>
            <Heading size="lg">{currentRoom?.title}</Heading>

            <Text fontSize="sm">Описание</Text>
          </Box>
        </Flex>
        <Tabs w="100%" isFitted size="md" colorScheme="teal" variant="enclosed">
          <TabList>
            <Tab>История</Tab>
            <Tab>Two</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Fade in={true}>
                <Flex flexDirection="column" gap={6}>
                  {Array.from({ length: 20 }, (v, index) => (
                    <Flex gap={4} alignItems="center" key={index}>
                      <Avatar size="sm" bg="teal" name="Pay Soon" />
                      <Flex
                        justifyContent="space-between"
                        flex="1"
                        alignItems="center"
                      >
                        <Box>
                          <Text fontWeight="bold" fontSize="lg">
                            Pay soon
                            <Badge variant="outline" ml="2" colorScheme="green">
                              Pay
                            </Badge>
                          </Text>
                          <Text fontSize="sm">Pay soon paid 88,77 BYN</Text>
                        </Box>
                        <Box color="orange">
                          <Text fontWeight="bold" fontSize="sm">
                            you borrowed
                          </Text>
                          <Text align="right" fontSize="xs">
                            88,77 BYN
                          </Text>
                        </Box>
                      </Flex>
                    </Flex>
                  ))}
                </Flex>
              </Fade>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>

      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box
          position="relative"
          h="88vh"
          p="10px"
          color="white"
          mt="4"
          bg="teal.500"
          rounded="md"
          shadow="md"
          borderRightRadius={25}
          borderLeftRadius={25}
        >
          <IconButton
            position="absolute"
            right="10px"
            top="10px"
            aria-label="Close"
            variant="none"
            onClick={onToggle}
            icon={<CloseIcon />}
          />

          <Flex flexDirection="column" gap={4}>
            <Heading>Add expense</Heading>
            <Input variant="outline" placeholder="Outline" />
            <Input variant="outline" placeholder="Outline" />
            <Input variant="outline" placeholder="Outline" />
            <Input variant="outline" placeholder="Outline" />
          </Flex>
        </Box>
      </Slide>

      <Button
        onClick={() => navigate(ERouter.CreateTransaction)}
        colorScheme="teal"
        position="fixed"
        bottom="90px"
        right="20px"
      >
        {showIcon ? <Icon as={AddIcon} /> : 'Внести оплату'}
      </Button>
    </Layout>
  );
};

export default Room;
