import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import InputField from "./components/UI/InputField";
import LoginScreen from "./screens/Auth-Screens/LoginScreen";
import SignUpScreen from "./screens/Auth-Screens/SignUpScreen";
export default function App() {
  return (
    <View style={styles.container}>
      <LoginScreen/>
      {/* <SignUpScreen/> */}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
