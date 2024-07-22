from fastapi import FastAPI, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import speech_recognition as sr
from gtts import gTTS
from io import BytesIO
from starlette.responses import StreamingResponse
from googletrans import Translator

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins, change as needed
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Static files
app.mount("/static", StaticFiles(directory="frontend"), name="static")

translator = Translator()

class TranslationRequest(BaseModel):
    text: str
    target_language: str

class LanguageDetectionRequest(BaseModel):
    text: str

@app.post("/detect_language/")
async def detect_language(request: LanguageDetectionRequest):
    try:
        lang = translator.detect(request.text).lang
        return {"language": lang}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error detecting language: {str(e)}")

@app.post("/translate/")
async def translate(request: TranslationRequest):
    detected_language = translator.detect(request.text).lang
    translated = translator.translate(request.text, src=detected_language, dest=request.target_language)
    return {"translated_text": translated.text}

@app.post("/translate_audio/")
async def translate_audio(file: UploadFile):
    recognizer = sr.Recognizer()
    audio_data = await file.read()
    audio_file = BytesIO(audio_data)
    
    try:
        text = recognizer.recognize_google(audio_file)
    except sr.UnknownValueError:
        raise HTTPException(status_code=400, detail="Unable to recognize speech")
    
    detected_language = translator.detect(text).lang
    translated = translator.translate(text, src=detected_language, dest="en")
    tts = gTTS(translated.text)
    audio_io = BytesIO()
    tts.write_to_fp(audio_io)
    audio_io.seek(0)
    
    return StreamingResponse(audio_io, media_type="audio/mpeg")

@app.post("/speech_to_text/")
async def speech_to_text(file: UploadFile):
    recognizer = sr.Recognizer()
    audio_data = await file.read()
    audio_file = BytesIO(audio_data)
    
    try:
        text = recognizer.recognize_google(audio_file)
    except sr.UnknownValueError:
        raise HTTPException(status_code=400, detail="Unable to recognize speech")
    
    return {"text": text}
