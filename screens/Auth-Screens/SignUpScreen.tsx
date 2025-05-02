import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  Alert
} from 'react-native';
import { GlobalColors } from '../../constants/GlobalColors';
import InputField from '../../components/Reusable-Components/InputField';
import LinkButton from '../../components/Reusable-Components/LinkButton';

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
  
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
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
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoid}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            {/* Logo */}
            <View style={styles.logoContainer}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>Logo</Text>
              </View>
            </View>
            
            {/* Welcome Text */}
            <View style={styles.textBlock}>
              <Text style={styles.greetingText}>Hello!</Text>
              <Text style={styles.welcomeText}>
                Create <Text style={styles.accentText}>Account</Text>
              </Text>
              <Text style={styles.subtitleText}>Sign up to get started</Text>
            </View>
            
            {/* Form Container */}
            <View style={styles.formContainer}>
              {/* First and Last Name Row */}
              <View style={styles.nameRow}>
                <View style={styles.nameField}>
                  <Text style={styles.inputLabel}>First Name</Text>
                  <InputField
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    icon_name="person-outline"
                    onChangeText={(text: string) => handleInputChange('firstName', text)}
                    error={errors.firstName}
                  />
                  {errors.firstName && (
                    <Text style={styles.errorText}>{errors.firstName}</Text>
                  )}
                </View>
                
                <View style={styles.nameField}>
                  <Text style={styles.inputLabel}>Last Name</Text>
                  <InputField
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    icon_name="person-outline"
                    onChangeText={(text: string) => handleInputChange('lastName', text)}
                    error={errors.lastName}
                  />
                  {errors.lastName && (
                    <Text style={styles.errorText}>{errors.lastName}</Text>
                  )}
                </View>
              </View>
              
              {/* Email */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
                <InputField
                  placeholder="Enter your email address"
                  value={formData.email}
                  icon_name="mail-outline"
                  keyboardType="email-address"
                  onChangeText={(text: string) => handleInputChange('email', text)}
                  error={errors.email}
                />
                {errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              
              {/* Password */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Password</Text>
                <InputField
                  placeholder="Create a password"
                  value={formData.password}
                  icon_name="lock-closed-outline"
                  isPasswordField={true}
                  onChangeText={(text: string) => handleInputChange('password', text)}
                  error={errors.password}
                />
                {errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              
              {/* Confirm Password */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Confirm Password</Text>
                <InputField
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  icon_name="lock-closed-outline"
                  isPasswordField={true}
                  onChangeText={(text: string) => handleInputChange('confirmPassword', text)}
                  error={errors.confirmPassword}
                />
                {errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>
              
              {/* Terms and Conditions */}
              <View style={styles.termsContainer}>
                <Text style={styles.termsText}>
                  By signing up, you agree to our{' '}
                  <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
                  <Text style={styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>
              
              {/* Sign Up Button */}
              <TouchableOpacity 
                style={styles.signUpButton} 
                onPress={handleSignUp}
                activeOpacity={0.8}
                disabled={isLoading}
              >
                <Text style={styles.signUpButtonText}>
                  {isLoading ? 'Creating Account...' : 'Sign Up'}
                </Text>
              </TouchableOpacity>
              
              {/* Login option */}
              <LinkButton
                preText="Already have an account? "
                linkText="Sign In"
                onPress={() => console.log('Navigate to login')}
                containerStyle={styles.loginContainer}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: GlobalColors.neutralTone,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06,
    paddingVertical: height * 0.02,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: height * 0.02,
    marginTop: height * 0.02,
  },
  logo: {
    backgroundColor: GlobalColors.softGreen,
    width: 70,
    height: 70,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  textBlock: {
    alignSelf: 'flex-start',
    width: '100%',
    marginBottom: height * 0.02,
  },
  greetingText: {
    fontSize: 28,
    fontWeight: '600',
    color: '#333',
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginTop: -5,
  },
  accentText: {
    color: GlobalColors.softGreen,
  },
  subtitleText: {
    color: '#757575',
    marginTop: 8,
    fontSize: 16,
  },
  formContainer: {
    width: '100%',
    marginBottom: height * 0.02,
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  nameField: {
    width: '48%',
  },
  inputWrapper: {
    width: '100%',
    marginBottom: 4,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    marginLeft: 4,
    color: '#333',
  },
  errorText: {
    color: '#D32F2F',
    fontSize: 12,
    marginLeft: 4,
    marginTop: 4,
  },
  termsContainer: {
    width: '100%',
    marginVertical: 15,
  },
  termsText: {
    color: '#757575',
    fontSize: 14,
    textAlign: 'center',
  },
  termsLink: {
    color: GlobalColors.softGreen,
    fontWeight: '500',
  },
  signUpButton: {
    width: '100%',
    height: 56,
    borderRadius: 12,
    backgroundColor: GlobalColors.softGreen,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  signUpButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
});

export default SignUpScreen;