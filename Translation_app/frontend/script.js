// Function to detect the language of the provided text
async function detectLanguage() {
    const text = document.getElementById('detect-text').value;

    try {
        const response = await fetch('http://127.0.0.1:8000/detect_language/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text })
        });

        const data = await response.json();
        document.getElementById('detect-result').innerText = `Detected Language: ${data.language}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('detect-result').innerText = 'Error detecting language.';
    }
}

// Function to translate text to the specified language
async function translateText() {
    const text = document.getElementById('translate-text').value;
    const targetLanguage = document.getElementById('target-language').value;

    try {
        const response = await fetch('http://127.0.0.1:8000/translate/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, target_language: targetLanguage })
        });

        const data = await response.json();
        document.getElementById('translate-result').innerText = `Translated Text: ${data.translated_text}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('translate-result').innerText = 'Error translating text.';
    }
}

// Function to translate audio file
async function translateAudio() {
    const fileInput = document.getElementById('audio-file');
    const file = fileInput.files[0];
    
    if (!file) {
        document.getElementById('translated-audio').src = '';
        alert('Please select an audio file.');
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://127.0.0.1:8000/translate_audio/', {
            method: 'POST',
            body: formData
        });

        const data = await response.blob();
        const audioUrl = URL.createObjectURL(data);
        document.getElementById('translated-audio').src = audioUrl;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('translated-audio').src = '';
        alert('Error translating audio.');
    }
}

// Function to convert speech to text from audio file
async function speechToText() {
    const fileInput = document.getElementById('speech-file');
    const file = fileInput.files[0];
    
    if (!file) {
        document.getElementById('speech-result').innerText = 'Please select an audio file.';
        return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('http://127.0.0.1:8000/speech_to_text/', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        document.getElementById('speech-result').innerText = `Text: ${data.text}`;
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('speech-result').innerText = 'Error converting speech to text.';
    }
}
