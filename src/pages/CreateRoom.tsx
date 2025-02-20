import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Layout } from '../components';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  FormErrorMessage,
} from '@chakra-ui/react';
import { BACKEND_URL } from '../constants';
import { postAxios } from '../services/axios';

interface FormValues {
  photoUrl: string;
  title: string;
  description: string;
}

const CreateRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      photoUrl: '',
      title: '',
      description: '',
    }
  });

  const fileUploadRef = useRef<HTMLInputElement>(null);

  const uploadImageDisplay = () => {
    const uploadedFile = fileUploadRef.current?.files?.[0];
    if (!uploadedFile) return;
    
    const cachedURL = URL.createObjectURL(uploadedFile);
    setValue('photoUrl', cachedURL);
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await postAxios(BACKEND_URL.CreateRoom, data);
      // Handle successful room creation (e.g., redirect)
    } catch (e) {
      // Можно использовать setError из useForm для отображения ошибки
      console.error('Произошла ошибка при создании комнаты');
    }
  };

  return (
    <Layout>
      <Box flex="1">
        <Box position="relative" mb={10}>
          <Heading textAlign="center" size="lg">Создать комнату</Heading>
        </Box>

        <Flex
          as="form"
          onSubmit={handleSubmit(onSubmit)}
          direction="column"
          gap={6}
          // p={8}
          borderRadius="xl"
          boxShadow="lg"
        >
          <input
            type="file"
            accept="image/*"
            ref={fileUploadRef}
            onChange={uploadImageDisplay}
            hidden
          />

          <FormControl isInvalid={!!errors.title}>
            <FormLabel fontSize="lg">Название</FormLabel>
            <Input
              {...register('title', { 
                required: 'Пожалуйста, введите название комнаты' 
              })}
              placeholder="Введите название комнаты"
              size="lg"
              borderRadius="md"
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400"
              }}
            />
            <FormErrorMessage>
              {errors.title?.message}
            </FormErrorMessage>
          </FormControl>

          <FormControl>
            <FormLabel fontSize="lg">Описание</FormLabel>
            <Input
              {...register('description')}
              placeholder="Добавьте описание комнаты"
              size="lg"
              borderRadius="md"
              _focus={{
                borderColor: "blue.400",
                boxShadow: "0 0 0 1px blue.400"
              }}
            />
          </FormControl>

          <Button
            mt={6}
            type="submit"
            isLoading={isSubmitting}
            colorScheme="blue"
            size="lg"
            width="100%"
            borderRadius="md"
            _hover={{
              transform: "translateY(-2px)",
              boxShadow: "lg"
            }}
            transition="all 0.2s"
          >
            Создать комнату
          </Button>
        </Flex>
      </Box>
    </Layout>
  );
};

export default CreateRoom;
