import styles from '../styles/styles.js';
import { Text, View } from 'react-native';

export default (props) => (
  <View style={styles.valueContainer}>
    <Text style={styles.central_text}>{props.actualValue}</Text>
    <Text style={styles.central_date}>{props.currentDate}</Text>
  </View>
);
