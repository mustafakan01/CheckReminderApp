import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AddCheckScreen({ navigation, addCheck }) {
  const [amount, setAmount] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const [companyName, setCompanyName] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleAddCheck = () => {
    if (amount && dueDate && companyName) {
      const formattedAmount = parseFloat(amount.replace(/\./g, ''));
      addCheck({ amount: formattedAmount, dueDate: dueDate.toISOString().split('T')[0], companyName });
      navigation.goBack();
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(Platform.OS === 'ios');
    setDueDate(currentDate);
  };

  const formatAmount = (value) => {
    let cleanValue = value.replace(/\D/g, '');
    let formattedValue = cleanValue.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return formattedValue;
  };

  return (
    <View style={styles.container}>
      <Text>Çek Tutarı:</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={(value) => setAmount(formatAmount(value))}
        keyboardType="numeric"
      />
      <Text>Şirket Adı:</Text>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={setCompanyName}
      />
      <Text>Vade Tarihi:</Text>
      <Button onPress={() => setShowDatePicker(true)} title={dueDate.toDateString()} />
      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <Button title="Çek Ekle" onPress={handleAddCheck} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginVertical: 10,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});
