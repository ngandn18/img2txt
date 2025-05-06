import pytesseract

from flask import Flask, request, jsonify
from flask_cors import CORS
from PIL import Image
import pytesseract
import os

app = Flask(__name__)
CORS(app)

# Set the path to Tesseract executable (adjust based on your system)
# pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'

@app.route('/extract-text', methods=['POST'])
def extract_text():
    try:
        file = request.files['image']
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400
        
        # Save the image temporarily
        temp_path = os.path.join('temp', file.filename)
        file.save(temp_path)

        # Perform OCR
        image = Image.open(temp_path)
        extracted_text = pytesseract.image_to_string(image)

        # Clean up temporary file
        os.remove(temp_path)
        
        return jsonify({'text': extracted_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    os.makedirs('temp', exist_ok=True)
#    app.run(debug=True)
    app.run(host="0.0.0.0", port=5000, debug=True)
