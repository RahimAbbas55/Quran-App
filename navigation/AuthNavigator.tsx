import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Auth-Screens/LoginScreen';
import SignUpScreen from '../screens/Auth-Screens/SignUpScreen';
import ForgotPassword from '../screens/Auth-Screens/ForgetPassword';
import SplashScreen from '../screens/Auth-Screens/SplashScreen';
import { AuthStackParamList } from '../types';

// Create a Stack Navigator
const Stack = createStackNavigator<AuthStackParamList>();

const AuthNavigator = () => {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <Stack.Navigator initialRouteName={showSplash ? "Splash" : "Login"}>
      {showSplash && (
        <Stack.Screen name="Splash" options={{ headerShown: false }}>
          {(props) => <SplashScreen {...props} onComplete={handleSplashComplete} />}
        </Stack.Screen>
      )}
      <Stack.Screen name="Login" component={LoginScreen} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="SignUp" component={SignUpScreen} options={{
        headerShown: false
      }}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{
        headerShown: false
      }}/>
    </Stack.Navigator>
  );
};

export default AuthNavigator;