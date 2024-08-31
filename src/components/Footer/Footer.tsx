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
} from '@chakra-ui/react';
import { useProfileStore, useTelegram } from '../../hooks';

import styles from './footer.module.scss';
import { ERouter } from '../../enums';

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
      <Grid w="100%" templateColumns="repeat(3, 1fr)" gap={6}>
        {listLinks.map((link, index) => (
          <GridItem
            key={index}
            w="100%"
            h="100%"
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
      </Grid>
    </Box>
  );
};
