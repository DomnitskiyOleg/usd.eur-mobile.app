export default function getChartDataAndConfig(chartData) {
  const usdData = {
    labels: chartData.usdChartData.months,
    datasets: [
      {
        data: chartData.usdChartData.values,
        color: (opacity = 0.6) => `rgba(255, 255, 255, 0.6)`,
      },
    ],
  };
  const eurData = {
    labels: chartData.eurChartData.months,
    datasets: [
      {
        data: chartData.eurChartData.values,
        color: (opacity = 0.6) => `rgba(255, 255, 255, 0.6)`,
      },
    ],
  };
  const chartConfig = {
    useShadowColorFromDataset: true,
    backgroundColor: '#e26a00',
    backgroundGradientFrom: '#fb8c00',
    backgroundGradientTo: '#ffa726',
    decimalPlaces: 1, // optional, defaults to 2dp
    color: (opacity = 0.25) => `rgba(255, 255, 255, ${opacity})`,
    labelColor: (opacity = 0) => `#F5ECCE`,
    barRadius: 15,
    style: {
      borderRadius: 1,
    },
    propsForDots: {
      r: '2.6',
      strokeWidth: '1.5',
      stroke: '#4D4D4D',
    },
  };
  return [usdData, eurData, chartConfig];
}
