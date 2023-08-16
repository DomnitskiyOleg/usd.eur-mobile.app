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

export default function getUsdEurRates(xml1, xml2, xml3) {
  let usdRatesObj;
  let eurRatesObj;
  let actualRatesObj;
  parseString(
    xml1,
    { trim: true, mergeAttrs: true, normalizeTags: true },
    (err, result) => {
      if (err) {
        alert('Parsing Error - restart APP');
        return;
      }
      usdRatesObj = result;
    },
  );
  parseString(
    xml2,
    { trim: true, mergeAttrs: true, normalizeTags: true },
    (err, result) => {
      if (err) {
        alert('Parsing Error - restart APP');
        return;
      }
      eurRatesObj = result;
    },
  );
  parseString(
    xml3,
    { trim: true, mergeAttrs: true, normalizeTags: true },
    (err, result) => {
      if (err) {
        alert('Parsing Error - restart APP');
        return;
      }
      actualRatesObj = result;
    },
  );
  const date = actualRatesObj.valcurs.Date.join('');
  const usdExchangeRates = usdRatesObj.valcurs.record.map(
    ({ Date: [date], value: [price] }) => ({
      [getNormalizedDate(date)]: parseFloat(price.replace(',', '.')),
    }),
  );
  const eurExchangeRates = eurRatesObj.valcurs.record.map(
    ({ Date: [date], value: [price] }) => ({
      [getNormalizedDate(date)]: parseFloat(price.replace(',', '.')),
    }),
  );
  const usdEurActualRates = actualRatesObj.valcurs.valute.reduce(
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
