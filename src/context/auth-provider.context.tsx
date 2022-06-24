import { createContext, useEffect, useState } from 'react';
import {
  onAuthStateChanged,
  User,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useNavigate } from 'react-router-dom';

interface IProps {
  children: React.ReactNode;
}

type AuthState = User | null;

interface IAuthContext {
  user: AuthState;
  singInWithGoogle: () => void;
  logInWithEmailAndPassword: (email: string, password: string) => void;
  createUser: (email: string, password: string) => void;
  logOut: () => Promise<void>;
  error: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<IAuthContext | null>(null);

const AuthProvider: React.FC<IProps> = ({ children }) => {
  const navigate = useNavigate();


  //* State to useState
  const [user, setUser] = useState<AuthState>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  function singInWithGoogle() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((user) => navigate('/app', { replace: true }))
      .catch((error) => setError(error.message));
  }

  function logInWithEmailAndPassword(email: string, password: string) {
    setIsLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate('/app', { replace: true }))
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            setError('User not found');
            break;
          case 'auth/wrong-password':
            setError('Wrong password');
            break;
          default:
            setError(error.message);
        }
      });
    setIsLoading(false);
  }

  function createUser(email: string, password: string) {
    setIsLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((user) => navigate('/app', { replace: true }))
      .catch((error) => {
        switch (error.code) {
          case 'auth/user-not-found':
            setError('User not found');
            break;
          case 'auth/wrong-password':
            setError('Wrong password');
            break;
          default:
            setError(error.message);
        }
      });
    setIsLoading(false);
  }

  async function logOut() {
    await signOut(auth);
  }

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setIsAuthenticated(!!user);
      setIsLoading(false);
      setError(null);
      
      if (user) {
        navigate('/app', { replace: true });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        error,
        singInWithGoogle,
        logInWithEmailAndPassword,
        createUser,
        logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
