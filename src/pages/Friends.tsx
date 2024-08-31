import {
  Avatar,
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Icon,
  Text,
} from '@chakra-ui/react';
import { Layout } from '../components';
import { useProfileStore, useScroll, useTelegram } from '../hooks';
import { AddIcon } from '@chakra-ui/icons';

const Friends = () => {
  const userProfile = useProfileStore((state: any) => state);
  const { showIcon } = useScroll();
  const { tg, user } = useTelegram();

  return (
    <Layout>
      <Flex flexDirection="column" gap={2}>
        <Heading size="sm">Список друзей</Heading>
        {Array.from({ length: 20 }, (v, index) => (
          <Card key={index} bg="black" variant="outline">
            <CardBody>
              <Flex alignItems="center" gap={4}>
                <Avatar src="" size="sm" cursor="pointer" />

                <Text>Бубин Бубенчик Бубенчикович</Text>
              </Flex>
            </CardBody>
          </Card>
        ))}
      </Flex>

      <Button
        colorScheme="teal"
        position="fixed"
        bottom="90px"
        right="20px"
        onClick={() =>
          tg.openTelegramLink(
            `https://t.me/share/url?url=https://t.me/test_local1234_bot/pay_soon_locally?start=${user?.id}&text=%F0%9F%92%B0Pay soon will be available soon`
          )
        }
      >
        {showIcon ? <Icon as={AddIcon} /> : 'Пригласить друга'}
      </Button>
    </Layout>
  );
};

export default Friends;
