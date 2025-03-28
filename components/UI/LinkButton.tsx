import React from "react";
import { Text, StyleSheet, ViewStyle, TextStyle, Pressable } from "react-native";

interface LinkButtonProps {
  text: string;
  onPress: () => void;
  style?: ViewStyle | TextStyle; 
}

const LinkButton: React.FC<LinkButtonProps> = ({ text, onPress, style }) => {
  return (
    <Pressable onPress={onPress} style={[styles.button, style]}>
      <Text style={[styles.text, style]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
  },
  text: {
    fontSize: 16,
    color: '#000000',
    fontWeight: 'bold'
  },
});

export default LinkButton;
