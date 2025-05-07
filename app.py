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
pytesseract.pytesseract.tesseract_cmd = r'/usr/bin/tesseract'

@app.route('/extract-text', methods=['POST'])
def extract_text():
    try:
        file = request.files['image']
        if not file:
            return jsonify({'error': 'No file uploaded'}), 400
        
        # Save the image temporarily
        try:
            temp_path = os.path.join('temp', file.filename)
            file.save(temp_path)
            print(f"Image saved at: {temp_path}")
        except Exception as e:
            print(f"Error saving image: {str(e)}")
            return jsonify({'error': 'Failed to save image'}), 500


        # Perform OCR
        image = Image.open(temp_path)
        extracted_text = pytesseract.image_to_string(image)

        # Clean up temporary file
        os.remove(temp_path)
        
        return jsonify({'text': extracted_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route("/")
def home():
    return "Flask Docker is working!"


if __name__ == '__main__':
    os.makedirs('temp', exist_ok=True)
#    app.run(debug=True)

    PORT = int(os.environ.get("PORT", 5000))  # Use Render's assigned PORT
    app.run(host="0.0.0.0", port=PORT, debug=True)
