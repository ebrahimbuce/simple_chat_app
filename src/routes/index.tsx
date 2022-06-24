import { Route, Routes } from 'react-router-dom';
import SpinnerPageComplete from '../components/Spinner/spinner.component';
import useSession from '../hooks/useSession';
import Index from '../pages';
import AppPage from '../pages/PageApp/app.page';

//* Pages

import PrivateRoute from './private-route.route';

export default function Router() {
  const { isLoading } = useSession();

  if (isLoading) {
    return <SpinnerPageComplete />;
  }

  return (
    <Routes>
      <Route path='/' element={<Index />} />
      <Route element={<PrivateRoute />}>
        <Route path='/app' element={<AppPage />} />
      </Route>
    </Routes>
  );
}
