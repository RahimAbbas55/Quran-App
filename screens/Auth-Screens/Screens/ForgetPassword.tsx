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
import { AuthStackParamList } from "../../../Types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { ForgetPassword_Styles } from "../Styles/ForgetPassword.styles";
import InputField from "../../../components/Reusable-Components/InputField";
import LinkButton from "../../../components/Reusable-Components/LinkButton";
import AuthButton from "../../../components/Reusable-Components/AuthButton";
import { showToast } from "../../../helper/toastUtilis";

type AuthStackNavProp = StackNavigationProp<AuthStackParamList, "Login">;

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetSent, setResetSent] = useState<boolean>(false);
  const navigation = useNavigation<AuthStackNavProp>();

  const handleResetPassword = () => {
    if (!emailAddress){
      showToast('error' , 'Email Required!' , 'Please enter your email address.')
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      console.log("Password reset request for:", emailAddress);
      setIsLoading(false);
      setResetSent(true);
    }, 1500);

    showToast('success' , 'Reset Request Sent' , 'Please check your inbox.')

    //Navigation
    //navigation.goBack();
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
                onPress={() => console.log("Navigate to login")}
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
                  onPress={() => {
                    setResetSent(false);
                  }}
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
