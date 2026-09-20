import { Text, StyleSheet } from 'react-native';

import Colors from '../../constants/Colors';

function Title({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export default Title;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Oswald-Bold',
    fontSize: 26,
    color: Colors.latao,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderWidth: 2,
    borderColor: Colors.latao,
    paddingVertical: 10,
    paddingHorizontal: 16,
    maxWidth: '85%',
  },
});
