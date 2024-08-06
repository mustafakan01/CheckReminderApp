import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export async function scheduleNotification(check) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Çek Hatırlatması',
      body: `${check.amount} tutarındaki çekin tarihi geldi.`,
      data: { check },
    },
    trigger: { date: new Date(check.dueDate) },
  });
}

if (Platform.OS === 'android') {
  Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
    vibrationPattern: [0, 250, 250, 250],
    lightColor: '#FF231F7C',
  });
}
