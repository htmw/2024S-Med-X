# Backend Flask API Setup on Docker (Recommended)

Below are instructions on how to setup backend Docker image and run Docker container.

## Setting Up Docker Image

1. Make sure you are in flask-server directory and run the below command to create image.

    ```
    docker build -t flask-app . --no-cache
    ```

## Running the container from the image

2. Run the below command to create container.

    ```
    docker run -p 5001:5000 flask-app
    ```

# Backend Flask API Setup on Local Machine

Below are instructions on how to set up your Python environment and install necessary packages.

## Setting Up Python Virtual Environment

### Windows

1. Open Command Prompt.
2. Navigate flask-server directory using.
3. Run the following command to create a virtual environment named `env`:

    ```
    python -m venv env
    ```

4. Activate the virtual environment by running:

    ```
    .\env\Scripts\activate
    ```

### Mac

1. Open Terminal.
2. Navigate to flask-server directory.
3. Run the following command to create a virtual environment named `env`:

    ```
    python3 -m venv env
    ```

4. Activate the virtual environment by running:

    ```
    source env/bin/activate
    ```

## Installing Packages Using requirements.txt

After activating your virtual environment, you can install all the required packages using the `requirements.txt` file.

1. Ensure you're in the directory of flask-server where `requirements.txt` is located.
2. Run the following command:

    ```
    pip install -r requirements.txt
    ```

## Running Flask App

After installing required packages, use the following command to run the flask server.

```
python server.py
```

