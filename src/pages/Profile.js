import { Layout } from '../components';
import { useTelegram } from '../hooks';

const Profile = () => {
    const { user } = useTelegram();
    return (
        <Layout>
            <h1>{user?.username} - Писюн</h1>
            <img src={user?.photo_url} alt="user photo" />
            {JSON.stringify(user)}

        </Layout>
    );
}

export default Profile;
