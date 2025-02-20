import { Box, ChakraProvider, Flex, Spinner } from '@chakra-ui/react';
import { Footer } from '../Footer/Footer';
import { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  isLoading?: boolean;
}

export const Layout = ({ children, isLoading = false }: LayoutProps) => {
  return (
    <ChakraProvider>
      <Flex direction="column" height="calc(100vh - 71px)">
        <Box as="header" color="white" py={4} px={8}>
          Header
        </Box>

        <Box display="flex" flex="1" py={4} px={8}>
          {isLoading ? (
            <Box
              display="flex"
              flex="1"
              alignItems="center"
              justifyContent="center"
            >
              <Spinner size="xl" color="teal" />
            </Box>
          ) : (
            children
          )}
        </Box>

        <Footer />
      </Flex>
    </ChakraProvider>
  );
};
