import {
  Flex,
  Text,
  Avatar,
  AvatarBadge,
  Stack,
  Stat,
  StatArrow,
  StatGroup,
  StatHelpText,
  StatLabel,
  StatNumber,
  Box,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  AbsoluteCenter,
  Divider,
  Heading,
} from '@chakra-ui/react';
import { CiCamera } from 'react-icons/ci';

import { useProfileStore } from '../../hooks';
import { useRef } from 'react';
import { formatPrice } from '../../utils';
import { useNavigate } from 'react-router-dom';
import { ERouter } from '../../enums';

export const UserProfile = () => {
  const navigate = useNavigate();
  const fileUploadRef: any = useRef();
  const userProfile = useProfileStore((state: any) => state);

  const fullName = `${userProfile.user?.last_name} ${userProfile.user?.first_name}`;

  const uploadImageDisplay = () => {
    const uploadedFile = fileUploadRef.current.files[0];
    // const formData = new FormData();
    // formData.append('file', uploadedFile);
    const cachedURL = URL.createObjectURL(uploadedFile);

    userProfile.updateUser({ ...userProfile.user, avatarUrl: cachedURL });
  };
  return (
    <Stack flexDirection="column" gap={10}>
      <Flex
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        gap={4}
      >
        <Avatar
          src={userProfile.user?.avatarUrl}
          size="xl"
          cursor="pointer"
          onClick={() => fileUploadRef.current.click()}
        >
          <AvatarBadge border="none" bg="#000" w={12} h={12}>
            <CiCamera />
          </AvatarBadge>
        </Avatar>
        <input
          type="file"
          id="file"
          onChange={uploadImageDisplay}
          ref={fileUploadRef}
          hidden
        />
        <Flex flexDirection="column" alignItems="center">
          <Text fontSize="2xl" as="b">
            {fullName}
          </Text>

          <Text fontSize="sm">{userProfile.user?.username}</Text>
        </Flex>
      </Flex>

      <Flex flexDirection="column" gap={8}>
        <Box position="relative">
          <Divider />
          <AbsoluteCenter px="4" bg="black">
            <Heading size="sm">Статистика</Heading>
          </AbsoluteCenter>
        </Box>

        <Tabs w="100%" isFitted size="md" colorScheme="teal" variant="enclosed">
          <TabList>
            <Tab>Общая</Tab>
            <Tab>По комнатам</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <StatGroup>
                <Stat>
                  <StatLabel>Заплатил</StatLabel>
                  <StatNumber>{formatPrice(340000)}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="increase" />
                    23.36%
                  </StatHelpText>
                </Stat>

                <Stat>
                  <StatLabel>Получил</StatLabel>
                  <StatNumber>{formatPrice(300000)}</StatNumber>
                  <StatHelpText>
                    <StatArrow type="decrease" />
                    9.05%
                  </StatHelpText>
                </Stat>
              </StatGroup>
            </TabPanel>
            <TabPanel>
              <Flex flexDirection="column" gap={4}>
                {Array.from({ length: 20 }, (v, index) => {
                  const max = Math.floor(Math.random() * 1000000 + 1);

                  return (
                    <Flex onClick={() => navigate(`${ERouter.Room}?name=Комната ${index}`)} flex={1} flexDirection="column" gap={2} key={index}>
                      <Text color="teal" as="b">
                        Комната {index}
                      </Text>
                      <StatGroup flex={1} key={index}>
                        <Stat>
                          <StatLabel>Заплатил</StatLabel>
                          <StatNumber>{formatPrice(max)}</StatNumber>
                        </Stat>

                        <Stat>
                          <StatLabel>Получил</StatLabel>
                          <StatNumber>
                            {formatPrice(Math.floor(Math.random() * max + 1))}
                          </StatNumber>
                        </Stat>
                      </StatGroup>
                      <Divider />
                    </Flex>
                  );
                })}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Stack>
  );
};
