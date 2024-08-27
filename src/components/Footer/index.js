import { IconButton, Button } from '@mui/material';
import { Person, Home, Add } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useTelegram } from '../../hooks';

import styles from './footer.module.scss';

export const Footer = () => {
    const { user } = useTelegram();

    return (
        <div className={styles.footer}>

            <Link to="/">
                <IconButton className={styles.footer_button}>
                    <Home />
                </IconButton>
            </Link>

            <Link to="/">
                <Button variant="contained" className={styles.footer_button_create}>
                    <Add />
                </Button>
            </Link>

            <Link to="/profile">
                {user?.photo_url ? (
                    <img
                        className={styles.footer_profile}
                        src={user?.photo_url}
                        loading="lazy"
                        alt="profile"
                    />
                ) : (
                    <IconButton className={styles.footer_button}>
                        <Person />
                    </IconButton>
                )}
            </Link>
        </div>
    );
}
