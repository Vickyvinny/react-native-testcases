import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, ParamListBase} from '@react-navigation/native';
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
const mobileRegex = /^[0-9]{10}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;

interface IProps {
  navigation: NavigationProp<ParamListBase>;
}

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [commonError, setCommonError] = useState<string | null>(null);
  const handleRegister = async () => {
    setUsernameError('');
    setEmailError('');
    setMobileError('');
    setPasswordError('');

    if (!username) {
      setUsernameError('Username is required');
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return;
    }

    if (!mobileRegex.test(mobile)) {
      setMobileError('Invalid mobile number, it should be 10 digits');
      return;
    }

    if (!passwordRegex.test(password)) {
      setPasswordError(
        'Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, and one number',
      );
      return;
    }

    try {
      const userData = {
        username,
        email,
        mobile,
        password,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setCommonError('Registration successful');
      navigate('Login');
      setUsername('');
      setEmail('');
      setMobile('');
      setPassword('');
    } catch (error) {
      setCommonError('Something went wrong during registration');
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
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
          secureTextEntry
          text="Username"
        />
        {usernameError ? (
          <Text style={styles.errorText}>{usernameError}</Text>
        ) : null}

        <InputField
          value={email}
          onChangeText={setEmail}
          placeholder="Enter email"
          text="Email"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <InputField
          value={mobile}
          onChangeText={setMobile}
          placeholder="Enter mobile number"
          text="Mobile"
          isKeyboardTypeActive
        />

        {mobileError ? (
          <Text style={styles.errorText}>{mobileError}</Text>
        ) : null}
        <InputField
          value={password}
          onChangeText={setPassword}
          placeholder="Enter password"
          secureTextEntry
          text="Password"
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}
        <Text testID="commonError">{commonError}</Text>
      </View>
      <View>
        <CommonButton
          text="Register"
          handleLogin={handleRegister}
          color={'#fff'}
          bgColor={'teal'}
        />

        <TouchableOpacity
          onPress={() => navigate('Login')}
          style={styles.linkText}>
          <CommonText
            text="Already have an account? Login"
            color="teal"
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
    padding: 20,
    backgroundColor: '#fff',
    borderWidth: 6,
    borderColor: 'teal',
    borderRadius: 10,
  },

  buttonSecondary: {
    backgroundColor: 'green',
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  inputMainContainer: {justifyContent: 'center', flex: 1},
  linkText: {
    marginVertical: 20,

    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RegisterScreen;
