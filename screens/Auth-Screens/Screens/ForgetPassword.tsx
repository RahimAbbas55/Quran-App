import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { AuthStackParamList } from "../../../Types/NavigationTypes";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ForgetPassword_Styles } from "../Styles/ForgetPassword.styles";
import { showToast } from "../../../helper/toastUtilis";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../data-service/firebase";
import { validateEmail } from "../../../helper/validators";
import InputField from "../../../components/Reusable-Components/InputField";
import LinkButton from "../../../components/Reusable-Components/LinkButton";
import AuthButton from "../../../components/Reusable-Components/AuthButton";

type AuthStackNavProp = StackNavigationProp<AuthStackParamList, "Login">;

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetSent, setResetSent] = useState<boolean>(false);
  const navigation = useNavigation<AuthStackNavProp>();

  const handleResetPassword = async () => {
    // Validate email input
    if (!emailAddress) {
      showToast('error', 'Email Required!', 'Please enter your email address.');
      return;
    }

    if (!validateEmail(emailAddress)) {
      showToast('error', 'Invalid Email', 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      // Firebase password reset functionality
      await sendPasswordResetEmail(auth, emailAddress);
      
      setIsLoading(false);
      setResetSent(true);
      showToast('success', 'Reset Email Sent', 'Please check your inbox for password reset instructions.');
      setTimeout(() => {
        navigation.goBack();
      } , 300)
    } catch (error: any) {
      setIsLoading(false);
      if (error.code === 'auth/user-not-found') {
        showToast('error', 'Account Not Found', 'No account exists with this email address.');
      } else if (error.code === 'auth/invalid-email') {
        showToast('error', 'Invalid Email', 'Please enter a valid email address.');
      } else if (error.code === 'auth/too-many-requests') {
        showToast('error', 'Too Many Attempts', 'Too many reset attempts. Please try again later.');
      } else {
        showToast('error', 'Reset Failed', 'Failed to send reset email. Please try again.');
        console.error("Firebase password reset error:", error);
      }
    }
  };

  const handleResendReset = () => {
    setResetSent(false);
    setEmailAddress(""); // Optional: Clear the email field for a fresh attempt
  };

  return (
    <SafeAreaView style={ForgetPassword_Styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={ForgetPassword_Styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={ForgetPassword_Styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={ForgetPassword_Styles.container}>
            {/* Logo */}
            <View style={ForgetPassword_Styles.logoContainer}>
              <View style={ForgetPassword_Styles.logo}>
                <Text style={ForgetPassword_Styles.logoText}>Logo</Text>
              </View>
            </View>

            {/* Title and message block */}
            <View style={ForgetPassword_Styles.textBlock}>
              <Text style={ForgetPassword_Styles.titleText}>
                Forgot{" "}
                <Text style={ForgetPassword_Styles.accentText}>Password?</Text>
              </Text>
              <Text style={ForgetPassword_Styles.subtitleText}>
                Enter your email and we'll send you instructions to reset your
                password
              </Text>
            </View>

            {/* Form Container */}
            <View style={ForgetPassword_Styles.formContainer}>
              {/* Input field Block */}
              <View style={ForgetPassword_Styles.inputWrapper}>
                <Text style={ForgetPassword_Styles.inputLabel}>Email</Text>
                <InputField
                  placeholder="Enter your email address"
                  value={emailAddress}
                  icon_name="mail-outline"
                  keyboardType="email-address"
                  onChangeText={(text: string) => setEmailAddress(text)}
                />
              </View>

              {/* Reset Password Button */}
              <AuthButton
                onPress={handleResetPassword}
                isLoading={isLoading}
                buttonText={resetSent ? "Email Sent" : "Send Reset Link"}
              />

              {/* Back to login option */}
              <LinkButton
                preText="Remember your password? "
                linkText="Login"
                onPress={() => navigation.navigate("Login")}
                containerStyle={ForgetPassword_Styles.loginContainer}
                preTextStyle={ForgetPassword_Styles.loginText}
                linkTextStyle={ForgetPassword_Styles.loginLink}
              />
            </View>

            {/* Instructions */}
            <View style={ForgetPassword_Styles.instructionsContainer}>
              <Text style={ForgetPassword_Styles.instructionsTitle}>
                Didn't receive the email?
              </Text>
              <Text style={ForgetPassword_Styles.instructionsText}>
                Check your spam folder or try again with a different email
                address.
              </Text>
              {resetSent && (
                <TouchableOpacity
                  style={ForgetPassword_Styles.resendButton}
                  onPress={handleResendReset}
                >
                  <Text style={ForgetPassword_Styles.resendText}>
                    Try Again
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;