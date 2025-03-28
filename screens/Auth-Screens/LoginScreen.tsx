import { StyleSheet, Text, View } from "react-native";
import InputField from "../../components/UI/InputField";
import { GlobalColors } from "../../constants/GlobalColors";
import LinkButton from "../../components/UI/LinkButton";

const LoginScreen = () => {
  return (
    <>
      <View style={styles.container}>
        {/* Welcome message block  */}
        <View style={styles.textBlock}>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome</Text>
          <Text style={styles.welcomeText}>Back</Text>
        </View>

        {/* Input fields Block */}
        <View style={styles.inputFields}>
          <InputField
            placeholder="Please enter your email address"
            value=""
            icon_name="mail-outline"
            keyboardType="email-address"
            onChangeText={() => console.log("hey")}
          />
          <InputField
            placeholder="Please enter your account password"
            value=""
            icon_name="key"
            keyboardType="email-address"
            isPasswordField={true}
            onChangeText={() => console.log("hey")}
          />
            <LinkButton text="Forgot Password?"  style={styles.forgetPassStyle} onPress={() => console.log('hello')}/>
        </View>
        {/* Login Button */}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: GlobalColors.Lavender,
  },
  textBlock: {
    alignSelf: "flex-start",
    marginLeft: 10,
    marginBottom: 40,
  },
  welcomeText: {
    fontSize: 50,
  },
  inputFields: {
    width: "100%",
    marginBottom: 270,
  },
  forgetPassStyle: {
    alignSelf: 'flex-end',
    marginRight: 10,
  }
});

export default LoginScreen;
