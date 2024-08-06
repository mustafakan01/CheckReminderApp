import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import AddCheckScreen from './AddCheckScreen';

const Stack = createStackNavigator();

export default function App() {
  const [checkList, setCheckList] = useState([

  ]);

  const addCheck = (check) => {
    const newCheck = { id: String(checkList.length + 1), ...check };
    setCheckList([...checkList, newCheck]);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} checkList={checkList} />}
        </Stack.Screen>
        <Stack.Screen name="AddCheck">
          {(props) => <AddCheckScreen {...props} addCheck={addCheck} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
