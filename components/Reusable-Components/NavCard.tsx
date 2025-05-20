import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconType , NavCardProps } from '../../Types/UIPropsTypes';

const getIconName = (iconType: IconType): string => {
  switch (iconType) {
    case 'quran':
      return 'book-open-variant';
    case 'memorization':
      return 'brain';
    case 'tafsir':
      return 'text-box-search';
    case 'questions':
      return 'robot';
    case 'path':
      return 'road-variant';
    case 'settings':
      return 'cog';
    default:
      return 'application';
  }
};

const NavCard: React.FC<NavCardProps> = ({ 
  title, 
  iconType, 
  backgroundColor, 
  textColor, 
  description, 
  onPress 
}) => {
  const iconName = getIconName(iconType);
  
  return (
    <TouchableOpacity 
      style={[styles.card, { backgroundColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name={iconName} size={30} color={textColor} />
      </View>
      <View style={styles.textContainer}>
        <Text style={[styles.title, { color: textColor }]}>{title}</Text>
        {description && (
          <Text style={[styles.description, { color: textColor, opacity: 0.7 }]}>
            {description}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    padding: 16,
    marginBottom: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
    height: 140,
    justifyContent: 'space-between',
  },
  iconContainer: {
    marginBottom: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    lineHeight: 16,
  },
});

export default NavCard;