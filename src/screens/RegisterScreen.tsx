import React, {memo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';

import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../constants/theme';
import {Navigation} from '../interfaces/types';
import {API} from '../constants';
import axios from 'axios';
import {
  emailValidator,
  passwordValidator,
  nameValidator,
} from '../constants/utils';

type Props = {
  navigation: Navigation;
};

const RegisterScreen = ({navigation}: Props) => {
  const [name, setName] = useState({value: '', error: ''});
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const _onSignUpPressed = async () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError || nameError) {
      setName({...name, error: nameError});
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    } else {
      setIsLoading(true);
      try {
        await axios.post(
          `${API}register`,
          {name: name.value, email: email.value, password: password.value},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        // console.log(data);
        navigation.navigate('LoginScreen');
      } catch (error) {
        Alert.alert(error?.response?.data);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />
      <ScrollView>
        <Header>Register Account </Header>
        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={text => setName({value: text, error: ''})}
          error={!!name.error}
          errorText={name.error}
        />
        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({value: text, error: ''})}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />
        <TextInput
          label="Password"
          returnKeyType="done"
          value={password.value}
          onChangeText={text => setPassword({value: text, error: ''})}
          error={!!password.error}
          errorText={password.error}
          secureTextEntry
        />
      </ScrollView>
      <Button mode="contained" onPress={_onSignUpPressed} style={styles.button}>
        {isLoading ? 'Loading...' : 'Sign Up'}
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
          <Text style={styles.link}>Login </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    color: theme.colors.secondary,
  },
  button: {
    marginTop: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(RegisterScreen);
