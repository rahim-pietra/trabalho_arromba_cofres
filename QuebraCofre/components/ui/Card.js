import { View, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export default Card;

const styles = StyleSheet.create({
  card: {
    alignSelf: 'stretch',
    alignItems: 'center',
    marginHorizontal: 24,
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.aco,
    backgroundColor: Colors.cartao,
    elevation: 8,
    shadowColor: Colors.sombra,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    shadowOpacity: 0.4,
  },
});
