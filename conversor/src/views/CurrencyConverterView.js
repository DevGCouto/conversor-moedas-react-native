import React from 'react';
import {
  StyleSheet, Text, View, TextInput, Pressable,
  ActivityIndicator, ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useCurrencyViewModel } from '../viewmodels/useCurrencyViewModel';

// Paleta: azul-nota, amarelo-sol e um papel bem claro
const C = {
  azul: '#2D2FA3',
  azulEscuro: '#14143A',
  amarelo: '#FFC93C',
  papel: '#F3F4FB',
  branco: '#FFFFFF',
  cinza: '#6B6F8F',
  linha: '#D9DCF0',
  erro: '#C93B3B',
};

// Transforma "BRL" em 🇧🇷 usando as duas primeiras letras do código
const bandeira = (code) =>
  code.slice(0, 2).toUpperCase().replace(/./g, (l) => String.fromCodePoint(127397 + l.charCodeAt(0)));

const dinheiro = (n) =>
  n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function SeletorMoeda({ rotulo, valor, onChange, moedas }) {
  return (
    <View style={s.campo}>
      <Text style={s.rotulo}>{rotulo}</Text>
      <View style={s.seletor}>
        <Picker selectedValue={valor} onValueChange={onChange} style={s.picker}>
          {moedas.map((m) => (
            <Picker.Item
              key={m.iso_code}
              value={m.iso_code}
              label={`${bandeira(m.iso_code)}  ${m.iso_code} · ${m.name}`}
            />
          ))}
        </Picker>
      </View>
    </View>
  );
}

export default function CurrencyConverterView() {
  const vm = useCurrencyViewModel();

  return (
    <ScrollView style={s.tela} contentContainerStyle={s.conteudo} keyboardShouldPersistTaps="handled">
      <View style={s.topo}>
        <Text style={s.titulo}>Quanto vale?</Text>
        <Text style={s.subtitulo}>Converta valores entre moedas com a cotação do dia.</Text>
      </View>

      {vm.loadingCurrencies ? (
        <View style={s.carregando}>
          <ActivityIndicator size="large" color={C.azul} />
          <Text style={s.carregandoTexto}>Buscando as moedas do mundo…</Text>
        </View>
      ) : (
        <View style={s.cartao}>
          <View style={s.campo}>
            <Text style={s.rotulo}>Quanto você quer converter?</Text>
            <TextInput
              style={s.entrada}
              placeholder="Ex.: 100,00"
              placeholderTextColor={C.cinza}
              keyboardType="numeric"
              value={vm.amount}
              onChangeText={vm.handleAmountChange}
              onSubmitEditing={vm.convertCurrency}
            />
          </View>

          <SeletorMoeda rotulo="De" valor={vm.fromCurrency} onChange={vm.setFromCurrency} moedas={vm.currencies} />

          <Pressable onPress={vm.handleSwapCurrencies} style={({ pressed }) => [s.trocar, pressed && s.pressionado]}>
            <Text style={s.trocarTexto}>⇅  Trocar de lugar</Text>
          </Pressable>

          <SeletorMoeda rotulo="Para" valor={vm.toCurrency} onChange={vm.setToCurrency} moedas={vm.currencies} />

          {!!vm.errorMessage && <Text style={s.erro}>{vm.errorMessage}</Text>}

          <Pressable
            onPress={vm.convertCurrency}
            disabled={vm.loadingConversion}
            style={({ pressed }) => [s.botao, pressed && s.pressionado]}
          >
            {vm.loadingConversion ? (
              <ActivityIndicator color={C.azulEscuro} />
            ) : (
              <Text style={s.botaoTexto}>Converter agora</Text>
            )}
          </Pressable>
        </View>
      )}

      {/* Resultado em formato de "bilhete": valor em cima, detalhes no canhoto */}
      {vm.result !== null && (
        <View style={s.bilhete}>
          <View style={s.bilheteCorpo}>
            <Text style={s.bilheteLinha}>
              {bandeira(vm.fromCurrency)} {dinheiro(parseFloat(vm.amount))} {vm.fromCurrency} valem
            </Text>
            <Text style={s.bilheteValor}>
              {bandeira(vm.toCurrency)} {dinheiro(vm.result)}
            </Text>
            <Text style={s.bilheteMoeda}>{vm.toCurrency}</Text>
          </View>
          <View style={s.picote} />
          <View style={s.bilheteCanhoto}>
            <Text style={s.canhoto}>
              1 {vm.fromCurrency} = {vm.rate} {vm.toCurrency}
            </Text>
            {!!vm.rateDate && (
              <Text style={s.canhoto}>Cotação de {vm.rateDate.split('-').reverse().join('/')}</Text>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  tela: { flex: 1, backgroundColor: C.papel },
  conteudo: { paddingBottom: 40 },

  topo: {
    backgroundColor: C.azul,
    paddingTop: 72,
    paddingHorizontal: 24,
    paddingBottom: 72,
    borderBottomLeftRadius: 36,
  },
  titulo: { fontSize: 40, fontWeight: '900', color: C.branco, letterSpacing: -1 },
  subtitulo: { fontSize: 16, color: '#C9CBFF', marginTop: 8, maxWidth: 280, lineHeight: 22 },

  carregando: { alignItems: 'center', padding: 40, gap: 12 },
  carregandoTexto: { color: C.cinza, fontSize: 15 },

  cartao: {
    backgroundColor: C.branco,
    marginHorizontal: 20,
    marginTop: -44,
    borderRadius: 20,
    padding: 20,
    gap: 4,
    borderWidth: 1,
    borderColor: C.linha,
  },
  campo: { marginBottom: 12 },
  rotulo: { fontSize: 14, fontWeight: '700', color: C.azulEscuro, marginBottom: 6 },
  entrada: {
    backgroundColor: C.papel,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 22,
    fontWeight: '700',
    color: C.azulEscuro,
  },
  seletor: { backgroundColor: C.papel, borderRadius: 12, overflow: 'hidden' },
  picker: { color: C.azulEscuro },

  trocar: {
    alignSelf: 'center',
    borderWidth: 1.5,
    borderColor: C.azul,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginBottom: 12,
  },
  trocarTexto: { color: C.azul, fontWeight: '700', fontSize: 14 },

  erro: { color: C.erro, fontSize: 14, marginBottom: 8, fontWeight: '600' },

  botao: {
    backgroundColor: C.amarelo,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 4,
  },
  botaoTexto: { color: C.azulEscuro, fontSize: 17, fontWeight: '800' },
  pressionado: { opacity: 0.75, transform: [{ scale: 0.98 }] },

  bilhete: { marginHorizontal: 20, marginTop: 20, borderRadius: 20, overflow: 'hidden' },
  bilheteCorpo: { backgroundColor: C.azulEscuro, padding: 22 },
  bilheteLinha: { color: '#B9BBE8', fontSize: 15 },
  bilheteValor: { color: C.amarelo, fontSize: 38, fontWeight: '900', marginTop: 6, letterSpacing: -0.5 },
  bilheteMoeda: { color: C.branco, fontSize: 15, fontWeight: '700', marginTop: 2 },
  picote: { height: 0, borderTopWidth: 2, borderStyle: 'dashed', borderColor: C.azul, backgroundColor: C.azulEscuro },
  bilheteCanhoto: { backgroundColor: C.azulEscuro, paddingHorizontal: 22, paddingBottom: 18, paddingTop: 14, gap: 2 },
  canhoto: { color: '#B9BBE8', fontSize: 13 },
});