import { useEffect, useState } from "react";
import { Image, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";

export default function Event() {
  const [event, setEvent] = useState({
    event_id: null,
    image_link: '',
    event_name: '',
    event_type: '',
    date: '',
    location_address: '',
    description: '',
  });

  const [loading, setLoading] = useState(true);
  const { name } = useLocalSearchParams();
  
  useEffect(() => {
    fetch(`http://localhost:3000/event/${name}`)
    .then(res => {
      setLoading(false)
      return data = res.json()
      .then(data => {
        
        setEvent({
          event_id: data.event_name,
          image_link: data.image_link,
          event_name: data.event_name,
          event_type: data.event_type,
          date: data.date,
          location_address: data.location_address,
          description: data.description,
        })
        document.createElement('meta', {name: 'description'}).setAttribute("content", event.description);
      })
    })
    .catch(err => {
      console.error('Fetch error:', err);  
    })
    
  }, [name])
  
  
  
  
  console.log('event:', event)
  return (
    <>
    <Link href="url/event/:name">
      <Text>Link</Text>
      <Image source={event.image_link}/>
    </Link>
      <Text>Event Page</Text>
      {loading ? 
        <ActivityIndicator size='large' />
      :
        <Text>{event.description}</Text>
      }
    </>
  );
};