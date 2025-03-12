import React, { useEffect, useState } from "react";
import { Platform, Text, View, Pressable } from "react-native";
import { requestNotificationPermission } from "../firebase/firebaseConfig.js";

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

  return (
    <View>
      <Text>Push Notifications in Expo Web!</Text>
      <Text>Permission Status: {permissionStatus}</Text>
      <Text>Platform: {platform} </Text>
      <Text>Status: {status}</Text>
      <Text>Token: {tokenInfo}</Text>
    </View>
  );
}
