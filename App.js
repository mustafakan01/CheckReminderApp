import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import HomeScreen from './HomeScreen';
import AddCheckScreen from './AddCheckScreen';

const Stack = createStackNavigator();

export default function App() {
  const [checkList, setCheckList] = React.useState([]);

  useEffect(() => {
    const checkDueDates = async () => {
      for (let check of checkList) {
        await scheduleNotification(check);
      }
    };
  
    checkDueDates();
  }, [checkList]);
  

  const scheduleNotification = async (check) => {
    const { dueDate } = check;
    const dueDateTime = new Date(dueDate + 'T00:00:00Z'); // Tarihi UTC'ye çevirin
  
    // Eğer çekin tarihi geçmişse veya bugünün tarihi ise hemen bildirim gönder
    if (dueDateTime < new Date()) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Çek Tarihi Geçti!",
          body: `Çek ${dueDate} tarihinde geçti.`,
        },
        trigger: { seconds: 1 }, // Hemen bildirim gönder
      });
    } else {
      const timeUntilDue = dueDateTime.getTime() - new Date().getTime();
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Çek Tarihi Yaklaşıyor!",
          body: `Çek ${dueDate} tarihinde vadesi geliyor.`,
        },
        trigger: { seconds: timeUntilDue / 1000 }, // Vade tarihine göre zamanla
      });
    }
  };
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} checkList={checkList} setCheckList={setCheckList} />}
        </Stack.Screen>
        <Stack.Screen name="AddCheck">
          {(props) => <AddCheckScreen {...props} addCheck={(check) => {
            setCheckList([...checkList, check]);
            scheduleNotification(check);
          }} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
