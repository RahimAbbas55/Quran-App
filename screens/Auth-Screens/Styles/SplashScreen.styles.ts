import { Dimensions , Platform, StyleSheet , StatusBar} from "react-native";
import { GlobalColors } from "../../../constants/GlobalColors";
const { width, height } = Dimensions.get('window');

export const Splash_Styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    backgroundColor: GlobalColors.neutralTone,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: GlobalColors.neutralTone,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    marginBottom: height * 0.02,
  },
  logo: {
    backgroundColor: GlobalColors.softGreen,
    width: 100,
    height: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  logoText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  appNameContainer: {
    marginVertical: height * 0.02,
  },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
  },
  accentText: {
    color: GlobalColors.softGreen,
  },
  tagline: {
    fontSize: 16,
    color: '#757575',
    marginTop: 8,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 40,
    alignItems: 'center',
  },
  bottomText: {
    fontSize: 14,
    color: '#919191',
  },
});

