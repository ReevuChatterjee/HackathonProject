import os
import joblib
from myapp.ml_models.disease_model.tokenizer_utils import symptom_tokenizer



# Paths
BASE_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(BASE_DIR, 'disease_predictor.pkl')
VECTORIZER_PATH = os.path.join(BASE_DIR, 'symptom_vectorizer.pkl')

# Load model and vectorizer
model = joblib.load(MODEL_PATH)
vectorizer = joblib.load(VECTORIZER_PATH)

def predict_disease(symptoms: list):
    cleaned_symptoms = ['_'.join(s.strip().split()) for s in symptoms]
    symptoms_str = ' '.join(cleaned_symptoms)
    symptoms_vec = vectorizer.transform([symptoms_str])

    if symptoms_vec.sum() == 0:
        return "Please consult your doctor", 0.0

    prediction = model.predict(symptoms_vec)[0]
    probability = model.predict_proba(symptoms_vec).max()
    return prediction, round(probability * 100, 2)
