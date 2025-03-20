from flask import Flask, render_template_string, make_response, request # type: ignore
from flask_cors import CORS # type: ignore

app = Flask(__name__)

CORS(app)

psuedoEventDB = {
  'circus': {
    'event_id': 1,
    'image_link': 'https://github.com/creynolds8/Firebase-Test-App/blob/main/backend-test/public/images/one.png?raw=true',
    'event_name': 'Event 1',
    'event_type': 'circus',
    'date': 'yesterday',
    'location_address': '429 There Rd',
    'description': 'Described',
  },
  'coffee-chat': {
    'event_id': 2,
    'image_link': 'https://github.com/creynolds8/Firebase-Test-App/blob/main/backend-test/public/images/two.png?raw=true',
    'event_name': 'Event 2',
    'event_type': 'Coffee Chat',
    'date': 'Tomorrow',
    'location_address': 'The Coffee Place',
    'description': 'Coffee, Chat',
  },
  'meeting': {
    'event_id': 3,
    'image_link': 'https://github.com/creynolds8/Firebase-Test-App/blob/main/backend-test/public/images/three.png?raw=true',
    'event_name': 'Event 3',
    'event_type': 'Meeting',
    'date': 'Never',
    'location_address': 'Nowhere',
    'description': 'Please no.',
  },
}

frontendURL = 'http://localhost:8081'

SCRAPER_AGENTS = [
    # Facebook
    "facebookexternalhit", "Facebot",
    # Twitter
    "Twitterbot",
    # LinkedIn
    "LinkedInBot",
    # Slack
    "Slackbot-LinkExpanding", "Slackbot",
    # WhatsApp
    "WhatsApp",
    # Discord
    "Discordbot",
    # Telegram
    "TelegramBot",
    # Pinterest
    "Pinterestbot",
    # Reddit
    "redditbot",
    # Microsoft Teams
    "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; MSTEAMS)",
    # Apple iMessage
    "Applebot",
    # Google Chat (formerly Hangouts)
    "Google-Apps-Script",
    # Viber
    "Viber",
    # Skype
    "SkypeUriPreview",
    # Instagram
    "Instagram",
    # Generic bot catch-all (optional, use with caution)
    "bot", "crawler", "spider", "python-requests", "okhttp"
]

def get_user_agent():
    user_agent = request.headers.get('User-Agent')
    print(user_agent)
    if user_agent:
        user_agent.lower()
        return any(agent.lower() in user_agent for agent in SCRAPER_AGENTS)
    return False

@app.route("/")
def home():
    return "Hello, World!"

@app.route('/api/e/<string:name>')
def dynamic_event_data(name):
  event = psuedoEventDB[name]
  response = make_response(event)
  response.headers['Content-Type'] = 'application/json'
  return response

@app.route("/e/<string:name>")
def dynamic_og_preview(name):
    print(get_user_agent())
    event = psuedoEventDB[name]

    title=f"{event['event_name']} Preview"
    image=event['image_link']
    description=event['description']
    original_path=f"/event/{name}"

    ogTemplate = f"""<!DOCTYPE html>
    <html prefix="og: http://ogp.me/ns#">
      <head>
          <meta property="og:url" content="{ frontendURL }{ original_path }" />
          <meta property="og:type" content="website" />
          <meta property="og:title" content="{ title }" />
          <meta property="og:description" content="{ description }" />
          <meta property="og:image" content="{ image }" />
          <meta property="og:image:type" content="png" />
          <meta property="og:image:width" content="512" />
          <meta property="og:image:height" content="512" />
      </head>
      <body>
      <script>window.location = "{frontendURL}{original_path}";</script>
      </body>
    </html>"""
    response = make_response(render_template_string(ogTemplate))
    response.headers['Content-Type'] = 'text/html; charset=utf-8'
    return response
    
  
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=1632, debug=True)
