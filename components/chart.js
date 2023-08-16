import styles from '../styles/styles.js';
import { LineChart } from 'react-native-chart-kit';
import { Text, View, Dimensions } from 'react-native';

export default Chart = (props) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View>
      <Text style={styles.header}>{props.header}</Text>
      <LineChart
        segments={5}
        data={props.currencyData}
        width={Dimensions.get('window').width * 0.97}
        height={Dimensions.get('window').height * 0.3}
        yAxisLabel='₽'
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={props.chartConfig}
        bezier
        style={{
          borderRadius: 12,
        }}
      />
    </View>
  </View>
);

// EUR.RUB - 1 YEAR CHART
