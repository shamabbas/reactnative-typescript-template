import React, {memo} from 'react';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
// import {Navigation} from '../interfaces/types';

type Props = {
  navigation: any;
};

const HomeScreen = ({navigation}: Props) => (
  <Background>
    <Header>Template </Header>

    <Paragraph>navigate to login register screen</Paragraph>
    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
      Login
    </Button>
    <Button
      mode="outlined"
      onPress={() => navigation.navigate('RegisterScreen')}>
      Sign Up
    </Button>
  </Background>
);

export default memo(HomeScreen);
