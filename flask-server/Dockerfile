# Use Python 3.9 slim version
FROM python:3.9-slim-buster

# Set working directory
WORKDIR /app

# Copy current directory to container
COPY . /app

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Expose port
EXPOSE 5000

# Run Flask app
CMD ["python", "server.py"]
