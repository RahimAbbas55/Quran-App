import { Dimensions , Platform , StyleSheet , StatusBar } from "react-native";
import { GlobalColors } from "../../../constants/GlobalColors";
const { width, height } = Dimensions.get('window');

export const SignUp_Styles = StyleSheet.create({
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
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 4,
  },
  nameField: {
    width: '100%',
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