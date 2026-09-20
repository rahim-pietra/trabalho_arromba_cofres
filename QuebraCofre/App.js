import { useState, useEffect } from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import {
  SafeAreaProvider,
  SafeAreaView,
} from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';
import Colors from './constants/Colors';

SplashScreen.preventAutoHideAsync();

const CHAVE_RECORDE = 'quebracofre:recorde';

export default function App() {
  const [userNumber, setUserNumber] = useState(null);
  const [nivel, setNivel] = useState(null);
  const [gameIsOver, setGameIsOver] = useState(false);
  const [roundsNumber, setRoundsNumber] = useState(0);
  const [recorde, setRecorde] = useState(null);
  const [novoRecorde, setNovoRecorde] = useState(false);

  const [fontsLoaded] = useFonts({
    'Oswald-Bold': require('./assets/fonts/Oswald-Bold.ttf'),
    'ShareTechMono-Regular': require('./assets/fonts/ShareTechMono-Regular.ttf'),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    AsyncStorage.getItem(CHAVE_RECORDE).then((valor) => {
      if (valor !== null) {
        setRecorde(parseInt(valor));
      }
    });
  }, []);

  if (!fontsLoaded) {
    return null;
  }

  function pickedNumberHandler(pickedNumber, nivelEscolhido) {
    setUserNumber(pickedNumber);
    setNivel(nivelEscolhido);
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setRoundsNumber(numberOfRounds);

    if (recorde === null || numberOfRounds < recorde) {
      setRecorde(numberOfRounds);
      setNovoRecorde(true);
      AsyncStorage.setItem(CHAVE_RECORDE, String(numberOfRounds));
    } else {
      setNovoRecorde(false);
    }
  }

  function startNewGameHandler() {
    setUserNumber(null);
    setGameIsOver(false);
    setRoundsNumber(0);
  }

  let screen = (
    <StartGameScreen onPickNumber={pickedNumberHandler} recorde={recorde} />
  );

  if (userNumber) {
    screen = (
      <GameScreen
        userNumber={userNumber}
        limiteMaximo={nivel.max}
        onGameOver={gameOverHandler}
      />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        roundsNumber={roundsNumber}
        userNumber={userNumber}
        nivel={nivel}
        recorde={recorde}
        novoRecorde={novoRecorde}
        onStartNewGame={startNewGameHandler}
      />
    );
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <LinearGradient
        colors={[Colors.fundoTopo, Colors.fundoMeio, Colors.fundoBase]}
        style={styles.rootScreen}
      >
        <ImageBackground
          source={require('./assets/images/fundo.png')}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
