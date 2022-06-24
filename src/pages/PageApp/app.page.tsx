import {
  Avatar,
  Box,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';

import useSession from '../../hooks/useSession';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import {
  collection,
  orderBy,
  query,
  limit,
  addDoc,
  Timestamp,
  getDocs,
  doc,
  deleteDoc,
} from 'firebase/firestore';
import { db_f } from '../../lib/firebase';

import { useFormik } from 'formik';
import ChatMessages from '../../components/ChatMessages/chat-messages.component';

const styles = {
  container: {
    bg: '#0b141a',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
};

const AppPage = () => {
  const { user, logOut } = useSession();
  const messageRef = collection(db_f, 'messages');
  const q = query(messageRef, orderBy('createdAt', 'asc'), limit(25));

  const [messages] = useCollectionData(q, {
    snapshotListenOptions: {
      includeMetadataChanges: true,
    },
  });

  const { handleChange, values, handleSubmit, resetForm } = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: ({ message }) => {
      handleSendMessage(message);
      resetForm();
    },
  });

  async function handleSendMessage(message: string) {
    if (message.length > 0) {
      return await addDoc(messageRef, {
        text: message,
        userId: user?.uid,
        displayName: user?.displayName,
        photoURL: user?.photoURL,
        createdAt: Timestamp.fromDate(new Date()),
      });
    }
  }

  async function clearChatMessage() {
    const getDocsRef = await getDocs(messageRef);

    getDocsRef.forEach((data: any) => {
      const newDoc = doc(db_f, 'messages',data.id);

      deleteDoc(newDoc);
     
    });
  }

  return (
    <Box sx={styles.container}>
      <Box
        width={500}
        margin='0 auto'
        bg='gray.700'
        flex={1}
        overflow='auto'
        position='relative'>
        <Stack
          justifyContent='space-between'
          alignItems='center'
          direction='row'
          p={2}
          px={4}
          flex={1}
          bg='gray.800'
          zIndex='100'
          top={0}
          width={500}
          position='fixed'>
          <Box display='flex' gap={3} alignItems='center'>
            <Avatar
              src={user?.photoURL || undefined}
              name={user?.displayName ? user?.displayName : undefined}
              width='40px'
              height='40px'
            />
            <Text fontSize='md' color='white'>
              {user?.displayName ? user?.displayName : undefined}
            </Text>
          </Box>
          <Box>
            <Menu>
              <MenuButton
                as={IconButton}
                icon={<MoreVertIcon />}
                aria-label='more options'
                variant='ghost'
                color='white'
                size='sm'
                aria-haspopup='true'
                aria-expanded='false'
              />
              <MenuList>
                <MenuItem onClick={clearChatMessage}>Clear Chat</MenuItem>
                <MenuItem onClick={logOut}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Box>
        </Stack>

        {messages && <ChatMessages messages={messages} />}

        <form onSubmit={handleSubmit}>
          <Stack
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            direction='row'
            p={2}
            px={4}
            flex={1}
            bottom={0}
            bg='gray.800'
            zIndex='100'
            width={500}
            position='fixed'>
            <Input
              name='message'
              autoComplete='off'
              placeholder='Type a message...'
              value={values.message}
              onChange={handleChange}
              variant='ghost'
              bg={'gray.700'}
            />
            <IconButton
              type='submit'
              icon={<SendIcon fontSize='small' />}
              aria-label='send message'
              variant='ghost'
              color='white'
              size='sm'
            />
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default AppPage;
