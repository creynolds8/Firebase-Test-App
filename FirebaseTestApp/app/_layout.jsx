import { Stack } from "expo-router";
import { useEffect } from "react";
import { Helmet } from 'react-helmet';


export default function Layout() {
  useEffect(() => {
    const ogTitle = document.createElement('meta');
    ogTitle.setAttribute('name', 'og:title');
    ogTitle.content = 'butts'
    document.getElementsByTagName('head')[0].appendChild(ogTitle);
  }, [])
  return (
    <>
      <Helmet>
      <meta name="description" content="__META_DESCRIPTION__"/>
      <meta name="og:title" content="__META_OG_TITLE__"/>
      <meta name="og:description" content="__META_OG_DESCRIPTION__"/>
      <meta name="og:image" content="__META_OG_IMAGE__"/>
      </Helmet>
      <Stack>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="event/[name]" options={{ title: "Event Details" }} />
      </Stack>
    </>
  );
}
