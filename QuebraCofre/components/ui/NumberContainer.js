import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

export default NumberContainer;

const styles = StyleSheet.create({
  container: {
    minWidth: 140,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 28,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 3,
    borderRadius: 8,
    borderColor: Colors.led,
    backgroundColor: Colors.cartao,
    elevation: 8,
    shadowColor: Colors.sombra,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.4,
  },
  numberText: {
    fontFamily: 'ShareTechMono-Regular',
    fontSize: 64,
    color: Colors.led,
  },
});
