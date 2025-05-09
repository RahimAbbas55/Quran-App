import React, { useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  SafeAreaView,
  Platform,
  StatusBar,
} from 'react-native';
import { GlobalColors } from '../../constants/GlobalColors';

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
    <SafeAreaView style={styles.safeArea}>
      <Animated.View 
        style={[
          styles.container,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }
        ]}
      >
        <View style={styles.contentContainer}>
          {/* Logo */}
          <Animated.View 
            style={[
              styles.logoContainer,
              {
                transform: [{ scale: logoScaleAnim }],
              }
            ]}
          >
            <View style={styles.logo}>
              <Text style={styles.logoText}>Logo</Text>
            </View>
          </Animated.View>
          
          {/* App name */}
          <View style={styles.appNameContainer}>
            <Text style={styles.appName}>
              App<Text style={styles.accentText}>Name</Text>
            </Text>
          </View>
          
          {/* Tagline */}
          <Animated.View
            style={{
              transform: [{ translateY: textTranslateY }],
              opacity: fadeAnim,
            }}
          >
            <Text style={styles.tagline}>Your perfect companion</Text>
          </Animated.View>
        </View>
        
        {/* Bottom branding */}
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>© 2025 Company Name</Text>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
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

export default SplashScreen;