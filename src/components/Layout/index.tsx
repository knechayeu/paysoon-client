import { Box, Container, Spinner } from '@chakra-ui/react';
import { Footer } from '../Footer/Footer';

export const Layout = ({ children, isLoading = false }: any) => {
  return (
    <>
      <Container
        position="relative"
        height="calc(100vh - 90px)"
        overflowY="scroll"
        boxSizing="border-box"
        boxShadow="0 -10px 40px -5px teal"
        className="layout"
        borderTop="2px solid teal"
        p="36px 20px"
        mt={10}
        borderTopLeftRadius={35}
        borderTopRightRadius={35}
      >
        {isLoading ? (
          <Box
            height="100%"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Spinner size="xl" color="teal" />
          </Box>
        ) : (
          children
        )}
      </Container>

      <Footer />
    </>
  );
};
