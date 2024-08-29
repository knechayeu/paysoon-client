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
  ScaleFade,
  Fade,
  useDisclosure,
  Slide,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { useLocation } from 'react-router-dom';
import { Layout } from '../components';
import { CloseIcon } from '@chakra-ui/icons';

const Room = () => {
  const { isOpen, onToggle } = useDisclosure();
  const location = useLocation()?.search;
  const name = new URLSearchParams(location).get('name');

  return (
    <Layout>
      <Flex alignItems="flex-start" flexDirection="column" gap={4}>
        <Flex alignItems="center" gap={4}>
          <Image
            borderRadius="10"
            src="gibbresh.png"
            fallbackSrc="https://via.placeholder.com/75"
          />
          <Box>
            <Heading size="lg">{name}</Heading>

            <Text fontSize="sm">Должники</Text>
          </Box>
        </Flex>
        <Tabs w="100%" size="md" variant="enclosed">
          <TabList>
            <Tab>Settle up</Tab>
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
            <Input variant='outline' placeholder='Outline' />
            <Input variant='outline' placeholder='Outline' />
            <Input variant='outline' placeholder='Outline' />
            <Input variant='outline' placeholder='Outline' />
          </Flex>

        </Box>
      </Slide>

      <Button
        onClick={onToggle}
        colorScheme="teal"
        position="fixed"
        bottom="70px"
        right="20px"
      >
        Add expense
      </Button>
    </Layout>
  );
};

export default Room;
