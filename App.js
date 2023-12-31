import styles from './styles/styles.js';
import LoadingScreen from './components/loadingScreen.js';
import getUsdEurRates from './src/getRates.js';
import getChartDataAndConfig from './src/getChartDataAndConfig.js';
import getUsdEurUrls from './src/getUrlsForFetch.js';
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { View, TouchableOpacity, Text } from 'react-native';
import Chart from './components/chart.js';
import CentralBlock from './components/centralBlock.js';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState({});

  const getUsdEurChartData = async () => {
    try {
      const links = getUsdEurUrls();
      const promises = links.map((link) => fetch(link));
      const responses = await Promise.all(promises);
      const dataPromises = responses.map((response) => response.text());
      const [xml1, xml2, xml3] = await Promise.all(dataPromises);
      const chartData = getUsdEurRates(xml1, xml2, xml3);
      setChartData(chartData);
      setLoading(false);
    } catch (err) {
      alert('Network Error, check internet connection');
    }
  };

  useEffect(() => {
    getUsdEurChartData();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  const [usdData, eurData, chartConfig] = getChartDataAndConfig(chartData);
  const currentDate = chartData.usdEurActualRates.date;
  const usdActualValue = chartData.usdEurActualRates.usdActualValue;
  const eurActualValue = chartData.usdEurActualRates.eurActualValue;

  return (
    <View style={styles.container}>
      <StatusBar />
      <LinearGradient
        colors={['#191919', '#727272', '#191919']}
        style={styles.background}
      />
      <Chart
        currencyData={usdData}
        chartConfig={chartConfig}
        header={'USD.RUB - 1 YEAR CHART'}
      />
      <CentralBlock
        usdActualValue={usdActualValue}
        eurActualValue={eurActualValue}
        currentDate={currentDate}
      />
      <Chart
        currencyData={eurData}
        chartConfig={chartConfig}
        header={'EUR.RUB - 1 YEAR CHART'}
      />
      <TouchableOpacity
        style={styles.refreshButton}
        onPress={() => {
          setLoading(true);
          getUsdEurChartData();
        }}
      >
        <View>
          <Text style={styles.buttonText}>REFRESH DATA</Text>
        </View>
      </TouchableOpacity>
      <StatusBar style='light' />
    </View>
  );
}
