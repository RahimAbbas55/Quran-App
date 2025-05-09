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
import InputField from "../../components/Reusable-Components/InputField";
import LinkButton from "../../components/Reusable-Components/LinkButton";
import CustomButton from "../../components/Reusable-Components/LoginButton";


interface LoginPropTypes{
  emailAddress ?: string;
  password ?: string;
}

const LoginScreen = () => {
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = () => {
    if (!emailAddress || !password) return;
    setIsLoading(true);
    setTimeout(() => {
      console.log("Login attempt with:", emailAddress);
      setIsLoading(false);
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

            {/* Welcome message block */}
            <View style={styles.textBlock}>
              <Text style={styles.greetingText}>Hey,</Text>
              <Text style={styles.welcomeText}>
                Welcome <Text style={styles.accentText}>Back</Text>
              </Text>
              <Text style={styles.subtitleText}>
                Sign in to continue to your account
              </Text>
            </View>

            {/* Form Container */}
            <View style={styles.formContainer}>
              {/* Input fields Block */}
              <View style={styles.inputWrapper}>
                <Text style={styles.inputLabel}>Email</Text>
                <InputField
                  placeholder="Enter your email address"
                  value={emailAddress}
                  icon_name="mail-outline"
                  keyboardType="email-address"
                  onChangeText={(text: string) => setEmailAddress(text)}
                />

                <Text style={styles.inputLabel}>Password</Text>
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
                  onPress={() => console.log("Navigate to signup")}
                  containerStyle={styles.signupContainer}
                  preTextStyle={styles.signupText}
                  linkTextStyle={styles.signupLink}
                />
              </View>

              {/* Login Button */}
              <CustomButton onPress={handleLogin} isLoading={isLoading} />

              {/* Sign up option */}
              <LinkButton
                preText="Don't have an account? "
                linkText="Sign Up"
                onPress={() => console.log("Navigate to signup")}
                containerStyle={styles.signupContainer}
                preTextStyle={styles.signupText}
                linkTextStyle={styles.signupLink}
              />
            </View>

            {/* Social login options */}
            <View style={styles.socialLoginContainer}>
              <Text style={styles.orText}>Or sign in with</Text>
              <View style={styles.socialButtonsRow}>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>G</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>f</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialButton}>
                  <Text style={styles.socialButtonText}>in</Text>
                </TouchableOpacity>
              </View>
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
  greetingText: {
    fontSize: 28,
    fontWeight: "600",
    color: "#333",
  },
  welcomeText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#333",
    marginTop: -5,
  },
  accentText: {
    color: GlobalColors.softGreen,
  },
  subtitleText: {
    color: "#757575",
    marginTop: 8,
    fontSize: 16,
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
  forgetPassStyle: {
    alignSelf: "flex-end",
    marginTop: 12,
    marginRight: 4,
  },
  loginButton: {
    width: "100%",
    height: 56,
    borderRadius: 12,
    backgroundColor: GlobalColors.blue,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
  loginButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: height * 0.01,
  },
  signupText: {
    color: "#757575",
    fontSize: 16,
  },
  signupLink: {
    color: GlobalColors.softGreen,
    fontWeight: "bold",
    fontSize: 16,
  },
  socialLoginContainer: {
    width: "100%",
    alignItems: "center",
    marginTop: height * 0.03,
  },
  orText: {
    color: "#757575",
    marginBottom: height * 0.02,
  },
  socialButtonsRow: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  socialButtonText: {
    fontSize: 16,
    fontWeight: "500",
  },
});

export default LoginScreen;
