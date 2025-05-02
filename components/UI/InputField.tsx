import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardTypeOptions,
  ViewStyle,
  TextStyle
} from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Assuming you're using Expo

interface InputFieldProps {
  placeholder: string;
  value: string;
  icon_name: string;
  onChangeText: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  isPasswordField?: boolean;
  error?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
}

const InputField: React.FC<InputFieldProps> = ({
  placeholder,
  value,
  icon_name,
  onChangeText,
  keyboardType = 'default',
  isPasswordField = false,
  error,
  containerStyle,
  inputStyle
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState<boolean>(isPasswordField);

  const toggleSecureEntry = (): void => {
    if (isPasswordField) {
      setSecureTextEntry(prevState => !prevState);
    }
  };

  return (
    <View style={[
      styles.container, 
      containerStyle,
      error ? styles.errorContainer : null
    ]}>
      <Ionicons 
        name={icon_name} 
        size={22} 
        color="#757575" 
        style={styles.icon} 
      />
      
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={[styles.input, inputStyle]}
        placeholderTextColor="#9E9E9E"
        autoCapitalize="none"
      />
      
      {isPasswordField && (
        <TouchableOpacity onPress={toggleSecureEntry} style={styles.eyeIcon}>
          <Ionicons
            name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
            size={22}
            color="#757575"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F4F8',
    borderRadius: 25,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  errorContainer: {
    borderColor: '#D32F2F',
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  eyeIcon: {
    padding: 5,
  },
});

export default InputField;