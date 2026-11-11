# Aplicativo de Conversão de Moedas - React Native (MVVM)

Aplicativo mobile desenvolvido em React Native utilizando JavaScript para consulta de taxas de câmbio de referência e conversão de moedas, consumindo os dados da API pública Frankfurter.

O projeto foi estruturado seguindo o padrão de arquitetura MVVM (Model-View-ViewModel), com separação de responsabilidades entre interface visual, lógica de negócio e camada de acesso a dados.

---

## 1. Arquitetura do Projeto (MVVM)

A estrutura da aplicação é dividida nas três camadas principais:

- **Model (`src/models/currencyModel.js`)**: Responsável exclusivo pela comunicação com a API Frankfurter. Realiza as requisições HTTP utilizando a Fetch API para os endpoints `/v2/currencies` e `/v2/rate/{from}/{to}`, tratando os retornos em formato JSON e capturando exceções de rede.
- **ViewModel (`src/viewmodels/useCurrencyViewModel.js`)**: Implementado por meio de um Hook personalizado do React. Gerencia os estados da aplicação, executa as validações dos dados inseridos pelo usuário, calcula o valor convertido e coordena os estados de carregamento e erro.
- **View (`src/views/CurrencyConverterView.js`)**: Camada de interface com o usuário construída com componentes nativos do React Native e a biblioteca `@react-native-picker/picker`. Apresenta os seletores, campos de entrada, botões, mensagens de orientação e cartões com os resultados obtidos da ViewModel.

---

## 2. Tecnologias Utilizadas

- **React Native** (via Expo Framework)
- **JavaScript (ES6+)**
- **Frankfurter API (v2)**
- **@react-native-picker/picker**

---

## 3. Estrutura de Pastas

```text
ConversorMoedas/
├── src/
│   ├── models/
│   │   └── currencyModel.js
│   ├── viewmodels/
│   │   └── useCurrencyViewModel.js
│   └── views/
│       └── CurrencyConverterView.js
├── App.js
├── package.json
└── README.md
