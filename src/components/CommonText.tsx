import React from 'react';
import {StyleSheet, Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
interface IProps {
  text: string;
  fontSize?: number;
  color?: string;
  isMarginAvailable?: boolean;
}
const CommonText = ({text, color, fontSize, isMarginAvailable}: IProps) => {
  return (
    <Text
      style={[
        styles.textStyles,
        {color: color, fontSize: fontSize},
        isMarginAvailable && {marginBottom: 10},
      ]}>
      {text}
    </Text>
  );
};

export default CommonText;

const styles = StyleSheet.create({
  textStyles: {fontSize: 18, fontWeight: 'bold'},
});
