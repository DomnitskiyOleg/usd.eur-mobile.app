import styles from '../styles/styles.js';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, View, Image, Dimensions } from 'react-native';

export default (props) => (
  <View style={styles.central}>
    <LinearGradient colors={['#fb8c00', '#ffa726']} style={styles.linear}>
      <Text style={styles.text}>TODAY'S USD RATE</Text>
      <Image
        source={require('../pictures/usa-flag.png')}
        style={styles.logos}
      />
      <View style={styles.valueContainer1}>
        <Text
          style={{
            fontSize: Dimensions.get('window').width * 0.062,
            margin: 2,
            opacity: 0.9,
            color: 'black',
            fontWeight: '700',
            textShadowRadius: 2,
            textShadowColor: 'black',
          }}
        >
          {props.usdActualValue}
        </Text>
        <Text
          style={{
            fontSize: 11,
            margin: 0,
            textShadowRadius: 2.5,
            textShadowColor: 'black',
          }}
        >
          {props.currentDate}
        </Text>
      </View>
    </LinearGradient>
    <LinearGradient colors={['#fb8c00', '#ffa726']} style={styles.linear}>
      <Text style={styles.text}>TODAY'S EUR RATE</Text>
      <View style={styles.valueContainer2}>
        <Text
          style={{
            fontSize: Dimensions.get('window').width * 0.062,
            margin: 2,
            opacity: 0.9,
            color: 'black',
            fontWeight: '700',
            textShadowRadius: 2,
            textShadowColor: 'black',
          }}
        >
          {props.eurActualValue}
        </Text>
        <Text
          style={{
            fontSize: 11,
            margin: 0,
            textShadowRadius: 2.5,
            textShadowColor: 'black',
          }}
        >
          {props.currentDate}
        </Text>
      </View>
      <Image
        source={require('../pictures/europe-flag.png')}
        style={styles.logos}
      />
    </LinearGradient>
  </View>
);
