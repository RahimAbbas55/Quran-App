import { GestureResponderEvent, KeyboardTypeOptions, TextStyle, ViewStyle } from "react-native";

// Custom IconType
export type IconType = 'quran' | 'memorization' | 'tafsir' | 'questions' | 'path' | 'settings';

// Custom Button Prop Types
export interface CustomButtonProps {
  onPress: () => void;
  style?: ViewStyle | TextStyle;
  isLoading: boolean;
  buttonText?: string;
}

// Custom Input Field Prop Types
export interface InputFieldProps {
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

// Link Button Prop Types
export interface LinkButtonProps {
  preText?: string;
  linkText: string;
  onPress: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
  preTextStyle?: TextStyle;
  linkTextStyle?: TextStyle;
}

// Custom Loader Prop Types
export type LoaderProps = {
  size?: number;
  color?: string;
};

// Custom NavCard Prop Types
export interface NavCardProps {
  title: string;
  iconType: IconType;
  backgroundColor: string;
  textColor: string;
  description?: string;
  onPress: () => void;
}
