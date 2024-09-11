import {
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  useDisclosure,
  Box,
  IconButton,
  Slide,
  ListItem,
  List,
  Heading,
  Text,
  Checkbox,
  AbsoluteCenter,
  Divider,
  Flex,
  Avatar,
  AvatarBadge,
  Select,
} from '@chakra-ui/react';
import { Layout } from '../components';
import { CheckIcon, ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';

const CreateTransaction = () => {
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [transactionType, setTransactionType] = useState('equal');
  const { isOpen, onToggle } = useDisclosure();

  const handleSelectRoom = (roomId: number) => {
    setSelectedRoom({
      [roomId]: !selectedRoom?.[roomId],
    });
  };

  const handleSelectUser = (i: number) => {
    const hasUser = selectedUsers?.find((user: any) => user.id === i);

    if (hasUser) {
      const filterUser = selectedUsers?.filter((user: any) => user.id !== i);

      setSelectedUsers(filterUser);
      return;
    }
    const user = selectedUsers.concat({ id: i });

    setSelectedUsers(user);
  };

  const handleSelectType = (e: any) => {
    setTransactionType(e.target.value);
  };

  return (
    <Layout>
      <Stack spacing={4}>
        {/* <Stack spacing={4} flexDirection="row" overflowY="auto">
          {Array.from({ length: 50 }, (_, i) => (
            <Flex
              key={i}
              flexDirection="column"
              alignItems="center"
              gap={2}
              onClick={() => handleSelectRoom(i)}
            >
              <Avatar size="lg" name="Писюн рум" variant="outline">
                {!!selectedRoom?.[i] && (
                  <AvatarBadge
                    as={CheckIcon}
                    color="white"
                    borderColor="transparent"
                    bg="black"
                  />
                )}
              </Avatar>

              <Text align="center" color="gray.500" fontSize="xs">
                Писюн рум
              </Text>
            </Flex>
          ))}
        </Stack> */}

        <InputGroup>
          <InputLeftAddon onClick={onToggle}>BYN</InputLeftAddon>
          <Input type="number" placeholder="Введите сумму" />
        </InputGroup>

        <Select onChange={handleSelectType}>
          <option value="equal">Поровну</option>
          <option value="shuffle">Выборочно</option>
        </Select>

        {transactionType === 'shuffle' && (
          <Stack spacing={4} flexDirection="row" overflowY="auto">
            {Array.from({ length: 10 }, (_, i) => (
              <Flex
                key={i}
                flexDirection="column"
                alignItems="center"
                gap={2}
                onClick={() => handleSelectUser(i)}
              >
                <Avatar size="lg" name="Писюн юзер" variant="outline">
                  {!!selectedUsers?.find((user: any) => user.id === i) && (
                    <AvatarBadge
                      as={CheckIcon}
                      color="white"
                      borderColor="transparent"
                      bg="black"
                    />
                  )}
                </Avatar>

                <Text align="center" color="gray.500" fontSize="xs">
                  Писюн юзер {i}
                </Text>
              </Flex>
            ))}
          </Stack>
        )}

        {transactionType === 'shuffle' &&
          selectedUsers?.length &&
          selectedUsers.map((user: any, index: number) => (
            <Flex key={index} flexDirection="column" gap={2}>
              <Heading size="sm">Писюн юзер {user.id}</Heading>
              <Input type="number" placeholder="Введите сумму" />
            </Flex>
          ))}
      </Stack>

      <Flex
        padding="20px"
        position="fixed"
        bottom="70px"
        gap={2}
        right="0px"
        bg="black"
        left="0px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xs">
            Сумма будет распределена 
            {transactionType === 'equal' && ' поровну со всеми'}
            {transactionType === 'shuffle' && ` c ${selectedUsers?.length} участником(ами)`}
            </Text>

        <Button colorScheme="teal">Добавить</Button>
      </Flex>

      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box p="20px" mt="4" bg="black" height="calc(100vh - 70px)">
          <IconButton
            position="absolute"
            right="10px"
            top="0"
            aria-label="Close"
            variant="none"
            onClick={onToggle}
            icon={<CloseIcon />}
          />
          <List spacing={4} overflowY="auto" height="100%">
            {Array.from({ length: 100 }, (_, i) => (
              <ListItem key={i} onClick={onToggle}>
                <Heading size="sm">белорусский рубль (BYN)</Heading>
                <Text color="gray.500" fontSize="xs">
                  BYN
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      </Slide>
    </Layout>
  );
};

export default CreateTransaction;
