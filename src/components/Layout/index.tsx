import { Box, Text, Flex, Spinner, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Footer } from '../Footer/Footer';
import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

interface LayoutProps {
  children: ReactNode;
  isLoading?: boolean;
  title?: string;
}

export const Layout = ({ children, isLoading = false, title = 'Pay Soon' }: LayoutProps) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Flex direction="column" height="calc(100vh - 71px)" overflowY="auto">
      <Box as="header" textAlign="center" color="white" py={4} px={8}>
        <Flex align="center" justify="center" position="relative">
          {/* <ArrowBackIcon
            position="absolute"
            left={0}
            boxSize={6}
            cursor="pointer"
            onClick={handleBack}
          /> */}
          <Text fontSize="lg" fontWeight="bold">
            {title}
          </Text>
        </Flex>
      </Box>

      <Box display="flex" flex="1" py={4} px={8}>
        {isLoading ? (
          <Box display="flex" flex="1" alignItems="center" justifyContent="center">
            <Spinner size="xl" color="teal" />
          </Box>
        ) : (
          <Box w="100%">
            {children}
          </Box>
        )}
      </Box>

      <Footer />
    </Flex>
  );
};
