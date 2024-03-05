# Use the official Python image from the Docker Hub
FROM python:3.9-slim-buster

COPY requirements.txt app/requirements.txt

WORKDIR /app

RUN pip install -r requirements.txt

COPY . /app

# Expose the port the app runs on
EXPOSE 5000

# Define the command to run the Flask app when the container starts
CMD ["python", "server.py"]
