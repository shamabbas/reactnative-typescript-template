import React from 'react';
import {useSelector} from 'react-redux';
import AppNav from '../navigations/AppNav';
import AuthNav from '../navigations/AuthNav';
import {RootState} from '../interfaces/redux/store';

function AppNavigator() {
  const authState = useSelector<RootState>(state => state?.auth?.isLoggedIn);

  return <>{authState ? <AppNav /> : <AuthNav />}</>;
}

export {AppNavigator};
