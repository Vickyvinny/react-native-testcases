import {fireEvent, render} from '@testing-library/react-native';
import React from 'react';

import InputField from '../src/components/InputField';
jest.mock('react-native-vector-icons/Ionicons', () => 'Icon');
describe('InputField Component', () => {
  const mockOnChangeText = jest.fn();
  it('renders the eye-off icon when password is hidden', () => {
    const {getByTestId} = render(
      <InputField
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Password"
        text="Password"
        secureTextEntry={true}
        isHaveIcon={true}
      />,
    );
    const eyeOffIcon = getByTestId('eye-off-icon');
    expect(eyeOffIcon).toBeTruthy();
  });

  it('renders the eye icon when password is visible', () => {
    const {getByTestId} = render(
      <InputField
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Password"
        text="Password"
        secureTextEntry={false}
        isHaveIcon={true}
      />,
    );
    const eyeIcon = getByTestId('eye-icon');
    expect(eyeIcon).toBeTruthy();
  });

  it('toggles password visibility on icon press', () => {
    const {getByTestId, getByPlaceholderText} = render(
      <InputField
        value=""
        onChangeText={mockOnChangeText}
        placeholder="Password"
        text="Password"
        secureTextEntry={true}
        isHaveIcon={true}
      />,
    );
    const input = getByPlaceholderText('Password');
    expect(input.props.secureTextEntry).toBe(true);
    const eyeOffIcon = getByTestId('eye-off-icon');
    fireEvent.press(eyeOffIcon);
    expect(input.props.secureTextEntry).toBe(false);
    const eyeIcon = getByTestId('eye-icon');
    fireEvent.press(eyeIcon);
    expect(input.props.secureTextEntry).toBe(true);
  });
});
