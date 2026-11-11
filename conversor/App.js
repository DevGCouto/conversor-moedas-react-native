import React from 'react';
import { StatusBar } from 'react-native';
import CurrencyConverterView from './src/views/CurrencyConverterView';

export default function App() {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <CurrencyConverterView />
    </>
  );
}