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
    <Box px={3}>
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
            {message?.photoURL && (
              <img
                width='40px'
                height='40px'
                style={{
                  borderRadius: '50%',
                }}
                src={`${message?.photoURL}`}
              />
            )}
            {!message?.photoURL && (
              <Avatar
                width='40px'
                height='40px'
                name={message?.displayName ? message?.displayName : undefined}
              />
            )}

            <Box
              fontWeight='bold'
              padding='7px'
              borderRadius='8px'
              bg='gray.800'>
              <Text fontSize='xs'>
                {message.userId === user?.uid ? 'Tú' : message.displayName}
              </Text>
              {message.text}
              <Text fontSize='xs'>{formatTimeMessage(message.createdAt)}</Text>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default ChatMessages;
