# Use an official Python image as the base
FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y tesseract-ocr tesseract-ocr-vie tesseract-ocr-deu tesseract-ocr-fra

RUN mkdir -p /app/temp && chmod 1777 /app/temp
# Set the working directory
WORKDIR /app

# Copy the requirements file
COPY requirements.txt requirements.txt

# Install Python dependencies
RUN pip install -r requirements.txt

# Copy the rest of your application code
COPY . .

# Expose the app's port (if running Flask on port 5000)
EXPOSE 5000

# Command to run the application
# CMD ["python", "app.py"]
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]
