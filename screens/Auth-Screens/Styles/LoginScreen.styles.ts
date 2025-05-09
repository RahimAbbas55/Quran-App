import { Dimensions , Platform , StyleSheet , StatusBar } from "react-native";
import { GlobalColors } from "../../../constants/GlobalColors";
const { width, height } = Dimensions.get("window");

export const Login_Styles = StyleSheet.create({
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
