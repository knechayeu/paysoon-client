import { Container } from '@chakra-ui/react';
import { Footer } from '../Footer/Footer';

export const Layout = ({ children }: any) => {
  return (
    <>
      <Container
        height="calc(100vh - 90px)"
        overflowY="scroll"
        boxSizing='border-box'
        boxShadow="0 -10px 40px -5px teal"
        className="layout"
        borderTop="2px solid teal"
        // maxW="lg"
        p="36px 20px"
        mt={10}
        borderTopLeftRadius={35}
        borderTopRightRadius={35}
      >
        {children}
      </Container>
      <Footer />
    </>
  );
};
