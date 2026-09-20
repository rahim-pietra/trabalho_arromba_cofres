import { useState } from 'react';
import { View, TextInput, Text, Alert, StyleSheet } from 'react-native';

import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import PrimaryButton from '../components/game/PrimaryButton';
import Colors from '../constants/Colors';

const niveis = [
  { nome: 'Fácil', max: 50, tresEstrelas: 4, duasEstrelas: 7 },
  { nome: 'Difícil', max: 99, tresEstrelas: 5, duasEstrelas: 8 },
  { nome: 'Insano', max: 200, tresEstrelas: 6, duasEstrelas: 10 },
];

function StartGameScreen({ onPickNumber, recorde }) {
  const [enteredNumber, setEnteredNumber] = useState('');
  const [nivel, setNivel] = useState(niveis[1]);

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > nivel.max) {
      Alert.alert(
        'Senha inválida',
        'A senha precisa ser um número entre 1 e ' + nivel.max + '.',
        [{ text: 'Ok', style: 'destructive', onPress: resetInputHandler }]
      );
      return;
    }

    onPickNumber(chosenNumber, nivel);
  }

  return (
    <View style={styles.screen}>
      <Title>Quebra-Cofre</Title>
      <Text style={styles.recordText}>
        {recorde === null
          ? 'Nenhum recorde ainda'
          : 'Recorde: ' + recorde + ' tentativas'}
      </Text>
      <Card>
        <Text style={styles.instructionText}>Nível do cofre</Text>
        <View style={styles.buttonsContainer}>
          {niveis.map((item) => (
            <View style={styles.buttonContainer} key={item.nome}>
              <PrimaryButton
                style={item.nome === nivel.nome ? null : styles.inactiveButton}
                onPress={setNivel.bind(null, item)}
              >
                {item.nome}
              </PrimaryButton>
            </View>
          ))}
        </View>
      </Card>
      <Card>
        <Text style={styles.instructionText}>Qual a senha do cofre?</Text>
        <Text style={styles.rangeText}>de 1 a {nivel.max}</Text>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          keyboardType="number-pad"
          autoCapitalize="none"
          autoCorrect={false}
          value={enteredNumber}
          onChangeText={numberInputHandler}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton
              style={styles.inactiveButton}
              onPress={resetInputHandler}
            >
              Limpar
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Trancar</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  recordText: {
    marginTop: 14,
    fontFamily: 'ShareTechMono-Regular',
    fontSize: 16,
    color: Colors.textoSuave,
  },
  instructionText: {
    fontFamily: 'ShareTechMono-Regular',
    fontSize: 20,
    color: Colors.texto,
  },
  rangeText: {
    marginTop: 4,
    fontFamily: 'ShareTechMono-Regular',
    fontSize: 16,
    color: Colors.textoSuave,
  },
  numberInput: {
    width: 80,
    height: 56,
    marginVertical: 12,
    fontFamily: 'ShareTechMono-Regular',
    fontSize: 36,
    textAlign: 'center',
    color: Colors.led,
    borderBottomWidth: 2,
    borderBottomColor: Colors.latao,
  },
  buttonsContainer: {
    alignSelf: 'stretch',
    flexDirection: 'row',
    marginTop: 8,
  },
  buttonContainer: {
    flex: 1,
  },
  inactiveButton: {
    backgroundColor: Colors.textoSuave,
  },
});
