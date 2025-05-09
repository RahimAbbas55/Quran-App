import React, { useState } from 'react';
import {
  Text,
  View,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';
import { AuthStackParamList } from "../../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { SignUp_Styles } from '../Styles/SignUpScreen.styles';
import { validateEmail } from '../../../helper/validators';
import InputField from '../../../components/Reusable-Components/InputField';
import LinkButton from '../../../components/Reusable-Components/LinkButton';
import AuthButton from '../../../components/Reusable-Components/AuthButton';

type AuthStackNavProp = StackNavigationProp<AuthStackParamList, "Login">;

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const SignUpScreen: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<AuthStackNavProp>();

  
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    // Validate first name
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    // Validate last name
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    // Validate password
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    // Validate confirm password
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSignUp = (): void => {
    if (validateForm()) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        console.log('Sign Up with:', formData);
        setIsLoading(false);
        Alert.alert('Success', 'Account created successfully!');
        navigation.navigate('Login')
      }, 1500);
    }
  };
  
  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData(prevState => ({
      ...prevState,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [field]: undefined
      }));
    }
  };

  return (
    <SafeAreaView style={SignUp_Styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={SignUp_Styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={SignUp_Styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={SignUp_Styles.container}>
            {/* Logo */}
            <View style={SignUp_Styles.logoContainer}>
              <View style={SignUp_Styles.logo}>
                <Text style={SignUp_Styles.logoText}>Logo</Text>
              </View>
            </View>
            
            {/* Welcome Text */}
            <View style={SignUp_Styles.textBlock}>
              <Text style={SignUp_Styles.greetingText}>Hello!</Text>
              <Text style={SignUp_Styles.welcomeText}>
                Create <Text style={SignUp_Styles.accentText}>Account</Text>
              </Text>
              <Text style={SignUp_Styles.subtitleText}>Sign up to get started</Text>
            </View>
            
            {/* Form Container */}
            <View style={SignUp_Styles.formContainer}>
              {/* First and Last Name Row */}
              <View style={SignUp_Styles.nameRow}>
                <View style={SignUp_Styles.nameField}>
                  <Text style={SignUp_Styles.inputLabel}>First Name</Text>
                  <InputField
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    icon_name="person-outline"
                    onChangeText={(text: string) => handleInputChange('firstName', text)}
                    error={errors.firstName}
                  />
                  {errors.firstName && (
                    <Text style={SignUp_Styles.errorText}>{errors.firstName}</Text>
                  )}
                </View>
                
                <View style={SignUp_Styles.nameField}>
                  <Text style={SignUp_Styles.inputLabel}>Last Name</Text>
                  <InputField
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    icon_name="person-outline"
                    onChangeText={(text: string) => handleInputChange('lastName', text)}
                    error={errors.lastName}
                  />
                  {errors.lastName && (
                    <Text style={SignUp_Styles.errorText}>{errors.lastName}</Text>
                  )}
                </View>
              </View>
              
              {/* Email */}
              <View style={SignUp_Styles.inputWrapper}>
                <Text style={SignUp_Styles.inputLabel}>Email</Text>
                <InputField
                  placeholder="Enter your email address"
                  value={formData.email}
                  icon_name="mail-outline"
                  keyboardType="email-address"
                  onChangeText={(text: string) => handleInputChange('email', text)}
                  error={errors.email}
                />
                {errors.email && (
                  <Text style={SignUp_Styles.errorText}>{errors.email}</Text>
                )}
              </View>
              
              {/* Password */}
              <View style={SignUp_Styles.inputWrapper}>
                <Text style={SignUp_Styles.inputLabel}>Password</Text>
                <InputField
                  placeholder="Create a password"
                  value={formData.password}
                  icon_name="lock-closed-outline"
                  isPasswordField={true}
                  onChangeText={(text: string) => handleInputChange('password', text)}
                  error={errors.password}
                />
                {errors.password && (
                  <Text style={SignUp_Styles.errorText}>{errors.password}</Text>
                )}
              </View>
              
              {/* Confirm Password */}
              <View style={SignUp_Styles.inputWrapper}>
                <Text style={SignUp_Styles.inputLabel}>Confirm Password</Text>
                <InputField
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  icon_name="lock-closed-outline"
                  isPasswordField={true}
                  onChangeText={(text: string) => handleInputChange('confirmPassword', text)}
                  error={errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <Text style={SignUp_Styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
              
              {/* Terms and Conditions */}
              <View style={SignUp_Styles.termsContainer}>
                <Text style={SignUp_Styles.termsText}>
                  By signing up, you agree to our{' '}
                  <Text style={SignUp_Styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={SignUp_Styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>
              
              {/* Sign Up Button */}
              <AuthButton onPress={handleSignUp} isLoading={isLoading} buttonText={"Sign Up"}/>
              
              {/* Login option */}
              <LinkButton
                preText="Already have an account? "
                linkText="Sign In"
                onPress={() => console.log('Navigate to login')}
                containerStyle={SignUp_Styles.loginContainer}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignUpScreen;