import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CommonButton from '../components/CommonButton';
import CommonText from '../components/CommonText';
import InputField from '../components/InputField';
import {navigate} from '../utils/NavigationConfig';

const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [commonError, setCommonError] = useState<string | null>(null);
  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError('Invalid password');
      return;
    }

    try {
      const storedData = await AsyncStorage.getItem('userData');
      if (storedData) {
        const user = JSON.parse(storedData);
        if (user.email === email && user.password === password) {
          navigate('Home');
        } else {
          setCommonError('Invalid credentials');
        }
      } else {
        setCommonError('No registered user found');
      }
    } catch (error) {
      setCommonError('Error: Something went wrong');
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor={'rgba(0,0,0,0)'}
        barStyle="dark-content"
      />
      <View style={styles.inputMainContainer}>
        <InputField
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          text="Email"
        />

        {emailError && (
          <Text style={styles.errorText} testID="errorEmail">
            {emailError}
          </Text>
        )}
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
          text="Password"
        />
        {passwordError && (
          <Text style={styles.errorText} testID="errorPassword">
            {passwordError}
          </Text>
        )}

        <Text testID="commonError">{commonError}</Text>
      </View>
      <View>
        <CommonButton
          text="Login"
          handleLogin={handleLogin}
          color={'#fff'}
          bgColor={'orange'}
        />

        <TouchableOpacity
          onPress={() => navigate('Register')}
          style={styles.linkText}>
          <CommonText
            text="Don't have an account? Register"
            color="orange"
            fontSize={18}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'space-between',
    borderWidth: 6,
    borderColor: 'orange',
    borderRadius: 10,
  },

  linkText: {
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  inputMainContainer: {justifyContent: 'center', flex: 1},
});

export default LoginScreen;
