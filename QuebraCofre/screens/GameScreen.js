import { useState, useEffect } from 'react';
import { View, Text, Alert, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import NumberContainer from '../components/ui/NumberContainer';
import PrimaryButton from '../components/game/PrimaryButton';
import GuessLogItem from '../components/game/GuessLogItem';
import Colors from '../constants/Colors';

let minLimite = 1;
let maxLimite = 100;

function geraSenha(min, max, excluir) {
  const senha = Math.floor(Math.random() * (max - min)) + min;

  if (senha === excluir) {
    return geraSenha(min, max, excluir);
  }
  return senha;
}

function GameScreen({ userNumber, limiteMaximo, onGameOver }) {
  const palpiteInicial = geraSenha(1, limiteMaximo + 1, userNumber);
  const [currentGuess, setCurrentGuess] = useState(palpiteInicial);
  const [guessRounds, setGuessRounds] = useState([palpiteInicial]);

  useEffect(() => {
    minLimite = 1;
    maxLimite = limiteMaximo + 1;
  }, [limiteMaximo]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver, guessRounds]);

  function nextGuessHandler(direction) {
    if (
      (direction === 'alto' && currentGuess < userNumber) ||
      (direction === 'baixo' && currentGuess > userNumber)
    ) {
      Alert.alert('A tranca não mente!', 'Essa dica não confere com a senha.', [
        { text: 'Ok', style: 'cancel' },
      ]);
      return;
    }

    if (direction === 'alto') {
      maxLimite = currentGuess;
    } else {
      minLimite = currentGuess + 1;
    }

    const novoPalpite = geraSenha(minLimite, maxLimite, currentGuess);
    setCurrentGuess(novoPalpite);
    setGuessRounds((prevGuessRounds) => [novoPalpite, ...prevGuessRounds]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Palpite do robô</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Text style={styles.instructionText}>Alto demais ou baixo demais?</Text>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(null, 'alto')}>
              <Ionicons name="arrow-up" size={16} color={Colors.fundoTopo} />{' '}
              Alto
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(null, 'baixo')}>
              <Ionicons name="arrow-down" size={16} color={Colors.fundoTopo} />{' '}
              Baixo
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem
              tentativa={guessRoundsListLength - itemData.index}
              palpite={itemData.item}
            />
          )}
          keyExtractor={(item) => String(item)}
        />
      </View>
    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  instructionText: {
    marginBottom: 8,
    fontFamily: 'ShareTechMono-Regular',
    fontSize: 20,
    color: Colors.texto,
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  buttonContainer: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
    alignSelf: 'stretch',
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});
