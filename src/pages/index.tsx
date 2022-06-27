import {
  Avatar,
  Box,
  Button,
  Divider,
  Heading,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { If } from '../components/If/If';

import useSession from '../hooks/useSession';
import { FormikValues, useFormik } from 'formik';
import { useEffect, useState } from 'react';

interface IInitialValues {
  email: string;
  password: string;
}

const initialValues: IInitialValues = {
  email: '',
  password: '',
};

const validationSingInAndRegister = (values: FormikValues) => {
  const errors: any = {};
  if (!values.email) {
    errors.email = 'Required';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = 'Invalid email address';
  }

  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters';
  }

  return errors;
};

const style = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  gap: 3,
};

const Index = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const {
    singInWithGoogle,
    logInWithEmailAndPassword,
    createUser,
    isLoading,
    isAuthenticated,
    error,
  } = useSession();

  const { handleChange, handleSubmit, values, errors, resetForm } = useFormik({
    initialValues: initialValues,
    validate: validationSingInAndRegister,
    onSubmit: ({ email, password }) => {
      if (isRegistering) {
        createUser(email, password);
      }

      if (!isRegistering) {
        logInWithEmailAndPassword(email, password);
      }
    },
  });

  useEffect(() => {
    return () => resetForm();
  }, [isAuthenticated]);

  return (
    <Box
    bg='gray.900'
    >
      <If isTrue={isAuthenticated === false}>
        <Box as='form' onSubmit={handleSubmit as any} sx={style}>
          <Stack width='72'>
            <Input
              placeholder='Email'
              type='email'
              name='email'
              id='email'
              onChange={handleChange}
              value={values.email}
              isInvalid={Boolean(errors.email)}
              errorBorderColor='red.300'
            />
            <Box>
              {errors.email && (
                <Text fontSize='xs' color='red.300'>
                  {errors.email}
                </Text>
              )}
            </Box>
            <Input
              placeholder='Password'
              type='password'
              name='password'
              onChange={handleChange}
              value={values.password}
              id='password'
              isInvalid={Boolean(errors.password)}
              errorBorderColor='red.300'
            />
            <Box>
              {errors.password && (
                <Text fontSize='xs' textAlign='left' color='red.300'>
                  {errors.password}
                </Text>
              )}

              {error && (
                <Text fontSize='xs' textAlign='left' color='red.300'>
                  {error}
                </Text>
              )}
            </Box>

            <Button type='submit' width='100%' isLoading={isLoading}>
              {isRegistering ? 'Sign up' : 'Log in'}
            </Button>
            <Divider />
            <Box>
              <Button
                onClick={() => singInWithGoogle()}
                width='100%'
                colorScheme='blue'>
                Log in with Google
              </Button>

              <Link onClick={() => setIsRegistering(!isRegistering)}>
                <Text fontSize='sm' my={2} textAlign='left'
                color='white'
                >
                  {isRegistering
                    ? 'Do you already have an account?'
                    : 'You do not have an account?'}
                </Text>
              </Link>
            </Box>
          </Stack>
        </Box>
      </If>
    </Box>
  );
};

export default Index;
