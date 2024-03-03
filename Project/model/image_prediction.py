from flask import Flask, request, jsonify
import requests
from flask_cors import CORS
from io import BytesIO
from PIL import Image
import numpy as np
import pydicom
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
import pydicom

# Load the model
model = load_model('dicom_images.keras')

findings = {14: 'No finding', 3: 'Cardiomegaly', 0: 'Aortic enlargement',
            11: 'Pleural thickening', 5: 'ILD', 8: 'Nodule/Mass', 13: 'Pulmonary fibrosis',
            7: 'Lung Opacity', 1: 'Atelectasis', 9: 'Other lesion', 6: 'Infiltration', 10: 'Pleural effusion',
            2: 'Calcification', 4: 'Consolidation', 12: 'Pneumothorax'}

def predict_and_plot(model, image_path):
    # Load and preprocess the image
    try:
        dicom_data = pydicom.dcmread(image_path)

        # Check if the transfer syntax UID indicates JPEG 2000 Lossless compression
        if dicom_data.file_meta.TransferSyntaxUID == pydicom.uid.JPEG2000Lossless:
            dicom_data.BitsStored = 16

        # Access pixel data and verify actual bit depth
        pixel_data = dicom_data.pixel_array
        actual_bit_depth = pixel_data.dtype.itemsize * 8

        # Use pydicom's internal scaling if needed
        if actual_bit_depth != dicom_data.BitsStored:
            normalized_data = pixel_data * (2**4 - 1) / (2**actual_bit_depth - 1)
        else:
            normalized_data = pixel_data

        # Convert normalized_data to uint8 if necessary
        normalized_data_uint8 = (normalized_data * 255).astype(np.uint8)

        # Create PIL Image from normalized_data_uint8
        image_uint8 = Image.fromarray(normalized_data_uint8)

        # Resize the image while preserving data type
        new_width, new_height = 224, 224
        resized_image_uint8 = image_uint8.resize((new_width, new_height), resample=Image.BICUBIC)

        # Convert resized_image_uint8 back to float32 for further processing if necessary
        resized_data_float32 = np.array(resized_image_uint8, dtype=np.float32) / 255.0

        # Convert resized_data_float32 to PIL Image
        resized_image_pil = Image.fromarray((resized_data_float32 * 255).astype(np.uint8))

        # Ensure the image is in RGB mode
        if resized_image_pil.mode != 'RGB':
            resized_image_pil = resized_image_pil.convert('RGB')

        # Convert image to numpy array and expand dimensions
        img_array = np.expand_dims(np.array(resized_image_pil), axis=0)

        # Make prediction
        prediction = model.predict(img_array)
        predicted_class_index = np.argmax(prediction)
        # predicted_class_label = class_labels[predicted_class_index]
        finding = findings[predicted_class_index]

        return finding

    except Exception as e:
        print(f"Error reading DICOM file '{image_path}': {e}")

app = Flask(__name__)
CORS(app)

@app.route('/predict', methods=['GET', 'OPTIONS'])
def predict():

  try:
    # Get image URL from request arguments
    image_url = request.args.get('image_url')
    # image_url = 'https://firebasestorage.googleapis.com/v0/b/spendwise-6b61a.appspot.com/o/dicom_images%2Fffe07f4f98a7242b460c8d3a8e46832c.dicom?alt=media&token=dbf46143-2cf4-498a-b561-338bec882a22'
    # Download DICOM image
    print("Image URL:", image_url)
    response = requests.get(image_url)

    # Check if image download is successful
    if response.status_code == 200:
        with open('xray_image.dicom', 'wb') as f:
            f.write(response.content)
        print("Image downloaded successfully!")
    else:
        print("Failed to download image. Status code:", response.status_code)
        return jsonify({'error': 'Failed to download image'}), 500

    # Call prediction function
    prediction = predict_and_plot(model, 'xray_image.dicom')
    print("Prediction:", prediction)

    # Return prediction result
    return jsonify({'prediction': prediction}), 200

  except Exception as e:
    print("An error occurred:", str(e))
    return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
