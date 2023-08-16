export default function getUsdEurUrls() {
  const usdCode = 'R01235';
  const eurCode = 'R01239';

  const currentDate = new Date(Date.now());
  const [year, month, day] = currentDate.toISOString().slice(0, 10).split('-');
  const requestUrl = 'https://cbr.ru/scripts/XML_dynamic.asp';
  const requestUrlForActualRates = 'https://www.cbr.ru/scripts/XML_daily.asp';
  const usdRequest = `${requestUrl}?date_req1=${day}/${month}/${
    year - 1
  }&date_req2=${day}/${month}/${year}&VAL_NM_RQ=${usdCode}`;
  const eurRequest = `${requestUrl}?date_req1=${day}/${month}/${
    year - 1
  }&date_req2=${day}/${month}/${year}&VAL_NM_RQ=${eurCode}`;

  return [usdRequest, eurRequest, requestUrlForActualRates];
}
