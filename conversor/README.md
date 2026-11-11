# Aplicativo de Conversão de Moedas - React Native (MVVM)

Aplicação mobile desenvolvida em **React Native** com **JavaScript** para consulta de taxas de câmbio de referência e conversão de moedas em tempo real, consumindo a API pública **Frankfurter**.

O projeto foi estruturado seguindo o padrão de arquitetura **MVVM (Model-View-ViewModel)**, priorizando a organização do código, o gerenciamento de estados de interface e a separação de responsabilidades.

---

## 1. Arquitetura do Projeto (MVVM)

A aplicação divide-se em três camadas principais:

- **Model (`src/models/currencyModel.js`)**: Responsável exclusivo pela comunicação assíncrona com a API Frankfurter utilizando a Fetch API. Executa chamadas aos endpoints `/v2/currencies` e `/v2/rate/{from}/{to}`, tratando o parsing das respostas JSON e a captura de exceções de rede.
- **ViewModel (`src/viewmodels/useCurrencyViewModel.js`)**: Implementado por meio de um Hook personalizado do React. Centraliza e gerencia os estados da aplicação (valor digitado, moedas selecionadas, resultado, carregamento e erros), executa as validações dos dados inseridos e realiza o cálculo final da conversão.
- **View (`src/views/CurrencyConverterView.js`)**: Interface de utilizador construída com componentes nativos do React Native e a biblioteca `@react-native-picker/picker`. Renderiza os campos de entrada, seletores de moeda, botões e cartões informativos com os dados expostos pela ViewModel.

---

## 2. Tecnologias e Ferramentas

- **React Native** (via Expo Framework)
- **JavaScript (ES6+)**
- **API Pública Frankfurter (v2)**
- **Fetch API**
- **React Hooks** (`useState`, `useEffect`)
- **@react-native-picker/picker**

---

## 3. Endpoints da API Utilizados

- **Listagem de Moedas Disponíveis**:
  `GET https://api.frankfurter.dev/v2/currencies`
  Carrega a lista completa de moedas para preenchimento dinâmico dos seletores.

- **Consulta de Taxa entre Moedas**:
  `GET https://api.frankfurter.dev/v2/rate/{from}/{to}`
  Retorna a taxa de câmbio atualizada e a data de referência oficial da API.

---

## 4. Estrutura de Pastas

```text
ConversorMoedas/
├── src/
│   ├── models/
│   │   └── currencyModel.js          # Camada Model (Acesso à API)
│   ├── viewmodels/
│   │   └── useCurrencyViewModel.js   # Camada ViewModel (Lógica e Estados)
│   └── views/
│       └── CurrencyConverterView.js  # Camada View (Interface Visual)
├── App.js                             # Ponto de entrada da aplicação
├── package.json                       # Dependências do projeto
└── README.md                          # Documentação

<img width="381" height="550" alt="image" src="https://github.com/user-attachments/assets/9f78d5f5-3f3e-43c1-b3b8-07750a0f949f" />
<img width="391" height="757" alt="image" src="https://github.com/user-attachments/assets/a4617d8c-75a4-4812-be80-5a6fcd4953d3" />



