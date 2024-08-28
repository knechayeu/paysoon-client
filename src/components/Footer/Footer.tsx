import { useLocation, useNavigate } from 'react-router-dom';
import { FaUserGroup, FaUser } from 'react-icons/fa6';
import { MdManageAccounts } from 'react-icons/md';
import { Flex, Icon, Text, Box } from '@chakra-ui/react';
import { useTelegram } from '../../hooks';

import styles from './footer.module.scss';

export const Footer = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { user } = useTelegram();

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
      p={2}
      pl={4}
      pr={4}
      bg="gray.800"
      boxShadow="inner"
      rounded="md"
      className={styles.footer}
    >
      <Flex
        flex={1}
        gap={4}
        alignItems="center"
        justifyContent="space-between"
      >
        {listLinks.map((link, index) => (
          <Flex
            key={index}
            color={location.pathname === link.navigate ? 'teal' : 'initial'}
            alignItems="center"
            flexDirection="column"
            gap={1}
            onClick={() => navigate(link.navigate)}
            cursor="pointer"
          >
            <Icon as={link.icon} />
            <Text fontSize="xs">{link.title}</Text>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};
