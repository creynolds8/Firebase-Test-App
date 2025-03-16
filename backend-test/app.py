from flask import Flask, render_template_string
from flask_cors import CORS

app = Flask(__name__)

psuedoEventDB = {
  'circus': {
    'event_id': 1,
    'image_link': 'https://github.com/creynolds8/Firebase-Test-App/blob/main/FirebaseTestApp/assets/images/one.png?raw=true',
    'event_name': 'Event 1',
    'event_type': 'circus',
    'date': 'yesterday',
    'location_address': '429 There Rd',
    'description': 'Described',
  },
  'coffee-chat': {
    'event_id': 2,
    'image_link': 'https://github.com/creynolds8/Firebase-Test-App/blob/main/FirebaseTestApp/assets/images/two.png?raw=true',
    'event_name': 'Event 2',
    'event_type': 'Coffee Chat',
    'date': 'Tomorrow',
    'location_address': 'The Coffee Place',
    'description': 'Coffee, Chat',
  },
  'meeting': {
    'event_id': 3,
    'image_link': 'https://github.com/creynolds8/Firebase-Test-App/blob/main/FirebaseTestApp/assets/images/three.png?raw=true',
    'event_name': 'Event 3',
    'event_type': 'Meeting',
    'date': 'Never',
    'location_address': 'Nowhere',
    'description': 'Please no.',
  },
}

frontendURL = 'http://localhost:8081'

CORS(app)
# , resource={
#   r"/*": {
#       "origins": [
#           "http://localhost:8081",
#           "https://6d4c-70-66-216-90.ngrok-free.app"
#           "*"
#       ],
#       "methods": ["GET", "POST", "OPTIONS"],
#       "allow_headers": ["Content-Type", "Accept","Authorization", "X-Requested-With"]
#   }
# }

@app.route("/")
def home():
    return "Hello, World!"

@app.route("/e/<string:name>")
def dynamic_og_preview(name):
    event = psuedoEventDB[name]

    # if request.headers.get('Accept') == 'application/json':
    #     return jsonify(event)

    title=f"{event['event_name']} Preview"
    image=event['image_link']
    description=event['description']
    original_path=f"/e/{name}"
    
    ogTemplate = f"""
      <!DOCTYPE html>
      <head>
          <meta property="og:title" content="{ title }" />
          <meta property="og:description" content="{ description }" />
          <meta property="og:image" content="{ image }" />
          <meta property="og:url" content="{ image }"
          <meta property="og:image:type" content="png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
      </head>
      <body>
      <script>window.location = "{frontendURL}{original_path}";</script>

      </body>
      </html>
    """
    return(render_template_string(ogTemplate))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=1632, debug=True)
