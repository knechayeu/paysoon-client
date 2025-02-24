import {
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Button,
  useDisclosure,
  Box,
  IconButton,
  Slide,
  ListItem,
  List,
  Heading,
  Text,
  Flex,
  Avatar,
  AvatarBadge,
  Select,
  Image,
} from '@chakra-ui/react';
import { Layout } from '../components';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import { useTelegram } from '../hooks/useTelegram';
import axios from 'axios';
import { BACKEND_URL } from '../constants';

const CreateTransaction = () => {
  const { tg } = useTelegram();
  const [selectedRoom, setSelectedRoom] = useState<any>(null);
  const [selectedUsers, setSelectedUsers] = useState<any>([]);
  const [transactionType, setTransactionType] = useState('equal');
  const { isOpen, onToggle } = useDisclosure();
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageResponse, setImageResponse] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectRoom = (roomId: number) => {
    setSelectedRoom({
      [roomId]: !selectedRoom?.[roomId],
    });
  };

  const handleSelectUser = (i: number) => {
    const hasUser = selectedUsers?.find((user: any) => user.id === i);

    if (hasUser) {
      const filterUser = selectedUsers?.filter((user: any) => user.id !== i);

      setSelectedUsers(filterUser);
      return;
    }
    const user = selectedUsers.concat({ id: i });

    setSelectedUsers(user);
  };

  const handleSelectType = (e: any) => {
    setTransactionType(e.target.value);
  };

  const handleImageUpload = () => {
    tg.MainButton.text = "Выбрать фото";
    tg.MainButton.show();
    tg.MainButton.onClick(() => {
      tg.showPopup({
        title: 'Загрузка фото',
        message: 'Выберите фото из галереи',
        buttons: [{
          type: 'default',
          text: 'Выбрать'
        }]
      }, () => {
        // Используем нативный метод для выбора файла
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e: any) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
              setUploadedImage(e.target?.result as string);

              console.log(e.target?.result)
            };
            reader.readAsDataURL(file);
          }
        };
        input.click();
        tg.MainButton.hide();
      });
    });
  };

  const handleSendImage = async () => {
    if (uploadedImage) {
      setIsLoading(true);
      try {
        const response = await axios.post(BACKEND_URL.UploadImage, {
          base64Image: uploadedImage
        });
        
        setImageResponse(response.data);
        tg.sendData(JSON.stringify(response.data));
      } catch (error) {
        console.error('Ошибка при загрузке изображения:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Layout isLoading={isLoading} title="Внести оплату">
      <Stack spacing={4} w="100%">
        <InputGroup>
          <InputLeftAddon onClick={onToggle}>BYN</InputLeftAddon>
          <Input type="number" placeholder="Введите сумму" />
        </InputGroup>

        <Select onChange={handleSelectType}>
          <option value="equal">Поровну</option>
          <option value="shuffle">Выборочно</option>
        </Select>

        <Button 
          onClick={handleSendImage} 
          isLoading={isLoading}
          loadingText="Загрузка..."
        >
          Отправить фото
        </Button>

        {uploadedImage && <Image src={uploadedImage} w="100%" h="250px" />}

        {imageResponse?.length && imageResponse.map((item: any) => (
          <Flex key={item.name} justify="space-between">
            <Text fontSize="sm" color="gray.500">
              {item.name}
            </Text>
            <Text fontSize="sm" color="gray.500">
              {item.price} BYN
            </Text>
          </Flex>
        ))}

        <Stack direction="row" spacing={4} justify="center">
          <Button
            leftIcon={<i className="fas fa-camera" />}
            onClick={() => window.Telegram.WebApp.showScanQrPopup({
              text: "Отсканируйте QR-код чека"
            })}
          >
            Сканировать QR
          </Button>
          <Button
            leftIcon={<i className="fas fa-image" />}
            onClick={handleImageUpload}
          >
            Загрузить фото
          </Button>
        </Stack>

        {transactionType === 'shuffle' && (
          <Stack spacing={4} flexDirection="row" overflowY="auto">
            {Array.from({ length: 10 }, (_, i) => (
              <Flex
                key={i}
                flexDirection="column"
                alignItems="center"
                gap={2}
                onClick={() => handleSelectUser(i)}
              >
                <Avatar size="lg" name="Писюн юзер" variant="outline">
                  {!!selectedUsers?.find((user: any) => user.id === i) && (
                    <AvatarBadge
                      as={CheckIcon}
                      color="white"
                      borderColor="transparent"
                      bg="black"
                    />
                  )}
                </Avatar>

                <Text align="center" color="gray.500" fontSize="xs">
                  Писюн юзер {i}
                </Text>
              </Flex>
            ))}
          </Stack>
        )}

        {transactionType === 'shuffle' &&
          selectedUsers?.length &&
          selectedUsers.map((user: any, index: number) => (
            <Flex key={index} flexDirection="column" gap={2}>
              <Heading size="sm">Писюн юзер {user.id}</Heading>
              <Input type="number" placeholder="Введите сумму" />
            </Flex>
          ))}
      </Stack>

      {/* <Flex
        padding="20px"
        position="fixed"
        bottom="70px"
        gap={2}
        right="0px"
        bg="black"
        left="0px"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xs">
          Сумма будет распределена
          {transactionType === 'equal' && ' поровну со всеми'}
          {transactionType === 'shuffle' && ` c ${selectedUsers?.length} участником(ами)`}
        </Text>

        <Button colorScheme="teal">Добавить</Button>
      </Flex> */}

      <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
        <Box p="20px" mt="4" bg="black" height="calc(100vh - 70px)">
          <IconButton
            position="absolute"
            right="10px"
            top="0"
            aria-label="Close"
            variant="none"
            onClick={onToggle}
            icon={<CloseIcon />}
          />
          <List spacing={4} overflowY="auto" height="100%">
            {Array.from({ length: 100 }, (_, i) => (
              <ListItem key={i} onClick={onToggle}>
                <Heading size="sm">белорусский рубль (BYN)</Heading>
                <Text color="gray.500" fontSize="xs">
                  BYN
                </Text>
              </ListItem>
            ))}
          </List>
        </Box>
      </Slide>
    </Layout>
  );
};

export default CreateTransaction;
