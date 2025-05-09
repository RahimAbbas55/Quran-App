import { Dimensions , Platform , StatusBar , StyleSheet } from "react-native";
import { GlobalColors } from "../../../constants/GlobalColors";
const { width, height } = Dimensions.get("window");

export const ForgetPassword_Styles = StyleSheet.create({
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