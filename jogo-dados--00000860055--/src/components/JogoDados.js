// src/components/JogoDados.js
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import Dado from './Dado';

export default function JogoDados() {
  // Estados do Jogo
  const [rodadaAtual, setRodadaAtual] = useState(1);
  const [turnoJogador, setTurnoJogador] = useState('A'); // 'A' para Jogador A, 'B' para Jogador B

  // Dados sorteados
  const [dadosA, setDadosA] = useState([1, 1]);
  const [dadosB, setDadosB] = useState([1, 1]);

  // Mensagens e status
  const [statusA, setStatusA] = useState('');
  const [statusB, setStatusB] = useState('');
  const [fimDeJogo, setFimDeJogo] = useState(false);
  const [resultadoFinal, setResultadoFinal] = useState('');

  // Placar geral (número de rodadas vencidas)
  const [vitoriasA, setVitoriasA] = useState(0);
  const [vitoriasB, setVitoriasB] = useState(0);

  // Função para sortear número aleatório entre 1 e 6
  const sortearDado = () => Math.floor(Math.random() * 6) + 1;

  // Jogada do Jogador A
  const jogarDadoA = () => {
    if (turnoJogador !== 'A' || fimDeJogo) return;

    const novoDado1 = sortearDado();
    const novoDado2 = sortearDado();
    setDadosA([novoDado1, novoDado2]);

    // Limpa os status enquanto aguarda a jogada de B
    setStatusA('');
    setStatusB('');

    // Passa a vez para o Jogador B
    setTurnoJogador('B');
  };

  // Jogada do Jogador B e resolução da rodada
  const jogarDadoB = () => {
    if (turnoJogador !== 'B' || fimDeJogo) return;

    const novoDado1 = sortearDado();
    const novoDado2 = sortearDado();
    setDadosB([novoDado1, novoDado2]);

    // Cálculo das somas
    const somaA = dadosA[0] + dadosA[1];
    const somaB = novoDado1 + novoDado2;

    let vitoriasAAtuais = vitoriasA;
    let vitoriasBAtuais = vitoriasB;

    // Avaliação da rodada
    if (somaA > somaB) {
      setStatusA('Jogador A Venceu');
      setStatusB('Jogador B Perdeu');
      vitoriasAAtuais += 1;
      setVitoriasA(vitoriasAAtuais);
    } else if (somaB > somaA) {
      setStatusA('Jogador A Perdeu');
      setStatusB('Jogador B Venceu');
      vitoriasBAtuais += 1;
      setVitoriasB(vitoriasBAtuais);
    } else {
      setStatusA('Empatou');
      setStatusB('Empatou');
    }

    // Verifica se alcançou a última rodada
    if (rodadaAtual === 5) {
      setFimDeJogo(true);
      setTurnoJogador(null);

      // Determina o vencedor da partida
      if (vitoriasAAtuais > vitoriasBAtuais) {
        setResultadoFinal('🏆 Jogador A é o Grande Campeão!');
      } else if (vitoriasBAtuais > vitoriasAAtuais) {
        setResultadoFinal('🏆 Jogador B é o Grande Campeão!');
      } else {
        setResultadoFinal('🤝 A Partida Terminou em Empate!');
      }
    } else {
      // Avança para a próxima rodada e volta o turno para o Jogador A
      setRodadaAtual(rodadaAtual + 1);
      setTurnoJogador('A');
    }
  };

  // Reiniciar a partida
  const reiniciarJogo = () => {
    setRodadaAtual(1);
    setTurnoJogador('A');
    setDadosA([1, 1]);
    setDadosB([1, 1]);
    setStatusA('');
    setStatusB('');
    setVitoriasA(0);
    setVitoriasB(0);
    setFimDeJogo(false);
    setResultadoFinal('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Borda com título sobreposto (Estilo Moldura) */}
        <View style={styles.cardContainer}>
          <View style={styles.tituloHeader}>
            <Text style={styles.tituloRodada}>Rodada {rodadaAtual}</Text>
          </View>

          <View style={styles.jogadoresContainer}>
            {/* Lado Jogador A */}
            <View style={styles.jogadorBox}>
              <View style={styles.dadosRow}>
                <Dado valor={dadosA[0]} />
                <Dado valor={dadosA[1]} />
              </View>
              <Text style={styles.statusTexto}>{statusA}</Text>
              
              <TouchableOpacity
                style={[
                  styles.btnJogar,
                  turnoJogador === 'A' ? styles.btnAtivo : styles.btnInativo
                ]}
                onPress={jogarDadoA}
                disabled={turnoJogador !== 'A' || fimDeJogo}
              >
                <View style={styles.btnConteudo}>
                  <Text style={[styles.btnTextoEsquerda, turnoJogador !== 'A' && styles.textoInativo]}>
                    Jogar
                  </Text>
                  <View style={[styles.btnDivisor, turnoJogador !== 'A' && styles.btnDivisorInativo]} />
                  <Text style={[styles.btnTextoDireita, turnoJogador !== 'A' && styles.textoInativo]}>
                    Dado
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Lado Jogador B */}
            <View style={styles.jogadorBox}>
              <View style={styles.dadosRow}>
                <Dado valor={dadosB[0]} />
                <Dado valor={dadosB[1]} />
              </View>
              <Text style={styles.statusTexto}>{statusB}</Text>

              <TouchableOpacity
                style={[
                  styles.btnJogar,
                  turnoJogador === 'B' ? styles.btnAtivo : styles.btnInativo
                ]}
                onPress={jogarDadoB}
                disabled={turnoJogador !== 'B' || fimDeJogo}
              >
                <View style={styles.btnConteudo}>
                  <Text style={[styles.btnTextoEsquerda, turnoJogador !== 'B' && styles.textoInativo]}>
                    Jogar
                  </Text>
                  <View style={[styles.btnDivisor, turnoJogador !== 'B' && styles.btnDivisorInativo]} />
                  <Text style={[styles.btnTextoDireita, turnoJogador !== 'B' && styles.textoInativo]}>
                    Dado
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Exibição do Resultado Final após as 5 rodadas */}
        {fimDeJogo && (
          <View style={styles.fimDeJogoBox}>
            <Text style={styles.resultadoFinalTexto}>{resultadoFinal}</Text>
            <Text style={styles.placarTexto}>Placar: A ({vitoriasA}) x ({vitoriasB}) B</Text>
            
            <TouchableOpacity style={styles.btnReiniciar} onPress={reiniciarJogo}>
              <Text style={styles.btnReiniciarTexto}>Jogar Novamente</Text>
            </TouchableOpacity>
          </View>
        )}

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContent: {
    padding: 20,
    alignItems: 'center',
  },
  cardContainer: {
    borderWidth: 1.5,
    borderColor: '#000',
    borderRadius: 20,
    paddingTop: 40,
    paddingBottom: 30,
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 40,
    position: 'relative',
  },
  tituloHeader: {
    position: 'absolute',
    top: -16,
    left: '50%',
    transform: [{ translateX: -60 }],
    backgroundColor: '#FFF',
    paddingHorizontal: 10,
    width: 120,
    alignItems: 'center',
  },
  tituloRodada: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
  jogadoresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  jogadorBox: {
    flex: 1,
    alignItems: 'center',
  },
  dadosRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  statusTexto: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    minHeight: 40,
    marginBottom: 20,
    color: '#000',
  },
  btnJogar: {
    borderRadius: 25,
    borderWidth: 2,
    overflow: 'hidden',
    width: 140,
    height: 44,
    justifyContent: 'center',
  },
  btnAtivo: {
    borderColor: '#000',
    backgroundColor: '#FFF',
  },
  btnInativo: {
    borderColor: '#BBB',
    backgroundColor: '#FFF',
  },
  btnConteudo: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },
  btnTextoEsquerda: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  btnTextoDireita: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    backgroundColor: '#000',
    height: '100%',
    textAlignVertical: 'center',
    lineHeight: 40,
  },
  btnDivisor: {
    width: 1,
    height: '100%',
    backgroundColor: '#000',
  },
  btnDivisorInativo: {
    backgroundColor: '#BBB',
  },
  textoInativo: {
    color: '#BBB',
    backgroundColor: 'transparent',
  },
  fimDeJogoBox: {
    marginTop: 30,
    alignItems: 'center',
    width: '100%',
  },
  resultadoFinalTexto: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 5,
  },
  placarTexto: {
    fontSize: 16,
    color: '#555',
    marginBottom: 15,
  },
  btnReiniciar: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  btnReiniciarTexto: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});