import { Button } from '@chakra-ui/react';
import { Layout } from '../components';
import { useProfileStore, useTelegram } from '../hooks';

const Friends = () => {
  const userProfile = useProfileStore((state: any) => state);
  const { tg, user } = useTelegram();

  return (
    <Layout>
        {JSON.stringify(user)}
      <Button
        onClick={() =>
          tg.openTelegramLink(
            `https://t.me/share/url?url=https://t.me/test_local1234_bot/pay_soon_locally?start=${user?.id}&text=%F0%9F%92%B0Pay soon will be available soon`
          )
        }
      >
        Invite friend
      </Button>
    </Layout>
  );
};

export default Friends;
