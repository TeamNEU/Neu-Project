import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { router } from 'expo-router';

export default function Splash() {
  useEffect(() => {
    setTimeout(() => {
      router.replace('/Register');  // Expo Router navigation
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animatable.Text animation="fadeInDown" style={styles.title}>NEU</Animatable.Text>
      <Animatable.Text animation="fadeInUp" style={styles.tagline}>Your Health. Your Data. Your Power.</Animatable.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center',
  },
  title: {
    fontSize: 50, color: '#00ff88', fontWeight: 'bold',
  },
  tagline: {
    fontSize: 18, color: '#aaa', marginTop: 10,
  },
});
