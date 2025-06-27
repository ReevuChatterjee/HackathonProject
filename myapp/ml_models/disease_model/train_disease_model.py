import os
import pandas as pd
import joblib

from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.calibration import CalibratedClassifierCV
from sklearn.metrics import accuracy_score, classification_report
from myapp.ml_models.disease_model.tokenizer_utils import symptom_tokenizer


# Define tokenizer here so it's known when saving vectorizer

# Set up paths
BASE_DIR = os.path.dirname(__file__)
DATA_PATH = os.path.join(BASE_DIR, 'processed_disease_symptoms.xlsx')
MODEL_PATH = os.path.join(BASE_DIR, 'disease_predictor.pkl')
VECTORIZER_PATH = os.path.join(BASE_DIR, 'symptom_vectorizer.pkl')

# Load and clean data
df = pd.read_excel(DATA_PATH)
disease_col = df.columns[0]
symptom_cols = df.columns[1:]

df['All_Symptoms'] = df[symptom_cols].astype(str).apply(
    lambda row: ', '.join(sym.strip() for sym in row if sym.lower() != 'nan' and sym != ''),
    axis=1
)

df['Cleaned_Symptoms'] = (
    df['All_Symptoms']
    .str.replace(r'\s*,\s*', ',', regex=True)
    .str.replace(r'\s+', '_', regex=True)
    .str.split(',')
    .apply(lambda x: [s.strip() for s in x])
    .apply(lambda x: ' '.join(x))
)

X = df['Cleaned_Symptoms']
y = df[disease_col]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

# Vectorization
vectorizer = CountVectorizer(tokenizer=symptom_tokenizer, binary=True, lowercase=False)
X_train_vec = vectorizer.fit_transform(X_train)
X_test_vec = vectorizer.transform(X_test)

# Model training with GridSearch
param_grid = {
    'C': [0.01, 0.1, 1, 10],
    'penalty': ['l1', 'l2'],
    'class_weight': [None, 'balanced']
}

grid_search = GridSearchCV(
    LogisticRegression(solver='liblinear'),
    param_grid=param_grid,
    scoring='f1_macro',
    cv=5,
    n_jobs=-1
)

grid_search.fit(X_train_vec, y_train)
best_model = grid_search.best_estimator_

# Calibrate model
calibrated_model = CalibratedClassifierCV(best_model, cv=5, method='sigmoid')
calibrated_model.fit(X_train_vec, y_train)

# Evaluation (optional print)
y_pred = calibrated_model.predict(X_test_vec)
print("Accuracy:", accuracy_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

# Save model and vectorizer
joblib.dump(calibrated_model, MODEL_PATH)
joblib.dump(vectorizer, VECTORIZER_PATH)

print("✅ Model and vectorizer saved.")
