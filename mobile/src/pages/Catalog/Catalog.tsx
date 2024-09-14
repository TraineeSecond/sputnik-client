import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Catalog = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Catalog</Text>
    </View>
  );
};

export default Catalog;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  text: {
    fontSize: 24,
    color: 'gray',
  },
});
