# Translation App

A web application that offers language detection, text translation, audio translation, and speech-to-text functionalities. The backend is powered by FastAPI, and the frontend is built with HTML, CSS, and JavaScript.

## Project Structure

    Translation_app/
    ├── backend/
    │   ├── main.py
    │   ├── requirements.txt
    │   └── README.md
    └── frontend/
        ├── index.html
        ├── styles.css
        └── app.js

## Backend
The backend is implemented using FastAPI and provides several endpoints:

/detect_language/: Detects the language of a given text.

/translate/: Translates a given text to a specified target language.

/translate_audio/: Translates audio content to English and returns the translated audio.

/speech_to_text/: Converts speech from an audio file to text.


## Frontend
The frontend includes a simple HTML interface that allows users to interact with the backend services:

Language Detection: Detects the language of input text.

Translate Text: Translates input text to a specified target language.

Translate Audio: Uploads an audio file, translates the spoken content to English, and plays the translated audio.

Speech to Text: Uploads an audio file and converts the spoken content to text.

## Setup and Installation

### Prerequisites
Python 3.7 or higher
Node.js (if you want to run a local server for the frontend)
Backend Setup
Navigate to the backend directory:

bash
Copy code
cd backend

Install the required Python packages:

pip install -r requirements.txt
Run the FastAPI server:

uvicorn main:app --reload
The server will start at http://127.0.0.1:8000.

Frontend Setup
Navigate to the frontend directory:


cd frontend
Serve the frontend files:

You can use a simple HTTP server to serve the static files. 
Run:

python -m http.server 8001
The frontend will be accessible at http://127.0.0.1:8001.

Alternatively, if you want to open the index.html directly, just double-click it from your file explorer or open it in a browser.

Usage
Access the frontend:

Open your web browser and navigate to http://127.0.0.1:8001.


## Use the Application:

Language Detection: Enter text in the textarea and click "Detect Language."

Translate Text: Enter text in the textarea, specify the target language code, and click "Translate Text."

Translate Audio: Select an audio file and click "Translate Audio" to get the translated audio.

Speech to Text: Select an audio file and click "Speech to Text" to get the text from the audio.



##Troubleshooting
CORS Issues: If you encounter CORS errors, ensure that CORS is properly configured in main.py with the CORSMiddleware.

Missing Dependencies: If you get ModuleNotFoundError, make sure all required packages are installed. Check requirements.txt for the list of dependencies.
