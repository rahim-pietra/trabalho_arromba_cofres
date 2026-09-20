import { View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

function GuessLogItem({ tentativa, palpite }) {
  return (
    <View style={styles.listItem}>
      <Text style={styles.itemText}>Tentativa {tentativa}</Text>
      <Text style={styles.itemText}>Senha: {palpite}</Text>
    </View>
  );
}

export default GuessLogItem;

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: 5,
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: Colors.acoClaro,
    backgroundColor: Colors.aco,
    elevation: 4,
    shadowColor: Colors.sombra,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    shadowOpacity: 0.3,
  },
  itemText: {
    fontFamily: 'ShareTechMono-Regular',
    fontSize: 16,
    color: Colors.texto,
  },
});
