import AsyncStorage from '@react-native-async-storage/async-storage';
import {fireEvent, render, waitFor} from '@testing-library/react-native';
import React from 'react';
import RegisterScreen from '../src/screens/Register';
import {navigate} from '../src/utils/NavigationConfig';
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn().mockResolvedValue(
    JSON.stringify({
      username: 'test',
      email: 'test@example.com',
      mobile: '9876543210',
      password: 'Password123',
    }),
  ),
  setItem: jest.fn().mockResolvedValue(true),
}));
jest.mock('../src/utils/NavigationConfig', () => ({
  navigate: jest.fn(),
}));
describe('Register Screen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('should render register form', () => {
    const {getByPlaceholderText, getByText} = render(<RegisterScreen />);
    expect(getByPlaceholderText('Enter username')).toBeTruthy();
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
    expect(getByPlaceholderText('Enter mobile number')).toBeTruthy();
    expect(getByPlaceholderText('Enter password')).toBeTruthy();
    expect(getByText('Register')).toBeTruthy();
  });
  it('should handle input changes correctly ', async () => {
    const {getByPlaceholderText} = render(<RegisterScreen />);
    const usernameInput = getByPlaceholderText('Enter username');
    const emailInput = getByPlaceholderText('Enter email');
    const mobileInput = getByPlaceholderText('Enter mobile number');
    const passwordInput = getByPlaceholderText('Enter password');
    fireEvent.changeText(usernameInput, 'test');
    fireEvent.changeText(emailInput, 'test@example.com');
    fireEvent.changeText(mobileInput, '9876543210');
    fireEvent.changeText(passwordInput, 'Password123');
    expect(usernameInput.props.value).toBe('test');
    expect(emailInput.props.value).toBe('test@example.com');
    expect(mobileInput.props.value).toBe('9876543210');
    expect(passwordInput.props.value).toBe('Password123');
  });
  it('should validate inputs user name correctly', async () => {
    const {getByPlaceholderText, getByText} = render(<RegisterScreen />);
    const usernameInput = getByPlaceholderText('Enter username');
    const emailInput = getByPlaceholderText('Enter email');
    const mobileInput = getByPlaceholderText('Enter mobile number');
    const passwordInput = getByPlaceholderText('Enter password');
    const registerButton = getByText('Register');
    fireEvent.changeText(usernameInput, '');
    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent.changeText(mobileInput, '9876543210');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(registerButton);
    expect(getByText('Username is required')).toBeTruthy();
  });
  it('should validate inputs correctly', async () => {
    const {getByPlaceholderText, getByText} = render(<RegisterScreen />);
    const usernameInput = getByPlaceholderText('Enter username');
    const emailInput = getByPlaceholderText('Enter email');
    const mobileInput = getByPlaceholderText('Enter mobile number');
    const passwordInput = getByPlaceholderText('Enter password');
    const registerButton = getByText('Register');
    fireEvent.changeText(usernameInput, 'test');
    fireEvent.changeText(emailInput, 'testexample.com');
    fireEvent.changeText(mobileInput, '9876543210');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(registerButton);
    expect(getByText('Invalid email format')).toBeTruthy();
  });
  it('should validate inputs correctly', async () => {
    const {getByPlaceholderText, getByText} = render(<RegisterScreen />);
    const usernameInput = getByPlaceholderText('Enter username');
    const emailInput = getByPlaceholderText('Enter email');
    const mobileInput = getByPlaceholderText('Enter mobile number');
    const passwordInput = getByPlaceholderText('Enter password');
    const registerButton = getByText('Register');
    fireEvent.changeText(usernameInput, 'test');
    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent.changeText(mobileInput, '9876543');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(registerButton);
    expect(
      getByText('Invalid mobile number, it should be 10 digits'),
    ).toBeTruthy();
  });
  it('should validate inputs correctly', async () => {
    const {getByPlaceholderText, getByText} = render(<RegisterScreen />);
    const usernameInput = getByPlaceholderText('Enter username');
    const emailInput = getByPlaceholderText('Enter email');
    const mobileInput = getByPlaceholderText('Enter mobile number');
    const passwordInput = getByPlaceholderText('Enter password');
    const registerButton = getByText('Register');
    fireEvent.changeText(usernameInput, 'test');
    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent.changeText(mobileInput, '9876543210');
    fireEvent.changeText(passwordInput, 'Pass');
    fireEvent.press(registerButton);
    expect(
      getByText(
        'Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, and one number',
      ),
    ).toBeTruthy();
  });
  it('should navigate to the Login screen when the "Already have an account? Login" button is pressed', () => {
    const {getByText} = render(<RegisterScreen />);
    const registerButton = getByText('Already have an account? Login');
    fireEvent.press(registerButton);
    expect(navigate).toHaveBeenCalledWith('Login');
  });
  it('should handle registration correctly', async () => {
    const {getByText, getByPlaceholderText} = render(<RegisterScreen />);
    const usernameInput = getByPlaceholderText('Enter username');
    const emailInput = getByPlaceholderText('Enter email');
    const mobileInput = getByPlaceholderText('Enter mobile number');
    const passwordInput = getByPlaceholderText('Enter password');
    const registerButton = getByText('Register');
    fireEvent.changeText(usernameInput, 'test');
    fireEvent.changeText(emailInput, 'test@gmail.com');
    fireEvent.changeText(mobileInput, '9876543210');
    fireEvent.changeText(passwordInput, 'Password123');
    fireEvent.press(registerButton);
    await waitFor(() => {
      expect(getByText('Registration successful')).toBeTruthy();
    });
  });
  it('should display error message when AsyncStorage.setItem fails', async () => {
    AsyncStorage.setItem = jest
      .fn()
      .mockRejectedValueOnce(new Error('AsyncStorage error'));
    const {getByText, getByTestId, getByPlaceholderText} = render(
      <RegisterScreen />,
    );

    fireEvent.changeText(getByPlaceholderText('Enter username'), 'testuser');
    fireEvent.changeText(
      getByPlaceholderText('Enter email'),
      'test@example.com',
    );
    fireEvent.changeText(
      getByPlaceholderText('Enter mobile number'),
      '1234567890',
    );
    fireEvent.changeText(getByPlaceholderText('Enter password'), 'Test1234');

    fireEvent.press(getByText('Register'));

    await waitFor(() => {
      const commonErrorMessage = getByTestId('commonError');
      expect(commonErrorMessage.props.children).toContain(
        'Something went wrong during registration',
      );
    });

    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      'userData',
      JSON.stringify({
        username: 'testuser',
        email: 'test@example.com',
        mobile: '1234567890',
        password: 'Test1234',
      }),
    );
  });
});
