import AsyncStorage from '@react-native-async-storage/async-storage';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import Login from '../src/screens/Login';
import {navigate} from '../src/utils/NavigationConfig';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest
    .fn()
    .mockResolvedValue(
      JSON.stringify({email: 'test@example.com', password: 'Password123'}),
    ),
  setItem: jest.fn().mockResolvedValue(true),
}));
jest.mock('../src/utils/NavigationConfig', () => ({
  navigate: jest.fn(),
}));
describe('Login Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render Login form', () => {
    const {getByPlaceholderText, getByText} = render(<Login />);
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
    expect(getByPlaceholderText('Enter password')).toBeTruthy();
    expect(getByText('Login')).toBeTruthy();
  });

  it('should handle input changes correctly ', async () => {
    const {getByPlaceholderText, getByText} = render(<Login />);
    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(loginButton);
    expect(emailInput.props.value).toBe('test@example.com');
    expect(passwordInput.props.value).toBe('Password123');
  });

  it('should validate inputs correctly', async () => {
    const {getByPlaceholderText, getByText} = render(<Login />);
    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');
    fireEvent.changeText(emailInput, '');
    fireEvent.changeText(passwordInput, '');
    fireEvent.press(loginButton);
    expect(getByText('Invalid email format')).toBeTruthy();
  });

  it('should validate email and password format correctly', async () => {
    const {getByPlaceholderText, getByText, getByTestId, queryByTestId} =
      render(<Login />);
    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Password123');
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({email: 'test@example.com', password: 'Password123'}),
    );
    fireEvent.press(loginButton);
    await waitFor(() => {
      expect(queryByTestId('errorEmail')).toBeNull();
      expect(queryByTestId('errorPassword')).toBeNull();
    });
  });

  it('should log in successfully with valid email and password', async () => {
    const {getByPlaceholderText, getByText, queryByTestId} = render(<Login />);

    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');

    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(passwordInput, 'Password123');
    await AsyncStorage.setItem(
      'userData',
      JSON.stringify({email: 'test@example.com', password: 'Password123'}),
    );
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(navigate).toHaveBeenCalledWith('Home');
    });

    expect(queryByTestId('errorEmail')).toBeNull();
    expect(queryByTestId('errorPassword')).toBeNull();
  });

  it('should navigate to the resister screen when the "Register" button is pressed', () => {
    const {getByText} = render(<Login />);
    const registerButton = getByText("Don't have an account? Register");
    fireEvent.press(registerButton);
    expect(navigate).toHaveBeenCalledWith('Register');
  });

  it('should show error for invalid email format', async () => {
    const {getByPlaceholderText, getByText, getByTestId, queryByTestId} =
      render(<Login />);

    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');
    fireEvent.changeText(emailInput, 'invalidemail.com');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(loginButton);
    await waitFor(() => {
      expect(getByTestId('errorEmail')).toBeTruthy();
    });
    expect(queryByTestId('errorPassword')).toBeNull();
  });

  it('should show error for invalid password format', async () => {
    const {getByPlaceholderText, getByText, getByTestId, queryByTestId} =
      render(<Login />);

    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');
    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent.changeText(passwordInput, 'Pas');

    fireEvent.press(loginButton);
    await waitFor(() => {
      expect(getByTestId('errorPassword')).toBeTruthy();
    });

    expect(queryByTestId('errorEmail ')).toBeNull();
  });

  it('should show error for invalid credentials if email and password wrong', async () => {
    const {getByPlaceholderText, getByText, getByTestId} = render(<Login />);
    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');
    fireEvent.changeText(emailInput, 'user@example.com');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(loginButton);

    await waitFor(() => {
      expect(getByTestId('commonError')).toBeTruthy();
    });
  });

  it('should show error if user not registered', async () => {
    AsyncStorage.getItem = jest.fn().mockResolvedValue(null);
    const {getByPlaceholderText, getByText, getByTestId} = render(<Login />);
    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');
    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(loginButton);
    await waitFor(() => {
      expect(getByText('No registered user found')).toBeTruthy();
    });
  });

  it('should handle AsyncStorage error gracefully', async () => {
    AsyncStorage.getItem = jest
      .fn()
      .mockRejectedValue(new Error('AsyncStorage error'));
    const {getByPlaceholderText, getByText} = render(<Login />);
    const emailInput = getByPlaceholderText('Enter email');
    const passwordInput = getByPlaceholderText('Enter password');
    const loginButton = getByText('Login');
    fireEvent.changeText(emailInput, 'user@example.com');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(loginButton);
    await waitFor(() => {
      expect(getByText('Error: Something went wrong')).toBeTruthy();
    });
  });
});
