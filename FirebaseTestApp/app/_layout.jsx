import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { Helmet } from 'react-helmet';


export default function Layout() {
  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="event/[name]" options={{ title: "Event Details" }} />
      </Stack>
    </>
  );
}
