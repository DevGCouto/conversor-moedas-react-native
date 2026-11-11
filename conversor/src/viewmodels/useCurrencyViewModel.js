import { useState, useEffect } from 'react';
import { currencyModel } from '../models/currencyModel';

export function useCurrencyViewModel() {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('BRL');
  const [currencies, setCurrencies] = useState([]);

  const [result, setResult] = useState(null);
  const [rate, setRate] = useState(null);
  const [rateDate, setRateDate] = useState(null);

  const [loadingCurrencies, setLoadingCurrencies] = useState(true);
  const [loadingConversion, setLoadingConversion] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setCurrencies(await currencyModel.fetchCurrencies());
      } catch (e) {
        setErrorMessage(e.message);
      } finally {
        setLoadingCurrencies(false);
      }
    })();
  }, []);

  // Aceita vírgula (como a gente escreve no Brasil) e troca por ponto
  const handleAmountChange = (text) => {
    setAmount(text.replace(',', '.'));
    if (errorMessage) setErrorMessage('');
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  const convertCurrency = async () => {
    setErrorMessage('');
    const value = parseFloat(amount);

    if (isNaN(value) || value <= 0) {
      setErrorMessage('Digite um valor maior que zero para converter.');
      return;
    }

    if (fromCurrency === toCurrency) {
      setResult(value);
      setRate(1);
      setRateDate(null);
      return;
    }

    setLoadingConversion(true);
    try {
      const { rate: r, date } = await currencyModel.fetchExchangeRate(fromCurrency, toCurrency);
      setRate(r);
      setRateDate(date);
      setResult(value * r);
    } catch (e) {
      setErrorMessage(e.message);
    } finally {
      setLoadingConversion(false);
    }
  };

  return {
    amount, fromCurrency, toCurrency, currencies,
    result, rate, rateDate,
    loadingCurrencies, loadingConversion, errorMessage,
    setFromCurrency, setToCurrency,
    handleAmountChange, handleSwapCurrencies, convertCurrency,
  };
}