/* eslint-disable prettier/prettier */
import React, {memo} from 'react';
import Background from '../components/Background';

import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
// import {Navigation} from '../interfaces/types';
import {useDispatch} from 'react-redux';
import {logout} from '../redux/actions/auth';
type Props = {
  navigation: any;
};

const Dashboard = () => {
  const dispatch = useDispatch();
  return (
    <Background>
      <Header> Our Dashboard </Header>
      <Paragraph>our template for dash board you can now logout</Paragraph>

      <Button mode="outlined" onPress={() => dispatch(logout())}>
        Logout
      </Button>
    </Background>
  );
};

export default memo(Dashboard);
