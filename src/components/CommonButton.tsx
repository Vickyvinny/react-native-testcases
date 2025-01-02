import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CommonText from './CommonText';
interface IProps {
  text: string;
  color?: string;
  bgColor?: string;
  handleLogin?: () => void;
}
const CommonButton = ({text, color, bgColor, handleLogin}: IProps) => {
  return (
    <TouchableOpacity
      onPress={handleLogin}
      style={[styles.buttonPrimary, {backgroundColor: bgColor}]}>
      <CommonText text={text} color={color} fontSize={16} />
    </TouchableOpacity>
  );
};

export default CommonButton;

const styles = StyleSheet.create({
  buttonPrimary: {
    padding: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'orange',
    elevation: 10,
    backgroundColor: 'orange',
  },
});
