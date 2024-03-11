from io import BytesIO
from PIL import Image
import numpy as np
import pydicom

findings = {14: 'No finding', 3: 'Cardiomegaly', 0: 'Aortic enlargement',
            11: 'Pleural thickening', 5: 'ILD', 8: 'Nodule/Mass', 13: 'Pulmonary fibrosis',
            7: 'Lung Opacity', 1: 'Atelectasis', 9: 'Other lesion', 6: 'Infiltration', 10: 'Pleural effusion',
            2: 'Calcification', 4: 'Consolidation', 12: 'Pneumothorax'}


def get_finding(model, image_path):
    """Predicts the findings for a chest X-ray image.

    Args:
        model: The pre-trained Keras model for prediction.
        image_path: The path to the image file (DICOM or PNG or JPG).

    Returns:
        The predicted finding as a string.
    """

    try:
        # Check the file extension to determine image format
        if image_path.lower().endswith(".dicom"):
            # Load DICOM image using pydicom
            dicom_data = pydicom.dcmread(image_path)
            # Preprocess DICOM image as before (code remains unchanged)

        elif image_path.lower().endswith(".png"):
            # Open PNG image using PIL
            with open(image_path, 'rb') as f:
                image = Image.open(BytesIO(f.read()))

            # Preprocess PNG image:
            new_width, new_height = 224, 224
            resized_image = image.resize((new_width, new_height), resample=Image.BICUBIC)
            if resized_image.mode != 'RGB':
                resized_image = resized_image.convert('RGB')
            resized_data = np.array(resized_image) / 255.0

            # Convert to uint8
            resized_data_uint8 = (resized_data * 255).astype(np.uint8)

        else:
            raise ValueError(f"Unsupported image format: {image_path}")

        # Convert image data to a NumPy array and expand dimensions
        img_array = np.expand_dims(resized_data_uint8, axis=0)

        # Make prediction
        prediction = model.predict(img_array)
        predicted_class_index = np.argmax(prediction)
        finding = findings[predicted_class_index]

        return finding

    except Exception as e:
        print(f"Error reading image '{image_path}': {e}")
        return None