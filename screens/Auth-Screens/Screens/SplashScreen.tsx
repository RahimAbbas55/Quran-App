import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  Animated,
  SafeAreaView,
} from 'react-native';
import { Splash_Styles } from '../Styles/SplashScreen.Styles';

type SplashScreenProps = {
  onComplete: () => void;
};

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const logoScaleAnim = useRef(new Animated.Value(0.5)).current;
  const textTranslateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    // Sequence of animations
    Animated.sequence([
      // 1. Fade in and scale up the background
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // 2. Animate the logo
      Animated.timing(logoScaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      // 3. Animate the tagline text
      Animated.timing(textTranslateY, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      }),
      // 4. Hold for a moment
      Animated.delay(1000),
    ]).start(() => {
      onComplete();
    });
  }, [fadeAnim, scaleAnim, logoScaleAnim, textTranslateY, onComplete]);

  return (
    <SafeAreaView style={Splash_Styles.safeArea}>
      <Animated.View 
        style={[
          Splash_Styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <View style={Splash_Styles.contentContainer}>
          {/* Logo */}
          <Animated.View 
            style={[
              Splash_Styles.logoContainer,
              {
                transform: [{ scale: logoScaleAnim }],
              }
            ]}
          >
            <View style={Splash_Styles.logo}>
              <Text style={Splash_Styles.logoText}>Logo</Text>
            </View>
          </Animated.View>
          
          {/* App name */}
          <View style={Splash_Styles.appNameContainer}>
            <Text style={Splash_Styles.appName}>
              App<Text style={Splash_Styles.accentText}>Name</Text>
            </Text>
          </View>
          
          {/* Tagline */}
          <Animated.View
            style={{
              transform: [{ translateY: textTranslateY }],
              opacity: fadeAnim,
            }}
          >
            <Text style={Splash_Styles.tagline}>Your perfect companion</Text>
          </Animated.View>
        </View>
        
        {/* Bottom branding */}
        <View style={Splash_Styles.bottomContainer}>
          <Text style={Splash_Styles.bottomText}>© 2025 Company Name</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};
export default SplashScreen;