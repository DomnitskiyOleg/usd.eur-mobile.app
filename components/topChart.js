import { LineChart } from 'react-native-chart-kit';
import { Text, View, Dimensions } from 'react-native';

export default TopChart = (props) => (
  <View
    style={{
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <View>
      <Text
        style={{
          top: 8,
          left: 0,
          right: 0,
          color: '#F5ECCE',
          fontWeight: 'bold',
          fontSize: 14.1,
          textAlign: 'center',
          position: 'absolute',
          zIndex: 1,
          textShadowRadius: 7,
          textShadowColor: 'black',
        }}
      >
        USD.RUB - 1 YEAR CHART
      </Text>
      <LineChart
        segments={5}
        data={props.usdData}
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
