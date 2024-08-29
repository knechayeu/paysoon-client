import { Container } from '@chakra-ui/react';
import { Footer } from '../Footer/Footer';

import styles from './layout.module.scss';

export const Layout = ({ children }: any) => {
  return (
    <div className={styles.layout}>
      <Container className={styles.layout_container} maxW="lg" p={2}>
        {children}
      </Container>
      <Footer />
    </div>
  );
};
