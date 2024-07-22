document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('upload-form');
    const resultDiv = document.getElementById('result');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const fileInput = document.getElementById('file-input');
        const file = fileInput.files[0];
        if (!file) {
            resultDiv.innerText = 'Please select a file.';
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await fetch('http://127.0.0.1:8000/translate_audio/', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.blob(); // Handle binary data (audio file)

            // Create a URL for the blob object and play the audio
            const audioUrl = URL.createObjectURL(data);
            const audio = new Audio(audioUrl);
            audio.play();
            
            resultDiv.innerText = 'Translation audio is being played.';

        } catch (error) {
            console.error('Error:', error);
            resultDiv.innerText = 'An error occurred.';
        }
    });
});
