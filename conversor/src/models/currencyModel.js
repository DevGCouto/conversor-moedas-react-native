const API = 'https://api.frankfurter.dev/v2';

export const currencyModel = {
  // Busca todas as moedas que a API conhece
  async fetchCurrencies() {
    try {
      const res = await fetch(`${API}/currencies`);
      if (!res.ok) throw new Error(`status ${res.status}`);
      return await res.json(); // [{ iso_code: 'BRL', name: 'Brazilian Real' }, ...]
    } catch (e) {
      throw new Error('Não consegui carregar as moedas. Confira sua internet e tente de novo.');
    }
  },

  // Busca quanto 1 unidade da moeda "de" vale na moeda "para"
  async fetchExchangeRate(de, para) {
    try {
      const res = await fetch(`${API}/rate/${de}/${para}`);
      if (!res.ok) throw new Error(`status ${res.status}`);
      const { rate, date } = await res.json();
      if (rate === undefined || !date) throw new Error('resposta incompleta');
      return { rate, date };
    } catch (e) {
      throw new Error('Não consegui buscar a cotação agora. Tente de novo em instantes.');
    }
  },
};