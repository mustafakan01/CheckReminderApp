import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

export default function HomeScreen({ navigation, checkList }) {
  const getCheckStyle = (dueDate) => {
    const checkDate = new Date(dueDate);
    const today = new Date();

    if (checkDate < today) {
      return styles.overdue;
    } else if ((checkDate - today) / (1000 * 60 * 60 * 24) <= 3) {
      return styles.dueSoon;
    } else {
      return styles.normal;
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Çek Ekle" onPress={() => navigation.navigate('AddCheck')} />
      <FlatList
        data={checkList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.checkItem, getCheckStyle(item.dueDate)]}>
            <Text>Çek Tutarı: {item.amount.toLocaleString('tr-TR')}</Text>
            <Text>Gün: {item.dueDate}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkItem: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  normal: {
    backgroundColor: '#fff',
  },
  dueSoon: {
    backgroundColor: '#ffeb3b',
  },
  overdue: {
    backgroundColor: '#f44336',
  },
});
