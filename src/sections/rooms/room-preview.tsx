import React from 'react';
import { Box, Heading, Text, Button, VStack, useColorModeValue } from '@chakra-ui/react';

interface RoomPreviewProps {
  title: string;
  description: string;
  onViewDetails: () => void;
  isLoading?: boolean;
}

const styles = {
  container: {
    borderWidth: "1px",
    borderRadius: "xl",
    overflow: "hidden",
    boxShadow: "xl",
    transition: "transform 0.3s, box-shadow 0.3s",
    maxW: "xs",
    // mx: "auto",
  },
  containerHover: {
    transform: 'scale(1.05)',
    boxShadow: '2xl',
  },
  image: {
    height: "150px",
    objectFit: "cover",
    borderTopRadius: "xl",
  },
  content: {
    p: 4,
    align: "start",
    spacing: 3,
  },
  button: {
    size: "sm",
    w: "full",
    _focus: { boxShadow: 'outline' },
  },
} as const;

const RoomPreview: React.FC<RoomPreviewProps> = ({
  title,
  description,
  onViewDetails,
  isLoading = false,
}) => {
  const headingColor = useColorModeValue('teal.800', 'teal.200');
  const descriptionColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box
      {...styles.container}
      role="article"
      aria-label={`Room preview for ${title}`}
    >
      <VStack {...styles.content}>
        <Heading size="md" color={headingColor}>
          {title}
        </Heading>
        <Text fontSize="sm" noOfLines={1} color={descriptionColor}>
          {description}
        </Text>
        <Button
          {...styles.button}
          colorScheme="teal"
          onClick={onViewDetails}
          isLoading={isLoading}
          _hover={{ bg: 'teal.600' }}
          aria-label={`View details for ${title}`}
        >
          View Details
        </Button>
      </VStack>
    </Box>
  );
};

export default RoomPreview;
