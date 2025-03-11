import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyCmfnawNtRnowSAQSVRjyIu3HjY7yxmzIw",
  authDomain: "popin-3ee5e.firebaseapp.com",
  projectId: "popin-3ee5e",
  storageBucket: "popin-3ee5e.firebasestorage.app",
  messagingSenderId: "257827606489",
  appId: "1:257827606489:web:725107f3c4e0b4ecfa93c8",
  vapidKey: 'BCUUgwUwdQsJz1piWcfwiIFMwzM9TNBfrUhL8G4a6_DJc7FvA4_43rmhYcOZsTCUsAPtppJC5KAmjyjZ4UcBIJI'
};

const iOSDevices = [
  'iPhone',
  'iPad',
  'iPod'
];

const app = initializeApp(firebaseConfig);

let messaging;

if (typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator) {
  messaging = getMessaging(app);
} else {
  console.warn('Firebase not supported');
}

export { messaging };

export async function requestNotificationPermission() {
  if (!messaging) {
    console.warn('Firebase messaging not available');
  }
  if (iOSDevices.includes(navigator.platform)) {
    return {
      messaging: null,
      permission: false,
      status: 'Disabled by iOS',
      token: null
    };
  };
  const permission = await Notification.requestPermission();
  if (permission !== 'granted') {
    console.warn('Permission denied');
    return {
      messaging: null,
      permission: false,
      status: 'Notification permission blocked',
      token: null
    };
  };
  try {
    const token = await getToken(messaging, { vapidKey: firebaseConfig.vapidKey });
    console.log("FCM Token:", token);
    return {
      messaging,
      permission,
      status: 'Notifications ready',
      token
    };
  } catch (e) {
    console.error('Error getting Firebase token', e);
    return {
      messaging,
      permission,
      status: 'Error getting FCM token',
      token
    };
  };
};
