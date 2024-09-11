import { useRef, useState } from 'react';
import { Layout } from '../components';
import {
  AbsoluteCenter,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Image,
} from '@chakra-ui/react';
import { BACKEND_URL } from '../constants';
import { axiosInstance } from '../services';
import { postAxios } from '../services/axios';

const CreateRoom = () => {
  const [formValues, setFormValues] = useState({
    photoUrl: '',
    title: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fileUploadRef: any = useRef();

  const uploadImageDisplay = () => {
    const uploadedFile = fileUploadRef.current.files[0];
    const cachedURL = URL.createObjectURL(uploadedFile);

    setFormValues({
      ...formValues,
      photoUrl: cachedURL,
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (formValues?.title?.length) {
      const room = await postAxios(BACKEND_URL.CreateRoom, formValues);
      console.log(room, 198189)
      // try {

      //   con
      //   const room = await axiosInstance.post(
      //     BACKEND_URL.CreateRoom,
      //     formValues
      //   );
      //   console.log(formValues, room, 19);
      // } catch (e) {
      //   setIsSubmitting(false);
      // }
    }
    setIsSubmitting(false);
  };

  const handleInputChange = (event: any) => {
    setFormValues({
      ...formValues,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <Layout>
      <Box position="relative" mb={10}>
        <Divider />
        <AbsoluteCenter px="2" bg="black">
          <Heading size="sm">Создать комнату</Heading>
        </AbsoluteCenter>
      </Box>

      <Flex flexDirection="column" gap={4} mb={4}>
        <Image
          width="75px"
          margin="0 auto"
          borderRadius="10"
          src="gibbresh.png"
          fallbackSrc={
            formValues.photoUrl?.length
              ? formValues?.photoUrl
              : 'https://via.placeholder.com/75'
          }
          cursor="pointer"
          onClick={() => fileUploadRef.current.click()}
        />
        <input
          type="file"
          id="file"
          onChange={uploadImageDisplay}
          ref={fileUploadRef}
          hidden
        />

        <FormControl isRequired isInvalid={!formValues.title?.length}>
          <FormLabel>Название</FormLabel>
          <Input
            name="title"
            placeholder="Название"
            value={formValues.title}
            onChange={handleInputChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel>Описание</FormLabel>
          <Input
            name="description"
            placeholder="Описание"
            value={formValues.description}
            onChange={handleInputChange}
          />
        </FormControl>

        <Button mt={4} onClick={handleSubmit} isLoading={isSubmitting}>
          Создать
        </Button>
      </Flex>
    </Layout>
  );
};

export default CreateRoom;
