from google_auth_oauthlib.flow import InstalledAppFlow
import pickle

CLIENT_SECRETS_FILE = "client_secret.json"
SCOPES = ['https://www.googleapis.com/auth/gmail.send']

flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
credentials = flow.run_local_server(port=0)

with open('token.pickle', 'wb') as token_file:
    pickle.dump(credentials, token_file)

print("Token saved to 'token.pickle'")
