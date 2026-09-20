import { View, Text, Pressable, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

function PrimaryButton({ children, onPress, style }) {
  return (
    <View style={styles.buttonOuterContainer}>
      <Pressable
        style={({ pressed }) =>
          pressed
            ? [styles.buttonInnerContainer, style, styles.pressed]
            : [styles.buttonInnerContainer, style]
        }
        onPress={onPress}
        android_ripple={{ color: Colors.lataoEscuro }}
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 6,
    margin: 4,
    overflow: 'hidden',
  },
  buttonInnerContainer: {
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: Colors.latao,
  },
  buttonText: {
    fontFamily: 'Oswald-Bold',
    fontSize: 16,
    letterSpacing: 1,
    textAlign: 'center',
    textTransform: 'uppercase',
    color: Colors.fundoTopo,
  },
  pressed: {
    opacity: 0.7,
  },
});
