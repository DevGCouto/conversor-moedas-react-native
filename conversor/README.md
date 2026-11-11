Aplicativo de Conversão de Moedas - React Native com MVVM

1. Apresentação do Projeto e Objetivo Geral

Este projeto consiste em um aplicativo mobile desenvolvido em React Native com JavaScript para consulta de taxas de câmbio de referência e conversão de moedas em tempo real, utilizando a API pública Frankfurter como fonte de dados.

O objetivo principal da aplicação é praticar o desenvolvimento de aplicações mobile, o consumo de APIs REST, o gerenciamento de estados e a aplicação rigorosa da arquitetura MVVM (Model-View-ViewModel), promovendo a clara separação de responsabilidades entre a interface gráfica, as regras de negócio e a camada de acesso a dados.

2. Tecnologias e Ferramentas

React Native / Expo Framework: Plataforma utilizada para o desenvolvimento da interface mobile multiplataforma (Android e iOS).

JavaScript (ES6+): Linguagem de programação principal utilizada no projeto.

Frankfurter API (v2): Serviço externo utilizado para consultar a listagem de moedas disponíveis, taxas de câmbio e valores de conversão.

Fetch API: Recurso nativo do JavaScript para a realização de requisições HTTP assíncronas.

React Hooks (useState, useEffect): Recursos para controle de estado local e gerenciamento dos ciclos de vida dos componentes.

@react-native-picker/picker: Componente de seleção visual para escolha das moedas de origem e destino.

3. Endpoints da API Frankfurter Utilizados

A integração com a API pública Frankfurter (versão 2) consome os seguintes endpoints:

Listagem de Moedas Disponíveis:
GET https://api.frankfurter.dev/v2/currencies
Utilizado na inicialização da aplicação para preencher dinamicamente os seletores de moeda de origem e destino.

Consulta de Taxa de Câmbio e Data de Referência:
GET https://api.frankfurter.dev/v2/rate/{from}/{to}
Utilizado para obter a taxa de câmbio oficial e a data de referência retornada pela API para o par de moedas selecionado pelo usuário.

Nota Importante: A API Frankfurter fornece taxas de câmbio de referência e não cotações comerciais de mercado em tempo real. O aplicativo exibe explicitamente a data de referência retornada pela API no resultado da conversão.

4. Estrutura do Projeto e Arquitetura MVVM

A aplicação foi organizada seguindo a estrutura proposta pelo padrão de arquitetura MVVM:

ConversorMoedas/
├── src/
│   ├── models/
│   │   └── currencyModel.js          # Camada Model (Comunicação HTTP e API)
│   ├── viewmodels/
│   │   └── useCurrencyViewModel.js   # Camada ViewModel (Estados e Regras de Negócio)
│   └── views/
│       └── CurrencyConverterView.js  # Camada View (Interface Gráfica)
├── App.js                             # Ponto de entrada da aplicação
├── package.json                       # Configurações e dependências do projeto
└── README.md                          # Documentação completa do projeto


Detalhamento das Responsabilidades das Camadas:

Model (src/models/currencyModel.js):

Realiza as requisições HTTP (fetch) para os endpoints da API Frankfurter.

Interpreta e formata a resposta obtida em padrão JSON.

Trata erros de conexão, falhas de resposta HTTP e retornos vazios.

Mantém o acesso aos dados isolado sem qualquer dependência ou conhecimento dos componentes visuais.

ViewModel (src/viewmodels/useCurrencyViewModel.js):

Hook personalizado que centraliza os estados da tela (valor digitado, moedas selecionadas, resultado, mensagens de erro e estados de carregamento).

Executa as validações das informações fornecidas pelo usuário antes de acionar o Model.

Realiza o cálculo exato do valor convertido (Valor Convertido = Valor Informado × Taxa de Câmbio).

Prepara os dados formatados e disponibiliza os métodos e estados para a View.

View (src/views/CurrencyConverterView.js):

Apresenta os elementos visuais na tela (título, campo de entrada de valor, seletores de moeda, botão de ação, mensagens de erro e cartão de resultado).

Reflete os estados expostos pela ViewModel.

Não faz chamadas diretas à API nem executa validações ou cálculos internos.

5. Regras de Negócio e Validações Implementadas

O aplicativo atende rigorosamente a todas as regras de negócio obrigatórias do projeto:

Validação de Entrada de Dados: Bloqueia tentativas de conversão com valores vazios, zerados, negativos ou que não sejam numéricos.

Tratamento de Números Decimais: Aceita entradas numéricas decimais tanto com ponto quanto com vírgula (ex.: 10,50 é automaticamente convertido para 10.50 para fins de cálculo).

Seleção de Moedas: Exige a seleção de moedas válidas e impede a realização de conversão quando as moedas de origem e destino forem idênticas.

Consulta em Tempo Real: Realiza a busca da taxa de câmbio diretamente na API antes de concluir o cálculo, sem a utilização de taxas fixas inventadas.

Apresentação Clara do Resultado: Exibe o valor original, a moeda de origem, o valor convertido, a moeda de destino, a taxa de câmbio utilizada e a data de referência oficial.

Gerenciamento de Erros e Carregamento: Apresenta indicador de carregamento (ActivityIndicator) durante a requisição, desabilita o botão de ação para evitar chamadas duplicadas e exibe mensagens de erro claras e orientativas.

Desafio Opcional Implementado: Disponibiliza um botão de inversão rápida das moedas de origem e destino, atualizando os seletores e permitindo novas conversões com a ordem invertida.

6. Checklist de Testes de Qualidade

[x] Carregamento inicial: A lista de moedas é obtida dinamicamente da API Frankfurter ao abrir a tela.

[x] Conversão válida: Um valor positivo é convertido com sucesso entre duas moedas distintas.

[x] Campo vazio: A aplicação identifica o campo sem preenchimento e solicita ao usuário que informe um valor.

[x] Valor igual a zero ou negativo: A conversão é bloqueada e uma mensagem de aviso é apresentada.

[x] Valor decimal: A aplicação aceita e processa corretamente entradas com vírgula ou ponto.

[x] Moedas iguais: O aplicativo impede a consulta quando a moeda de origem é igual à moeda de destino.

[x] Indicador de carregamento: O indicador visual aparece durante a requisição e desaparece ao concluir.

[x] Tratamento de falhas: Mensagens amigáveis são exibidas em situações de erro na requisição ou ausência de conexão.

[x] Data e taxa: O resultado exibe a taxa de câmbio exata e a data de referência retornadas pela API.

7. Instruções para Instalação e Execução

Pré-requisitos

Node.js instalado (versão LTS recomendada).

Aplicativo Expo Go instalado no smartphone (Android ou iOS) ou um emulador configurado.

Passo a Passo

Clonar o repositório do GitHub:

git clone https://github.com/DevGCouto/conversor-moedas-react-native.git


Navegar até a pasta do projeto:

cd conversor-moedas-react-native


Instalar as dependências necessárias:

npm install


Iniciar o servidor de desenvolvimento do Expo:

npx expo start


Executar a aplicação:

Abra o aplicativo Expo Go no celular e escaneie o código QR exibido no terminal.

Alternativamente, pressione a tecla w no terminal para abrir a aplicação no navegador web.
