import { useState, useEffect } from 'react';
import { View, Image, Text, Animated, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAudioPlayer } from 'expo-audio';
import * as Haptics from 'expo-haptics';

import Title from '../components/ui/Title';
import PrimaryButton from '../components/game/PrimaryButton';
import Colors from '../constants/Colors';

function GameOverScreen({
  roundsNumber,
  userNumber,
  nivel,
  recorde,
  novoRecorde,
  onStartNewGame,
}) {
  const player = useAudioPlayer(require('../assets/sounds/cofre.wav'));
  const [escala] = useState(() => new Animated.Value(0));
  const [subida] = useState(() => new Animated.Value(40));
  const [opacidade] = useState(() => new Animated.Value(0));

  useEffect(() => {
    player.play();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, [player]);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(escala, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(subida, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.timing(opacidade, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, [escala, subida, opacidade]);

  let estrelas = 1;
  if (roundsNumber <= nivel.tresEstrelas) {
    estrelas = 3;
  } else if (roundsNumber <= nivel.duasEstrelas) {
    estrelas = 2;
  }

  return (
    <View style={styles.screen}>
      <Title>Cofre aberto</Title>
      <Animated.View
        style={[styles.imageContainer, { transform: [{ scale: escala }] }]}
      >
        <Image
          style={styles.image}
          source={require('../assets/images/cofre.png')}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.content,
          { opacity: opacidade, transform: [{ translateY: subida }] },
        ]}
      >
        <Text style={styles.summaryText}>
          O robô abriu o cofre em{' '}
          <Text style={styles.highlight}>{roundsNumber}</Text> tentativas. A
          senha era <Text style={styles.highlight}>{userNumber}</Text>.
        </Text>
        <View style={styles.starsContainer}>
          {[1, 2, 3].map((posicao) => (
            <Ionicons
              key={posicao}
              name={posicao <= estrelas ? 'star' : 'star-outline'}
              size={36}
              color={Colors.latao}
            />
          ))}
        </View>
        <Text style={novoRecorde ? styles.newRecordText : styles.recordText}>
          {novoRecorde
            ? 'Novo recorde!'
            : 'Recorde: ' + recorde + ' tentativas'}
        </Text>
        <View style={styles.buttonContainer}>
          <PrimaryButton onPress={onStartNewGame}>
            <Ionicons name="refresh" size={16} color={Colors.fundoTopo} /> Novo
            cofre
          </PrimaryButton>
        </View>
      </Animated.View>
    </View>
  );
}

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
    marginTop: 40,
  },
  imageContainer: {
    width: 240,
    height: 240,
    marginVertical: 32,
    borderRadius: 120,
    borderWidth: 3,
    borderColor: Colors.latao,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  summaryText: {
    fontFamily: 'ShareTechMono-Regular',
    fontSize: 20,
    textAlign: 'center',
    color: Colors.texto,
  },
  highlight: {
    fontFamily: 'Oswald-Bold',
    color: Colors.latao,
  },
  starsContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  recordText: {
    marginTop: 16,
    fontFamily: 'ShareTechMono-Regular',
    fontSize: 16,
    color: Colors.textoSuave,
  },
  newRecordText: {
    marginTop: 16,
    fontFamily: 'Oswald-Bold',
    fontSize: 18,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: Colors.led,
  },
  buttonContainer: {
    marginTop: 24,
    width: 200,
  },
});
