import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import CommonText from './CommonText';

interface IProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  text: string;
  isKeyboardTypeActive?: boolean;
}
const InputField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  text,
  isKeyboardTypeActive,
}: IProps) => {
  return (
    <View>
      <CommonText text={text} isMarginAvailable />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        keyboardType={isKeyboardTypeActive ? 'numeric' : 'default'}
      />
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
  },
});
