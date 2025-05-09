import React from "react";
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
} from "react-native";
import { useState } from "react";
import { GlobalColors } from "../../constants/GlobalColors";
import { AuthStackParamList } from "../../types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import InputField from "../../components/Reusable-Components/InputField";
import LinkButton from "../../components/Reusable-Components/LinkButton";
import AuthButton from "../../components/Reusable-Components/AuthButton";

type AuthStackNavProp = StackNavigationProp<AuthStackParamList, "Login">;

const ForgotPassword = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resetSent, setResetSent] = useState<boolean>(false);
    const navigation = useNavigation<AuthStackNavProp>();


  const handleResetPassword = () => {
    if (!emailAddress) return;
    setIsLoading(true);
    setTimeout(() => {
      console.log("Password reset request for:", emailAddress);
      setIsLoading(false);
      setResetSent(true);
      navigation.navigate('Login')
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
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

            {/* Title and message block */}
            <View style={styles.textBlock}>
              <Text style={styles.titleText}>
                Forgot <Text style={styles.accentText}>Password?</Text>
              </Text>
              <Text style={styles.subtitleText}>
                Enter your email and we'll send you instructions to reset your password
              </Text>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
              {/* Input field Block */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
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

              {/* Success message */}
              {resetSent && (
                <View style={styles.successContainer}>
                  <Text style={styles.successText}>
                    We've sent you an email with instructions to reset your password.
                  </Text>
                </View>
              )}

              {/* Back to login option */}
              <LinkButton
                preText="Remember your password? "
                linkText="Login"
                onPress={() => console.log("Navigate to login")}
                containerStyle={styles.loginContainer}
                preTextStyle={styles.loginText}
                linkTextStyle={styles.loginLink}
              />
            </View>

            {/* Instructions */}
            <View style={styles.instructionsContainer}>
              <Text style={styles.instructionsTitle}>Didn't receive the email?</Text>
              <Text style={styles.instructionsText}>
                Check your spam folder or try again with a different email address.
              </Text>
              {resetSent && (
                <TouchableOpacity 
                  style={styles.resendButton}
                  onPress={() => {
                    setResetSent(false);
                  }}
                >
                  <Text style={styles.resendText}>Try Again</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: GlobalColors.neutralTone,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: width * 0.06, // responsive padding
    paddingVertical: height * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: height * 0.03,
    marginTop: height * 0.02,
  },
  logo: {
    backgroundColor: GlobalColors.softGreen,
    width: 70,
    height: 70,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  logoText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  textBlock: {
    alignSelf: "flex-start",
    width: "100%",
    marginBottom: height * 0.03,
  },
  titleText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
  },
  accentText: {
    color: GlobalColors.softGreen,
  },
  subtitleText: {
    color: "#757575",
    marginTop: 8,
    fontSize: 16,
    lineHeight: 22,
  },
  formContainer: {
    width: "100%",
    marginBottom: height * 0.02,
  },
  inputWrapper: {
    width: "100%",
    marginBottom: height * 0.025,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
    marginLeft: 4,
    color: "#333",
  },
  successContainer: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    borderLeftWidth: 4,
    borderLeftColor: GlobalColors.softGreen,
  },
  successText: {
    color: "#4CAF50",
    fontSize: 14,
    lineHeight: 20,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.03,
  },
  loginText: {
    color: "#757575",
    fontSize: 16,
  },
  loginLink: {
    color: GlobalColors.softGreen,
    fontWeight: "bold",
    fontSize: 16,
  },
  instructionsContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.04,
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  instructionsText: {
    fontSize: 14,
    color: "#757575",
    textAlign: "center",
    lineHeight: 20,
  },
  resendButton: {
    marginTop: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
  },
  resendText: {
    color: GlobalColors.softGreen,
    fontWeight: "600",
    fontSize: 14,
  },
});

export default ForgotPassword;