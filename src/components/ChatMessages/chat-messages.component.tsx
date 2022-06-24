import { Avatar, Box, Text } from '@chakra-ui/react';
import useSession from '../../hooks/useSession';

const ChatMessages = ({ messages }: any) => {
  const { user } = useSession();

  function formatTimeMessage(date: any) {
    const dateFormatted = new Date(date.seconds * 1000);

    return new Intl.DateTimeFormat('es-VE', {
      hour: 'numeric',
      minute: 'numeric',
    })
      .format(dateFormatted)
      .toString();
  }

  return (
    <Box
      display='flex'
      flexDirection='column'
      flex='1'
      px={4}
      bg='gray.900'
      marginTop='3rem'
      height='100%'>
      {messages?.map((message: any, index: number) => (
        <Box
          key={index}
          display='flex'
          my={4}
          justifyContent={
            message.userId === user?.uid ? 'flex-end' : 'flex-start'
          }
          width='full'>
          <Box display='flex' alignItems='center' gap={2}>
            <Avatar width='35px' height='35px' src={message?.photoURL} />
            <Text
              fontWeight='bold'
              padding='7px'
              borderRadius='8px'
              bg='#0b141a'>
                <Text fontSize='xs' color='gray.500'>
                 {message.userId === user?.uid && 'Tú'}
                </Text>
              {message.text}
              <Text fontSize='xs' color='gray.500'>
                {formatTimeMessage(message.createdAt)}
              </Text>
            </Text>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ChatMessages;
