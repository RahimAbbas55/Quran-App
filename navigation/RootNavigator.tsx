import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import Loader from '../components/Reusable-Components/Loader';

export default function RootNavigator() {
  const { user, loading , logout} = useAuth();
  if (loading) {
    return (
     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Loader size={60} color="#4CAF50" />
      </View>
    );
  }
  if (user){
    console.log(user)
    // logout()
  }
  return user ? <MainNavigator /> : <AuthNavigator />;
}
