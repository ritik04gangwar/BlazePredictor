from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

app = Flask(__name__)

# Load the trained model (ensure the model file is in the correct format)
model = load_model('forest_fire_model.keras')

# Initialize the scaler (ensure it's the same as used during training)
scaler = StandardScaler()

@app.route('/predict', methods=['POST'])
def predict():
    # Get JSON data from the request
    data = request.get_json(force=True)
    
    # Convert JSON data to DataFrame (ensure the data structure matches your model's input)
    df = pd.DataFrame(data)
    
    # Extract features and apply the same preprocessing as during training
    X = df.values
    X = scaler.transform(X)  # Apply scaling (ensure it's fitted with training data)
    
    # Make predictions using the model
    predictions = model.predict(X)
    
    # Return predictions as JSON response
    return jsonify(predictions.tolist())

if __name__ == '__main__':
    app.run(port=5000)
