import { Navigate, Route, Routes } from 'react-router-dom';
import { Demographics } from './components/demographics/Demographics';
import { Administration } from './components/Administration';
import { Billing } from './components/Billing';

import { AccountPage } from './pages/account';
import { Profile } from './pages/account/Profile';
import { HomePage } from './pages/HomePage';
import { SignOutPage } from './pages/SignOutPage';

export function Router(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="Demographics" element={<Demographics />} />
      <Route path="Administration" element={<Administration />} />
      <Route path="Billing" element={<Billing />} />
      <Route path="account/*" element={<AccountPage />}>
        <Route index element={<Navigate replace to="/account/profile" />} />
        <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="signout" element={<SignOutPage />} />
    </Routes>
  );
}
