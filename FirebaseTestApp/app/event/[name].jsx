import { useEffect, useState } from "react";
import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function Event() {
  
  const { name } = useLocalSearchParams();  
  const [loading, setLoading] = useState(true);
  const [event, setEvent] = useState({
    event_id: null,
    image_link: '',
    event_name: '',
    event_type: '',
    date: '',
    location_address: '',
    description: '',
  });

  useEffect(() => {
    // request to backend with api prefix to get event data for populating frontend
    fetch(`https://a90a-70-66-216-90.ngrok-free.app/api/e/${name}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'ngrok-skip-browser-warning':'skip' // needed for local development only
      },
      mode: 'cors',
    })
    .then(res => {
      // format fetch response
      return res.json()})
    .then(data => {      
      // populate response into frontend state
      setEvent({
        event_id: data.event_id,
        image_link: data.image_link,
        event_name: data.event_name,
        event_type: data.event_type,
        date: data.date,
        location_address: data.location_address,
        description: data.description,
      });      
    })
    .catch(err => {
      console.error('Fetch error:', err);  
    })
  },[name]);

  useEffect(() => {
    // ensure event has been set then search and manipulate HTML
    if (event.event_name) {
      // find placeholder values and set dynamic values
      document.title = event.event_name;
      const metaTags = document.querySelectorAll('meta[content="___PLACEHOLDER___"]');
      metaTags.forEach(tag => {        
        if (tag.getAttribute('property')?.includes('og:')) {
          if (tag.getAttribute('property').includes('description')) {
            tag.content = event.description;
          }
          if (tag.getAttribute('property').includes('title')) {
            tag.content = event.event_name;
          }
          if (tag.getAttribute('property').includes('image')) {
            tag.content = event.image_link
          }
        }
      });
      // page is ready and conditional rendering state can be switched
      setLoading(false);
    };
  },[event]);

    
  return (
    <>
      <Text>Event Page</Text>
      {loading ? 
        <ActivityIndicator size='large' />
      :
        <Text>{event.description}</Text>
      }
    </>
  );
};