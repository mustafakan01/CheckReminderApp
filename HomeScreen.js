import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import EditCheckModal from './EditCheckModal'; // Bu satırın doğru olduğundan emin olun

export default function HomeScreen({ navigation, checkList, setCheckList }) {
  const [selectedCheck, setSelectedCheck] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

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

  const formatDate = (date) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Intl.DateTimeFormat('tr-TR', options).format(new Date(date));
  };

  const deleteCheck = (id) => {
    Alert.alert(
      "Çeki Sil",
      "Bu çeki silmek istediğinizden emin misiniz?",
      [
        {
          text: "İptal",
          style: "cancel"
        },
        {
          text: "Evet", onPress: () => {
            setCheckList(checkList.filter(check => check.id !== id));
          }
        }
      ]
    );
  };

  const editCheck = (check) => {
    setSelectedCheck(check);
    setIsModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCheck')}>
        <Text style={styles.addButtonText}>Çek Ekle</Text>
      </TouchableOpacity>
      <FlatList
        data={checkList}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.checkItem, getCheckStyle(item.dueDate)]}>
            <Text style={styles.checkAmount}>Çek Tutarı: {parseFloat(item.amount).toLocaleString('tr-TR')}</Text>
            <Text style={styles.checkDate}>Gün: {formatDate(item.dueDate)}</Text>
            <Text style={styles.companyName}>Şirket: {item.companyName}</Text>
            <View style={styles.buttonContainer}>
              <Button title="Düzenle" onPress={() => editCheck(item)} />
              <Button title="Sil" onPress={() => deleteCheck(item.id)} color="red" />
            </View>
          </View>
        )}
      />
      {selectedCheck && (
        <EditCheckModal
          isVisible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          check={selectedCheck}
          onSave={(updatedCheck) => {
            setCheckList(checkList.map(check => check.id === updatedCheck.id ? updatedCheck : check));
            setIsModalVisible(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  checkItem: {
    padding: 15,
    marginVertical: 8,
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
  checkAmount: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkDate: {
    fontSize: 16,
    color: '#555',
  },
  companyName: {
    fontSize: 16,
    color: '#555',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
