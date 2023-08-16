import _ from 'lodash';
import { parseString } from 'react-native-xml2js';

function getNormalizedDate(date) {
  const normDate = date.split('.').reverse().join('-');
  return new Date(normDate);
}

function getRatesPerMonth(rates) {
  const result = rates.reduce((acc, item) => {
    const [[date, value]] = Object.entries(item);
    const month = new Date(date).toLocaleString('en', { month: 'short' });
    if (!Object.hasOwn(acc, month)) acc[month] = value;
    return acc;
  }, {});
  return result;
}

function getNormalizedRates(ratesObj) {
  const normalizedRates = ratesObj.valcurs.record.map(
    ({ Date: [date], value: [price] }) => ({
      [getNormalizedDate(date)]: parseFloat(price.replace(',', '.')),
    }),
  );
  return normalizedRates;
}

function getNormalizedActualRates(ratesObj) {
  const normalizedRates = ratesObj.valcurs.valute.reduce(
    (acc, { ID: [id], value: [price] }) => {
      const normalizedPrice =
        Math.round(parseFloat(price.replace(',', '.')) * 10) / 10;
      if (id === 'R01235') {
        acc.usdActualValue = normalizedPrice;
      } else if (id === 'R01239') {
        acc.eurActualValue = normalizedPrice;
      }
      return acc;
    },
    {},
  );
  return normalizedRates;
}

function getParsedObj(xml) {
  let parsedObj;
  parseString(
    xml,
    { trim: true, mergeAttrs: true, normalizeTags: true },
    (err, result) => {
      if (err) {
        alert('Parsing Error - restart APP');
        return;
      }
      parsedObj = result;
    },
  );
  return parsedObj;
}

export default function getUsdEurRates(xml1, xml2, xml3) {
  const usdRatesObj = getParsedObj(xml1);
  const eurRatesObj = getParsedObj(xml2);
  const actualRatesObj = getParsedObj(xml3);

  const date = actualRatesObj.valcurs.Date.join('');

  const usdExchangeRates = getNormalizedRates(usdRatesObj);
  const eurExchangeRates = getNormalizedRates(eurRatesObj);

  const usdEurActualRates = getNormalizedActualRates(actualRatesObj);
  const usdRatesPerMonth = getRatesPerMonth(usdExchangeRates);
  const eurRatesPerMonth = getRatesPerMonth(eurExchangeRates);
  const usdChartData = {
    months: _.keys(usdRatesPerMonth),
    values: _.values(usdRatesPerMonth),
  };
  const eurChartData = {
    months: _.keys(eurRatesPerMonth),
    values: _.values(eurRatesPerMonth),
  };
  usdEurActualRates.date = date;
  const chartData = { usdChartData, eurChartData, usdEurActualRates };
  return chartData;
}
