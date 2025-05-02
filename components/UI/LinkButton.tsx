import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, GestureResponderEvent } from 'react-native';
import { View } from 'react-native';
import { GlobalColors } from '../../constants/GlobalColors';

interface LinkButtonProps {
  preText?: string;
  linkText: string;
  onPress: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
  preTextStyle?: TextStyle;
  linkTextStyle?: TextStyle;
}
const LinkButton: React.FC<LinkButtonProps> = ({ 
  preText, 
  linkText, 
  onPress, 
  containerStyle, 
  preTextStyle, 
  linkTextStyle 
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      {preText && (
        <Text style={[styles.preText, preTextStyle]}>
          {preText}
        </Text>
      )}
      <TouchableOpacity onPress={onPress} activeOpacity={0.7}>
        <Text style={[styles.linkText, linkTextStyle]}>
          {linkText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  preText: {
    color: '#757575',
    fontSize: 16,
  },
  linkText: {
    color: GlobalColors.softGreen,
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default LinkButton;