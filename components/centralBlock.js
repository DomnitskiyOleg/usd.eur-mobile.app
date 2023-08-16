import styles from '../styles/styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, Image, Dimensions } from 'react-native';

export default (props) => (
  <View style={styles.central_block}>
    <LinearGradient colors={['#fb8c00', '#ffa726']} style={styles.linear}>
      <Text style={styles.text}>TODAY'S USD RATE</Text>
      <Image
        source={require('../pictures/usa-flag.png')}
        style={styles.logos}
      />
      <View style={styles.valueContainer}>
        <Text style={styles.central_text}>{props.usdActualValue}</Text>
        <Text style={styles.central_date}>{props.currentDate}</Text>
      </View>
    </LinearGradient>
    <LinearGradient colors={['#fb8c00', '#ffa726']} style={styles.linear}>
      <Text style={styles.text}>TODAY'S EUR RATE</Text>
      <View style={styles.valueContainer}>
        <Text style={styles.central_text}>{props.eurActualValue}</Text>
        <Text style={styles.central_date}>{props.currentDate}</Text>
      </View>
      <Image
        source={require('../pictures/europe-flag.png')}
        style={styles.logos}
      />
    </LinearGradient>
  </View>
);
