import React from 'react';
import { Layout } from '../components';
import { useTelegram } from '../hooks';
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';

const CreateRoom = () => {
  const [show, setShow] = React.useState(false);
  const { user } = useTelegram();

  const handleClick = () => setShow(!show);

  return (
    <Layout>
      <Box position="relative" pb={10} pt={10}>
        <Divider />
        <AbsoluteCenter px="4" bg="gray.800">
          <Heading size="sm">Create new room</Heading>
        </AbsoluteCenter>
      </Box>

      <Flex flexDirection="column" gap={4} mb={4}>
        <FormControl isRequired>
          <FormLabel>Room name</FormLabel>
          <Input placeholder="Room name" />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type={show ? 'text' : 'password'}
              placeholder="Enter password"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <Button>Submit</Button>
      </Flex>
    </Layout>
  );
};

export default CreateRoom;
