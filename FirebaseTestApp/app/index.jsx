import React, { useEffect, useState } from "react";
import { Platform, Text, View, Pressable } from "react-native";
import { requestNotificationPermission } from "../firebase/firebaseConfig.js";
import 'dotenv'
// import { getMessaging } from "firebase/messaging";

export default function App() {
  const [permissionStatus, setPermissionStatus] = useState('default')
  const [platform, setPlatform] = useState(navigator.platform);
  const [status, setStatus] = useState('Waiting...');
  const [tokenInfo, setTokenInfo] = useState('');
    

  useEffect(() => {
    requestNotificationPermission()
    .then((result) => {
      console.log('Permission result obj:', result);
      setPermissionStatus(result.permission);
      setStatus(result.status);
      setTokenInfo(result.token);
    })
    .catch(err => {
      console.error('Permission error:', err);
      setStatus('Error requesting permission')
    })
  }, []);

//   // tests for foreground notification
//   const pushNotification = () => {
//   navigator.serviceWorker.ready.then(e => {
//     e.showNotification('Test notification', {
//       body: 'this is a test notification',
//       url: 'https://b203-184-66-5-236.ngrok-free.app',
//       requireInteraction: true,
//     })
//   })
// }
//   // tests for background notification (tab / app must be active but can be in background)
//   const delayPushNotification = async () => {
//     setTimeout(() => {
//       navigator.serviceWorker.ready.then(e => {
//         e.showNotification('Test notification', {
//           body: 'this is a test notification',
//           url: 'https://b203-184-66-5-236.ngrok-free.app',
//           requireInteraction: true,
//         })
//       })
//     }, 5000)
//   }

  return (
    <View>
      <Text>Push Notifications in Expo Web!</Text>
      <Text>Permission Status: {permissionStatus}</Text>
      <Text>Platform: {platform} </Text>
      <Text>Status: {status}</Text>
      <Text>Token: {tokenInfo}</Text>
      {/* <Pressable onPress={pushNotification} style={{backgroundColor: 'lightblue', padding: 1, borderRadius: 5}}>
        <Text>Test Notification</Text>
      </Pressable>
      <Pressable onPress={delayPushNotification} style={{backgroundColor: 'lightblue', padding: 1, borderRadius: 5}}>
        <Text>Test Delay Notification</Text>
      </Pressable> */}
    </View>
  );
}
