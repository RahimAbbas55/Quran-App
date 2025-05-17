import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // ✅ correct import

export const SuccessToast = ({ text1, text2 }: any) => (
  <View style={[styles.container, styles.success]}>
    <MaterialIcons name="check-circle" size={24} color="#4CAF50" style={styles.icon} />
    <View style={styles.textWrapper}>
      <Text style={styles.title}>{text1}</Text>
      {text2 ? <Text style={styles.message}>{text2}</Text> : null}
    </View>
  </View>
);

export const ErrorToast = ({ text1, text2 }: any) => (
  <View style={[styles.container, styles.error]}>
    <MaterialIcons name="cancel" size={24} color="#F44336" style={styles.icon} />
    <View style={styles.textWrapper}>
      <Text style={styles.title}>{text1}</Text>
      {text2 ? <Text style={styles.message}>{text2}</Text> : null}
    </View>
  </View>
);

export const WarningToast = ({ text1, text2 }: any) => (
  <View style={[styles.container, styles.warning]}>
    <MaterialIcons name="info" size={24} color="#FF9800" style={styles.icon} />
    <View style={styles.textWrapper}>
      <Text style={styles.title}>{text1}</Text>
      {text2 ? <Text style={styles.message}>{text2}</Text> : null}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 10,
    marginHorizontal: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    backgroundColor: '#fff',
  },
  textWrapper: {
    flex: 1,
    paddingLeft: 10,
  },
  icon: {
    marginRight: 4,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    fontSize: 14,
    color: '#555',
  },
  success: {
    borderLeftWidth: 5,
    borderLeftColor: '#4CAF50',
  },
  error: {
    borderLeftWidth: 5,
    borderLeftColor: '#F44336',
  },
  warning: {
    borderLeftWidth: 5,
    borderLeftColor: '#FF9800',
  },
});
