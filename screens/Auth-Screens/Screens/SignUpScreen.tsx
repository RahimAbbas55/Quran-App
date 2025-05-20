import React, { useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { AuthStackParamList } from "../../../Types/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { SignUp_Styles } from "../Styles/SignUpScreen.styles";
import { validateEmail, validatePassword } from "../../../helper/validators";
import { showToast } from "../../../helper/toastUtilis";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../data-service/firebase";
import { useAuth } from "../../../context/AuthContext";
import InputField from "../../../components/Reusable-Components/InputField";
import LinkButton from "../../../components/Reusable-Components/LinkButton";
import AuthButton from "../../../components/Reusable-Components/AuthButton";

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
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { logout } = useAuth();
  const navigation = useNavigation<AuthStackNavProp>();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    const passwordValidation = validatePassword(formData.password);
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.error;
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (): Promise<void> => {
    if (!validateForm()) {
      console.log(errors);
      return;
    }
    setIsLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCredential.user;
      // Update profile
      await updateProfile(user, {
        displayName: `${formData.firstName} ${formData.lastName}`,
      });

      // // Store in Firestore
      await setDoc(doc(db, "users", user.uid), {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        createdAt: new Date(),
      });

      // Send email verification
      await sendEmailVerification(user);

      await signOut(auth);

      showToast(
        "success",
        "Sign Up Successful!",
        "Please verify your email to continue."
      );
      setTimeout(() => {
        navigation.navigate("Login");
      }, 3000);
    } catch (error: any) {
      const errorCode = error.code;
      if (errorCode === "auth/email-already-in-use") {
        showToast("error", "Sign Up Failed", "Email is already in use.");
      } else if (errorCode === "auth/invalid-email") {
        showToast("error", "Sign Up Failed", "Invalid email address.");
      } else if (errorCode === "auth/weak-password") {
        showToast("error", "Sign Up Failed", "Password is too weak.");
      } else {
        showToast("error", "Sign Up Failed", "Please try again later.");
      }
      console.log("Sign up error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof FormData, value: string): void => {
    setFormData((prevState) => ({
      ...prevState,
      [field]: value,
    }));

    if (errors[field]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: undefined,
      }));
    }
  };

  return (
    <SafeAreaView style={SignUp_Styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={SignUp_Styles.keyboardAvoid}
      >
        <ScrollView
          contentContainerStyle={SignUp_Styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={SignUp_Styles.container}>
            <View style={SignUp_Styles.logoContainer}>
              <View style={SignUp_Styles.logo}>
                <Text style={SignUp_Styles.logoText}>Logo</Text>
              </View>
            </View>

            <View style={SignUp_Styles.textBlock}>
              <Text style={SignUp_Styles.greetingText}>Hello!</Text>
              <Text style={SignUp_Styles.welcomeText}>
                Create <Text style={SignUp_Styles.accentText}>Account</Text>
              </Text>
              <Text style={SignUp_Styles.subtitleText}>
                Sign up to get started
              </Text>
            </View>

            <View style={SignUp_Styles.formContainer}>
              <View style={SignUp_Styles.nameRow}>
                <View style={SignUp_Styles.nameField}>
                  <Text style={SignUp_Styles.inputLabel}>First Name</Text>
                  <InputField
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    icon_name="person-outline"
                    onChangeText={(text) =>
                      handleInputChange("firstName", text)
                    }
                    error={errors.firstName}
                  />
                </View>

                <View style={SignUp_Styles.nameField}>
                  <Text style={SignUp_Styles.inputLabel}>Last Name</Text>
                  <InputField
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    icon_name="person-outline"
                    onChangeText={(text) => handleInputChange("lastName", text)}
                    error={errors.lastName}
                  />
                </View>
              </View>

              <View style={SignUp_Styles.inputWrapper}>
                <Text style={SignUp_Styles.inputLabel}>Email</Text>
                <InputField
                  placeholder="Enter your email address"
                  value={formData.email}
                  icon_name="mail-outline"
                  keyboardType="email-address"
                  onChangeText={(text) => handleInputChange("email", text)}
                  error={errors.email}
                />
              </View>

              <View style={SignUp_Styles.inputWrapper}>
                <Text style={SignUp_Styles.inputLabel}>Password</Text>
                <InputField
                  placeholder="Create a password"
                  value={formData.password}
                  icon_name="lock-closed-outline"
                  isPasswordField={true}
                  onChangeText={(text) => handleInputChange("password", text)}
                  error={errors.password}
                />
              </View>

              <View style={SignUp_Styles.inputWrapper}>
                <Text style={SignUp_Styles.inputLabel}>Confirm Password</Text>
                <InputField
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  icon_name="lock-closed-outline"
                  isPasswordField={true}
                  onChangeText={(text) =>
                    handleInputChange("confirmPassword", text)
                  }
                  error={errors.confirmPassword}
                />
              </View>

              <View style={SignUp_Styles.termsContainer}>
                <Text style={SignUp_Styles.termsText}>
                  By signing up, you agree to our{" "}
                  <Text style={SignUp_Styles.termsLink}>Terms of Service</Text>{" "}
                  and{" "}
                  <Text style={SignUp_Styles.termsLink}>Privacy Policy</Text>
                </Text>
              </View>

              <AuthButton
                onPress={handleSignUp}
                isLoading={isLoading}
                buttonText={"Sign Up"}
              />

              <LinkButton
                preText="Already have an account? "
                linkText="Sign In"
                onPress={() => navigation.goBack()}
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
