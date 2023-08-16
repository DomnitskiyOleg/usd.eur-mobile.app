const usdCode = 'R01235';
const eurCode = 'R01239';

const requestUrl = 'https://cbr.ru/scripts/XML_dynamic.asp';
const requestUrlForActualRates = 'https://www.cbr.ru/scripts/XML_daily.asp';

const getRequests = (requestUrl, day, month, year, code) =>
  `${requestUrl}?date_req1=${day}/${month}/${
    year - 1
  }&date_req2=${day}/${month}/${year}&VAL_NM_RQ=${code}`;

export default function getUsdEurUrls() {
  const currentDate = new Date(Date.now());
  const [year, month, day] = currentDate.toISOString().slice(0, 10).split('-');

  const usdRequest = getRequests(requestUrl, day, month, year, usdCode);
  const eurRequest = getRequests(requestUrl, day, month, year, eurCode);

  return [usdRequest, eurRequest, requestUrlForActualRates];
}
