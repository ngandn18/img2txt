# Use an official Python image as the base
FROM python:3.9-slim

# Install system dependencies
RUN apt-get update && apt-get install -y tesseract-ocr

# Set the working directory
RUN mkdir -p /app/temp && chmod -R 777 /app/temp
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
