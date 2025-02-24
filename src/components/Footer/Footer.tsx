import { useLocation, useNavigate } from 'react-router-dom';
import { HiOutlineUser } from "react-icons/hi";
import { RiListSettingsFill } from "react-icons/ri";
import { IoAddCircleSharp } from "react-icons/io5";
import { IoIosStats } from "react-icons/io";



import { RiHomeLine } from "react-icons/ri";
import {
  Flex,
  Icon,
  Text,
  Stack,
} from '@chakra-ui/react';
import { useTelegram } from '../../hooks';
import { useProfileStore } from '../../store'

export const Footer = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { user } = useTelegram();
  const userProfile = useProfileStore((state: any) => state);

  const listLinks = [
    {
      title: 'Home',
      navigate: '/',
      icon: RiHomeLine,
    },
    {
      title: 'Friends',
      navigate: '/friends',
      icon: HiOutlineUser,
    },
    {
      title: 'Add',
      navigate: '/create-transaction',
      icon: IoAddCircleSharp,
    },
    {
      title: 'Statistics',
      navigate: '/statistics',
      icon: IoIosStats,
    },
    {
      title: 'Settings',
      navigate: '/profile',
      icon: RiListSettingsFill,
    },
  ];

  return (
    <Stack
      position="fixed"
      bottom={0}
      left={0}
      right={0}
      zIndex={1000}
      p={3}
      pl={4}
      pr={4}
      as="footer"
      boxSizing="border-box"
      boxShadow="0 0px 10px -0px teal"
    >
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        {listLinks.map((link) => (
          <Flex
            color={location.pathname === link.navigate ? 'teal' : 'initial'}
            onClick={() => navigate(link.navigate)}
            flexDirection="column"
            alignItems="center"
            gap={1}
          >
            <Icon as={link.icon} w={link?.title === 'Add' ? 12 : 6} h={link?.title === 'Add' ? 12 : 6} />
            {link.title !== 'Add' && <Text fontSize="xs">{link?.title}</Text>}
          </Flex>
        ))}
      </Flex>
    </Stack>
  );
};
