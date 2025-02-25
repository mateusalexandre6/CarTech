from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import os
from database import collection

# Inicializar o Flask
app = Flask(__name__)
CORS(app)

# Carregar o modelo treinado e os LabelEncoders
model_path = "model/carrotec_model.pkl"
mechanic_encoder_path = "model/mechanic_encoder.pkl"
service_encoder_path = "model/service_encoder.pkl"

if os.path.exists(model_path):
    model = joblib.load(model_path)
else:
    raise FileNotFoundError("O modelo treinado não foi encontrado. Execute train_model.py primeiro.")

if os.path.exists(mechanic_encoder_path) and os.path.exists(service_encoder_path):
    mechanic_encoder = joblib.load(mechanic_encoder_path)
    service_encoder = joblib.load(service_encoder_path)
else:
    raise FileNotFoundError("Os LabelEncoders não foram encontrados. Execute train_model.py primeiro.")

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "API de IA conectada ao MongoDB para previsão de tempo de serviços do CarroTec"})
@app.route("/predict-time", methods=["POST"])
def predict():
    try:
        # Receber os dados da requisição JSON
        data = request.json

        # Converter `mechanic_id` e `service_type` usando os LabelEncoders
        mechanic_id_encoded = mechanic_encoder.transform([str(data["mechanic_id"])]).item()

        if data["service_type"] in service_encoder.classes_:
            service_type_encoded = service_encoder.transform([data["service_type"]]).item()
        else:
            print(f"Novo serviço detectado: {data['service_type']}. Atribuindo valor desconhecido.")
            service_type_encoded = -1

        # Criar array de features
        features = np.array([[mechanic_id_encoded, service_type_encoded, int(data["complexity_level"])]], dtype=np.float32)

        # Fazer predição
        predicted_time = model.predict(features)[0]

        # 🔹 Converter np.float32 para float nativo antes de salvar no MongoDB
        data["estimated_time"] = float(predicted_time)


        return jsonify({"estimated_time": data["estimated_time"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 400
    
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
