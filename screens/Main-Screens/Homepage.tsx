import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar, ImageBackground } from 'react-native';
import NavCard, { IconType } from '../../components/Reusable-Components/NavCard';
import { GlobalColors } from '../../constants/GlobalColors';

// Navigation Types 
interface NavItem {
  title: string;
  iconType: IconType;
  color: string;
  textColor: string;
  description: string;
}

const Homepage: React.FC = () => {
  const handleNavPress = (navItem: string): void => {
    console.log(`Navigating to: ${navItem}`);
    // Navigation logic would go here
  };
  const navItems: NavItem[] = [
    { 
      title: 'Quran Reading', 
      iconType: 'quran', 
      color: '#e8f5e9', 
      textColor: GlobalColors.softGreen,
      description: 'Read and listen to Quran'
    },
    { 
      title: 'Memorization', 
      iconType: 'memorization', 
      color: '#e0f7fa', 
      textColor: GlobalColors.blue,
      description: 'Learn and revise verses' 
    },
    { 
      title: 'Tafsir', 
      iconType: 'tafsir', 
      color: '#fff3e0', 
      textColor: GlobalColors.warmOrange,
      description: 'Study Quranic commentary' 
    },
    { 
      title: 'Ask AI', 
      iconType: 'questions', 
      color: '#f5f5f5', 
      textColor: GlobalColors.darkGray,
      description: 'Get answers to your questions' 
    },
    { 
      title: 'Learning Path', 
      iconType: 'path', 
      color: '#e3f2fd', 
      textColor: GlobalColors.blue,
      description: 'Follow structured lessons' 
    },
    { 
      title: 'Settings', 
      iconType: 'settings', 
      color: '#f5f5f5', 
      textColor: GlobalColors.darkGray,
      description: 'Customize your experience' 
    },
  ];

  const greeting = (): string => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ImageBackground 
        source={{ uri: 'https://i.imgur.com/placeholder.png' }} // Replace with actual subtle pattern bg
        style={styles.backgroundImage}
        imageStyle={{ opacity: 0.05 }}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={styles.greetingText}>{greeting()}, User</Text>
              <Text style={styles.welcomeText}>Welcome Back!</Text>
              <Text style={styles.questionText}>What would you like to do today?</Text>
            </View>

            <View style={styles.dateContainer}>
              <Text style={styles.dateText}>{new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</Text>
            </View>
          </View>
          <View style={styles.divider}></View>

          <View style={styles.navGrid}>
            {navItems.map((item, index) => (
              <NavCard
                key={index}
                title={item.title}
                iconType={item.iconType}
                backgroundColor={item.color}
                textColor={item.textColor}
                description={item.description}
                onPress={() => handleNavPress(item.title)}
              />
            ))}
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: GlobalColors.neutralTone,
    marginTop: 50
  },
  backgroundImage: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
  },
  greetingText: {
    fontSize: 16,
    color: GlobalColors.darkGray,
    opacity: 0.8,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: GlobalColors.darkGray,
    marginBottom: 4,
  },
  questionText: {
    fontSize: 16,
    color: GlobalColors.darkGray,
    opacity: 0.7,
  },
  dateContainer: {
    backgroundColor: GlobalColors.softGreen,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  dateText: {
    color: GlobalColors.neutralTone,
    fontWeight: '600',
  },
  navGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: GlobalColors.darkGray,
  },
  quickAccessBar: {
    marginTop: 10,
  },
  quickAccessItems: {
    gap: 16,
  },
  quickAccessItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: GlobalColors.neutralTone,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickAccessIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  quickAccessText: {
    fontSize: 16,
    fontWeight: '500',
    color: GlobalColors.darkGray,
  },
  divider: {
    height: 3,
    backgroundColor: GlobalColors.softGreen,
    marginVertical: 16,
    width: '100%',
    marginBottom: 30  
  }
});

export default Homepage;