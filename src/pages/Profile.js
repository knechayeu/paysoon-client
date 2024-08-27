import { Layout } from '../components';
import { useTelegram } from '../hooks';

const Profile = () => {
    const { user } = useTelegram();
    return (
        <Layout>
            <h1>{user?.username} - Писюн</h1>
            {JSON.stringify(user)}

        </Layout>
    );
}

export default Profile;
