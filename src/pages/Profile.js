import { Layout } from '../components';
import { useTelegram } from '../hooks';

const Profile = () => {
    const { user } = useTelegram();
    return (
        <Layout>
            <h1>{user?.userName} - Писюн</h1>

        </Layout>
    );
}

export default Profile;
