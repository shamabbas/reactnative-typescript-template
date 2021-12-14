import React, {useState} from 'react';
import {TouchableOpacity, StyleSheet, Text, View, Alert} from 'react-native';
import Background from '../components/Background';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import {theme} from '../constants/theme';
import {emailValidator, passwordValidator} from '../constants/utils';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {login} from '../redux/actions/auth';
import {API} from '../constants';
type Props = {
  navigation: any;
};

const LoginScreen = ({navigation}: Props) => {
  const [email, setEmail] = useState({value: '', error: ''});
  const [password, setPassword] = useState({value: '', error: ''});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const _onLoginPressed = async () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({...email, error: emailError});
      setPassword({...password, error: passwordError});
      return;
    } else {
      setIsLoading(true);
      try {
        const {data} = await axios.post(
          `${API}login`,
          {email: email.value, password: password.value},
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        dispatch(login(data?.token, data?.userId));

        // navigation.navigate('Dashboard');
      } catch (error) {
        Alert.alert(error?.response?.data);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <Background>
      <BackButton goBack={() => navigation.navigate('HomeScreen')} />

      <Header>Welcome back</Header>

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

      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View> */}

      <Button mode="contained" onPress={_onLoginPressed}>
        {isLoading ? 'Loding...' : 'Login'}
      </Button>

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default LoginScreen;
