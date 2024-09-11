import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserGroup, FaUser } from 'react-icons/fa6';
import { MdManageAccounts } from 'react-icons/md';
import {
  Flex,
  Icon,
  Text,
  Box,
  Avatar,
  GridItem,
  Grid,
  Stack,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { useTelegram } from '../../hooks';
import { useProfileStore } from '../../store';

import styles from './footer.module.scss';
import { ERouter } from '../../enums';
import { AddIcon } from '@chakra-ui/icons';

export const Footer = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { user } = useTelegram();
  const userProfile = useProfileStore((state: any) => state);

  const listLinks = [
    {
      title: 'Rooms',
      navigate: '/',
      icon: FaUserGroup,
    },
    {
      title: 'Friends',
      navigate: '/friends',
      icon: FaUser,
    },
    {
      title: user?.username || 'Profile',
      navigate: '/profile',
      icon: MdManageAccounts,
    },
  ];

  return (
    <Box
      p={3}
      pl={4}
      pr={4}
      bg="gray.900"
      borderTop="1px solid teal"
      rounded="xl"
      boxShadow="0 0px 10px -0px teal"
      className={styles.footer}
    >
      <Grid w="100%" templateColumns="repeat(6, 1fr)" gap={6}>
        <GridItem colStart={1} colEnd={3} w="100%">
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={6}
            height="100%"
          >
            <Flex
              color={
                location.pathname === listLinks[0].navigate ? 'teal' : 'initial'
              }
              alignItems="center"
              flexDirection="column"
              justifyContent="flex-end"
              gap={1}
              onClick={() => navigate(listLinks[0].navigate)}
              cursor="pointer"
            >
              {listLinks[0].navigate === ERouter.Profile ? (
                <Avatar
                  src={userProfile.user?.avatarUrl}
                  w={6}
                  h={6}
                  cursor="pointer"
                />
              ) : (
                <Icon as={listLinks[0].icon} w={6} h={6} />
              )}
              <Text fontSize="xs">{listLinks[0].title}</Text>
            </Flex>

            <Flex
              color={
                location.pathname === listLinks[1].navigate ? 'teal' : 'initial'
              }
              alignItems="center"
              flexDirection="column"
              justifyContent="flex-end"
              gap={1}
              onClick={() => navigate(listLinks[1].navigate)}
              cursor="pointer"
            >
              {listLinks[1].navigate === ERouter.Profile ? (
                <Avatar
                  src={userProfile.user?.avatarUrl}
                  w={6}
                  h={6}
                  cursor="pointer"
                />
              ) : (
                <Icon as={listLinks[1].icon} w={6} h={6} />
              )}
              <Text fontSize="xs">{listLinks[1].title}</Text>
            </Flex>
          </Stack>
        </GridItem>
        {/* <GridItem w="100%" h="10" bg="blue.500" /> */}
        <GridItem
          display="flex"
          alignItems="center"
          justifyContent="center"
          colStart={3}
          colEnd={5}
          w="100%"
        >
          <IconButton
            position="absolute"
            top="-25px"
            // boxShadow="0 0px 10px -0px teal"
            aria-label="Search database"
            // colorScheme="teal"
            variant="solid"
            borderRadius="50%"
            bg="black"
            size="lg"
            icon={<AddIcon />}
          />
        </GridItem>
        <GridItem colStart={5} colEnd={7} w="100%">
          <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            gap={6}
          >
            <Flex
              color={
                location.pathname === listLinks[2].navigate ? 'teal' : 'initial'
              }
              alignItems="center"
              flexDirection="column"
              justifyContent="flex-end"
              gap={1}
              onClick={() => navigate(listLinks[2].navigate)}
              cursor="pointer"
            >
              {listLinks[2].navigate === ERouter.Profile ? (
                <Avatar
                  src={userProfile.user?.avatarUrl}
                  w={6}
                  h={6}
                  cursor="pointer"
                />
              ) : (
                <Icon as={listLinks[2].icon} w={6} h={6} />
              )}
              <Text fontSize="xs">{listLinks[2].title}</Text>
            </Flex>

            <Flex
              color={
                location.pathname === listLinks[2].navigate ? 'teal' : 'initial'
              }
              alignItems="center"
              flexDirection="column"
              justifyContent="flex-end"
              gap={1}
              onClick={() => navigate(listLinks[2].navigate)}
              cursor="pointer"
            >
              {listLinks[2].navigate === ERouter.Profile ? (
                <Avatar
                  src={userProfile.user?.avatarUrl}
                  w={6}
                  h={6}
                  cursor="pointer"
                />
              ) : (
                <Icon as={listLinks[2].icon} w={6} h={6} />
              )}
              <Text fontSize="xs">{listLinks[2].title}</Text>
            </Flex>
          </Stack>
        </GridItem>
        {/* <GridItem w="100%" h="10" bg="blue.500" /> */}
        {/* <GridItem w="100%" h="10" bg="blue.500" /> */}
      </Grid>
      {/* <Grid w="100%" templateColumns="repeat(5, 1fr)" gap={6}>
        {listLinks.map((link, index) => (
          <GridItem
          w='100%' h='10' bg='blue.500'
            key={index}
            // w="100%"
            // h="100%"
            display="flex"
            color={location.pathname === link.navigate ? 'teal' : 'initial'}
            alignItems="center"
            flexDirection="column"
            justifyContent="flex-end"
            gap={1}
            onClick={() => navigate(link.navigate)}
            cursor="pointer"
          >
            {link.navigate === ERouter.Profile ? (
              <Avatar
                src={userProfile.user?.avatarUrl}
                w={6}
                h={6}
                cursor="pointer"
              />
            ) : (
              <Icon as={link.icon} w={6} h={6} />
            )}
            <Text fontSize="xs">{link.title}</Text>
          </GridItem>
        ))}
      </Grid> */}
    </Box>
  );
};
