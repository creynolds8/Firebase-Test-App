importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.0.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyCmfnawNtRnowSAQSVRjyIu3HjY7yxmzIw",
  authDomain: "popin-3ee5e.firebaseapp.com",
  projectId: "popin-3ee5e",
  storageBucket: "popin-3ee5e.firebasestorage.app",
  messagingSenderId: "257827606489",
  appId: "1:257827606489:web:725107f3c4e0b4ecfa93c8",
  vapidKey: 'BCUUgwUwdQsJz1piWcfwiIFMwzM9TNBfrUhL8G4a6_DJc7FvA4_43rmhYcOZsTCUsAPtppJC5KAmjyjZ4UcBIJI'
});

const PROXYURL = 'https://b203-184-66-5-236.ngrok-free.app/';

self.addEventListener("push", (event) => {
  if (event.data.notification) {
    const payload = event.data.notification.json();
    self.registration.showNotification(payload.title, {        
      body: payload.body,
      icon: "/icon.png",
    });
    console.log('push - payload:', payload);
    
  }
});

// Open link when notification is clicked
self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  console.log('notification click - event:', event);
  self.clients.openWindow(`${PROXYURL}`)
});

  // Handle background messages
  // messaging.onBackgroundMessage((payload) => {
  //   console.log("Received background message: ", payload);
  //   self.registration.showNotification(payload.notification.title, {
  //     body: payload.notification.body,
  //     icon: "/icon.png",
  //     data: { url: PROXYURL }
  //   });
  // });
