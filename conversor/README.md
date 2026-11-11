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

## 4. Imagens

<img width="381" height="550" alt="Captura de tela 2026-11-11 155854" src="https://github.com/user-attachments/assets/7e864f67-90d7-4f69-aa29-b31c035f6037" />


<img width="391" height="757" alt="image" src="https://github.com/user-attachments/assets/179041ab-ffbb-4f3f-9982-a6512f7a5793" />

---

## ⚖️ 5. Regras de Negócio e Validações

A aplicação foi desenvolvida respeitando rigorosamente as seguintes regras e validações:

| # | Regra / Validação | Descrição |
| :-: | :--- | :--- |
| **1** | **Validação de Entrada** | Impede consultas com valor vazio, nulo, igual a zero ou valores negativos. |
| **2** | **Formatação Decimal** | Converte automaticamente vírgulas para pontos (ex.: `10,50` &rarr; `10.50`), garantindo compatibilidade. |
| **3** | **Seleção de Moedas** | Exige moedas de origem e destino válidas e impede a conversão entre moedas idênticas. |
| **4** | **Cálculo Oficial** | O valor é calculado exclusivamente com base na taxa retornada pela API (`Valor Convertido = Valor × Taxa`). |
| **5** | **Transparência de Dados** | Exibe claramente o valor original, valor convertido, moedas, taxa aplicada e data de referência. |
| **6** | **Gerenciamento de Estados** | Apresenta indicador de carregamento (`ActivityIndicator`) e separa erros de formulário de falhas da API. |
| **7** | **Recurso Opcional** | Disponibiliza botão para inversão rápida entre a moeda de origem e a de destino. |

> ℹ️ **Nota:** A API Frankfurter fornece taxas de referência diárias, não cotações comerciais em tempo real.

---

## 🚀 6. Instruções de Instalação e Execução

### 📋 Pré-requisitos

- **Node.js** (Versão LTS recomendada)
- **Expo Go** no dispositivo móvel (Android/iOS) ou um emulador configurado

---

### 📦 Passo a Passo para Execução

1. **Clonar o repositório:**
   ```bash
   git clone [https://github.com/DevGCouto/conversor-moedas-react-native.git](https://github.com/DevGCouto/conversor-moedas-react-native.git)

## 7. Estrutura de Pastas

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




