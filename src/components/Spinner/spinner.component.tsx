import { Box, Spinner } from '@chakra-ui/react';

const styleBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  width: '100vw',
};

const SpinnerPageComplete = () => {
  return (
    <Box sx={styleBox}>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Box>
  );
};

export default SpinnerPageComplete;
