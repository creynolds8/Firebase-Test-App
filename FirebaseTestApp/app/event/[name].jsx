import { useEffect, useState } from "react";
import { Image, Text } from "react-native";
import { Link, useLocalSearchParams } from "expo-router";
import { ActivityIndicator } from "react-native";
import { Helmet } from 'react-helmet';

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
  
  const ogTags = {
    description: '',
    title: '',
    image: '',
  }

 fetch(`http://localhost:3000/event/${name}`)
 .then(res => {
      setLoading(false)
      console.log(res);
      return res;
      })
      .then(data => { 
        // setEvent({
        //   event_id: data.event_name,
        //   image_link: data.image_link,
        //   event_name: data.event_name,
        //   event_type: data.event_type,
        //   date: data.date,
        //   location_address: data.location_address,
        //   description: data.description,
        // })
        const metaTags = document.querySelectorAll('meta');
        console.log(metaTags);
        metaTags.forEach(tag => {
          if (tag.getAttribute('property')?.includes('og:')) {
            if (tag.getAttribute('property').includes('description')) {
              ogTags.description = tag.content;
            }
            if (tag.getAttribute('property').includes('title')) {
              ogTags.title = tag.content;
            }
            if (tag.getAttribute('property').includes('image')) {
              ogTags.image = tag.content;
            }
          }
        })
        console.log(ogTags);         
      })
    .catch(err => {
      console.error('Fetch error:', err);  
    })

  useEffect(() => {
  }, [name])
    
  return (
    <>
    {/* <Helmet>
      <title>{event.title}</title>
      <meta name="description" content={event.description} />
      <meta property="og:image" content={event.image_link} />
    </Helmet> */}
      <Text>Event Page</Text>
      {loading ? 
        <ActivityIndicator size='large' />
      :
        <Text>{event.description}</Text>
      }
    </>
  );
};