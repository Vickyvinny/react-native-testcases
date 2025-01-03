import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonText from './CommonText';

interface IProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  text: string;
  isKeyboardTypeActive?: boolean;
  isHaveIcon?: boolean;
}
const InputField = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  text,
  isKeyboardTypeActive,
  isHaveIcon,
}: IProps) => {
  const [isActive, setIsActive] = React.useState(secureTextEntry);
  return (
    <View>
      <CommonText text={text} isMarginAvailable />
      <View style={styles.inputContainer}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={isActive}
          style={styles.input}
          keyboardType={isKeyboardTypeActive ? 'numeric' : 'default'}
        />
        <View style={styles.iconContainer}>
          {isHaveIcon &&
            (isActive ? (
              <Ionicons
                name="eye-off"
                onPress={() => setIsActive(false)}
                size={20}
                testID="eye-off-icon"
              />
            ) : (
              <Ionicons
                name="eye"
                onPress={() => setIsActive(true)}
                size={20}
                testID="eye-icon"
              />
            ))}
        </View>
      </View>
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  inputContainer: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    alignContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 14,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});
