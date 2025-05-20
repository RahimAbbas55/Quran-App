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
import { Login_Styles } from "../Styles/LoginScreen.styles";
import { showToast } from "../../../helper/toastUtilis";
import { auth } from "../../../data-service/firebase";
import { signInWithEmailAndPassword } from "@firebase/auth";
import InputField from "../../../components/Reusable-Components/InputField";
import LinkButton from "../../../components/Reusable-Components/LinkButton";
import AuthButton from "../../../components/Reusable-Components/AuthButton";

type AuthStackNavProp = StackNavigationProp<AuthStackParamList, "Login">;

const LoginScreen = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation<AuthStackNavProp>();

  const handleLogin = async () => {
    if (!emailAddress) {
      showToast("error", "Email Required", "Please enter your email address.");
      return;
    }
    if (!password) {
      showToast("error", "Password Required", "Please enter your password.");
      return;
    }
    setIsLoading(true);
    try {
      const response = await signInWithEmailAndPassword(
        auth,
        emailAddress,
        password
      );
      const user = response.user;

      if (!user.emailVerified) {
        await auth.signOut(); // Sign out the unverified user
        showToast(
          "error",
          "Email Not Verified",
          "Please verify your email before logging in."
        );
        return;
      }
    } catch (error: any) {
      switch (error.code) {
        case "auth/invalid-email": {
          showToast(
            "error",
            "Invalid Email",
            "Please enter a valid email address."
          );
          break;
        }

        case "auth/user-not-found": {
          showToast(
            "error",
            "Account Not Found",
            "No account exists with this email address."
          );
          break;
        }

        case "auth/wrong-password": {
          showToast(
            "error",
            "Incorrect Password",
            "The password you entered is incorrect."
          );
          break;
        }

        case "auth/invalid-credential": {
          showToast(
            "error",
            "Invalid Credentials",
            "Your email or password is incorrect."
          );
          break;
        }

        case "auth/user-disabled": {
          showToast(
            "error",
            "Account Disabled",
            "This account has been disabled."
          );
          break;
        }

        case "auth/too-many-requests": {
          showToast(
            "error",
            "Too Many Attempts",
            "Access temporarily disabled due to many failed login attempts. Try again later or reset your password."
          );
          break;
        }

        case "auth/network-request-failed": {
          showToast(
            "error",
            "Network Error",
            "Please check your internet connection and try again."
          );
          break;
        }

        case "auth/internal-error": {
          showToast(
            "error",
            "Authentication Error",
            "An internal error occurred. Please try again later."
          );
          break;
        }

        default: {
          console.error("Firebase login error:", error.code, error.message);
          showToast(
            "error",
            "Login Failed",
            "Unable to sign in. Please try again."
          );
          break;
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={Login_Styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={Login_Styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={Login_Styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={Login_Styles.container}>
            {/* Logo */}
            <View style={Login_Styles.logoContainer}>
              <View style={Login_Styles.logo}>
                <Text style={Login_Styles.logoText}>Logo</Text>
              </View>
            </View>

            {/* Welcome message block */}
            <View style={Login_Styles.textBlock}>
              <Text style={Login_Styles.greetingText}>Hey,</Text>
              <Text style={Login_Styles.welcomeText}>
                Welcome <Text style={Login_Styles.accentText}>Back</Text>
              </Text>
              <Text style={Login_Styles.subtitleText}>
                Sign in to continue to your account
              </Text>
            </View>

            {/* Form Container */}
            <View style={Login_Styles.formContainer}>
              {/* Input fields Block */}
              <View style={Login_Styles.inputWrapper}>
                <Text style={Login_Styles.inputLabel}>Email</Text>
                <InputField
                  placeholder="Enter your email address"
                  value={emailAddress}
                  icon_name="mail-outline"
                  keyboardType="email-address"
                  onChangeText={(text: string) => setEmailAddress(text)}
                />

                <Text style={Login_Styles.inputLabel}>Password</Text>
                <InputField
                  placeholder="Enter your password"
                  value={password}
                  icon_name="lock-closed-outline"
                  isPasswordField={true}
                  onChangeText={(text: string) => setPassword(text)}
                />

                <LinkButton
                  preText="                                    "
                  linkText="Forgot Password?"
                  onPress={() => navigation.navigate("ForgotPassword")}
                  containerStyle={Login_Styles.signupContainer}
                  preTextStyle={Login_Styles.signupText}
                  linkTextStyle={Login_Styles.signupLink}
                />
              </View>

              {/* Login Button */}
              <AuthButton
                onPress={handleLogin}
                isLoading={isLoading}
                buttonText={"Login"}
              />

              {/* Sign up option */}
              <LinkButton
                preText="Don't have an account? "
                linkText="Sign Up"
                onPress={() => navigation.navigate("SignUp")}
                containerStyle={Login_Styles.signupContainer}
                preTextStyle={Login_Styles.signupText}
                linkTextStyle={Login_Styles.signupLink}
              />
            </View>

            {/* Social login options */}
            <View style={Login_Styles.socialLoginContainer}>
              <Text style={Login_Styles.orText}>Or sign in with</Text>
              <View style={Login_Styles.socialButtonsRow}>
                <TouchableOpacity style={Login_Styles.socialButton}>
                  <Text style={Login_Styles.socialButtonText}>G</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
