import styles from '../styles/styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, Image } from 'react-native';
import ValueContainer from './valueContainer.js';

export default (props) => (
  <View style={styles.central_block}>
    <LinearGradient colors={['#fb8c00', '#ffa726']} style={styles.linear}>
      <Text style={styles.text}>TODAY'S USD RATE</Text>
      <Image
        source={require('../pictures/usa-flag.png')}
        style={styles.logos}
      />
      <ValueContainer
        currentDate={props.currentDate}
        actualValue={props.usdActualValue}
      />
    </LinearGradient>
    <LinearGradient colors={['#fb8c00', '#ffa726']} style={styles.linear}>
      <Text style={styles.text}>TODAY'S EUR RATE</Text>
      <ValueContainer
        currentDate={props.currentDate}
        actualValue={props.eurActualValue}
      />
      <Image
        source={require('../pictures/europe-flag.png')}
        style={styles.logos}
      />
    </LinearGradient>
  </View>
);
