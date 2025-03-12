const express = require('express')

const app = express();
const PORT = 3000;

const psuedoEventDB = {
  'circus': {
    event_id: 1,
    image_link: 'https://github.com/creynolds8/Firebase-Test-App/blob/main/FirebaseTestApp/assets/images/one.png?raw=true',
    event_name: 'Event 1',
    event_type: 'circus',
    date: 'yesterday',
    location_address: '429 There Rd',
    description: 'Described',
  },
  'coffee-chat': {
    event_id: 2,
    image_link: 'https://github.com/creynolds8/Firebase-Test-App/blob/main/FirebaseTestApp/assets/images/two.png?raw=true',
    event_name: 'Event 2',
    event_type: 'Coffee Chat',
    date: 'Tomorrow',
    location_address: 'The Coffee Place',
    description: 'Coffee, Chat',
  },
  'meeting': {
    event_id: 3,
    image_link: 'https://github.com/creynolds8/Firebase-Test-App/blob/main/FirebaseTestApp/assets/images/three.png?raw=true',
    event_name: 'Event 3',
    event_type: 'Meeting',
    date: 'Never',
    location_address: 'Nowhere',
    description: 'Please no.',
  },
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(function(req,res,next) {
  var
    ua = req.headers['user-agent'];
  if (/^(facebookexternalhit)|(Twitterbot)|(Pinterest)/gi.test(ua)) {
    console.log(ua,' is a bot');
  } 
 next();
});

app.get('/event/:name', (req, res) => {
  const userAgent = req.headers['user-agent'].toLowerCase();
  console.log('userAgent:', userAgent);
  
  const { name } = req.params;
  console.log('name:', name);
  
  const event = psuedoEventDB[name];
  console.log('event:', event);
  
  if (!event) {
    console.error('Event not found');
    
    return res.status(404).send('Event not found.')
  }
  const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta property="og:title" content=${event.event_name} />
        <meta property="og:description" content=${event.description} />
        <meta property="og:image" content=${event.image_link} />
        <title>${event.event_name}</title>
      </head>
      <body></body>
      </html>
    `
  return res.send(event);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port: ${PORT}`);
  
})

