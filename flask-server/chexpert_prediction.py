import cv2 as cv
import numpy as np

def get_finding(model, img_dir):
  img = cv.imread(img_dir, cv.IMREAD_GRAYSCALE)
  img = cv.cvtColor(img, cv.COLOR_GRAY2RGB)
  img = cv.resize(img, (224, 224), interpolation=cv.INTER_AREA)

  pred = model.predict(np.expand_dims(img, axis=0))[0]

  predictions = {
    'Atelectasis': float(pred[0]),
    'Cardiomegaly':float(pred[1]),
    'Consolidation':float(pred[2]),
    'Edema':float(pred[3]),
    'Enlarged Cardiomediastinum':float(pred[4]),
    'Fracture':float(pred[5]),
    'Lung Lesion':float(pred[6]),
    'Lung Opacity':float(pred[7]),
    'No Finding':float(pred[8]),
    'Pleural Effusion':float(pred[9]),
    'Pleural Other':float(pred[10]),
    'Pneumonia':float(pred[11]),
    'Pneumothorax':float(pred[12]),
    'Support Devices':float(pred[13]),
  }

  # Sort the predictions based on probability
  sorted_predictions = sorted(predictions.items(), key=lambda x: x[1], reverse=True)

  # Extract the top two diagnoses
  top_diagnosis = sorted_predictions[0][0]
  second_diagnosis = sorted_predictions[1]
  return {'top_diagnosis':top_diagnosis, 'predictions': predictions}
