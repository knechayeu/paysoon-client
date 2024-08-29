import { Image, Flex, Text } from '@chakra-ui/react';
import { useProfileStore } from '../../hooks';

export const UserProfile = () => {
  const userProfile = useProfileStore((state: any) => state.user);

  const fullName = `${userProfile?.last_name} ${userProfile?.first_name}`;

  return (
    <Flex alignItems="center" gap={4}>
      <Image
        borderRadius="full"
        src="gibbresh.png"
        fallbackSrc="https://via.placeholder.com/75"
      />
      <Flex flexDirection="column">
        <Text fontSize="xl" as="b">
          {fullName}
        </Text>

        <Text fontSize="xs">{userProfile?.username}</Text>
      </Flex>
    </Flex>
  );
};
