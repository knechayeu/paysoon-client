import { Flex, Image, Text } from '@chakra-ui/react';
import { Layout } from '../components';
import { useProfileStore, useTelegram } from '../hooks';

const Profile = () => {
  const { user } = useTelegram();
  const profile = useProfileStore((state: any) => state);

  const fullName = `${user?.last_name} ${user?.first_name}`;

  return (
    <Layout>
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

          <Text fontSize="xs">{user?.username}</Text>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Profile;
