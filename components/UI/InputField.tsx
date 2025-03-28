import React, { useState } from "react";
import { StyleSheet, View, TextInput, KeyboardTypeOptions, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalColors } from "../../constants/GlobalColors";

// Interface for the props that will be passed to the Custom Input Field Component
interface CustomInputProps {
  placeholder?: string;
  value: string;
  icon_name: keyof typeof Ionicons.glyphMap;
  keyboardType?: KeyboardTypeOptions;
  isPasswordField?: boolean;
  onChangeText: (text: string) => void;
}

const InputField: React.FC<CustomInputProps> = ({
  placeholder,
  value,
  icon_name,
  keyboardType = "default",
  isPasswordField = false,
  onChangeText,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Left Icon */}
      <Ionicons name={icon_name} size={25} color={GlobalColors.Deep_Blue} style={styles.icon} />

      {/* Text Input */}
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        value={value}
        secureTextEntry={isPasswordField && !isPasswordVisible} // Hide text if it's a password field
      />

      {/* Toggle Password Visibility Button */}
      {isPasswordField && (
        <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)} style={styles.eyeButton}>
          <Ionicons name={isPasswordVisible ? "eye" : "eye-off"} size={25} color={GlobalColors.Deep_Blue} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E3EDF7",
    borderRadius: 30,
    paddingHorizontal: 20,
    height: 65,
    borderWidth: 1.5,
    borderColor: GlobalColors.Soft_Purple,
    width: "100%",
    marginBottom: 20
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: GlobalColors.Royal_Blue,
  },
  eyeButton: {
    marginLeft: 10,
  },
});

export default InputField;
