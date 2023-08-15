import styles from '../styles/styles.js';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, ActivityIndicator } from 'react-native';

export default LoadingScreen = () => (
  <View style={styles.container}>
    <LinearGradient
      colors={['#191919', '#727272', '#191919']}
      style={styles.background}
    />
    <ActivityIndicator size='large' />
    <Text style={{ fontSize: 16, color: 'white' }}>Loading data...</Text>
    <StatusBar style='light' />
  </View>
);
