import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_absolute_error
import joblib
import os
from sklearn.preprocessing import LabelEncoder
from database import collection

# Criar diretório para salvar o modelo
os.makedirs("model", exist_ok=True)

# Carregar os dados do MongoDB
data = list(collection.find({}, {"_id": 0}))
df = pd.DataFrame(data)

# Verificar se há dados suficientes
if df.empty:
    raise ValueError("Não há dados suficientes no MongoDB para treinar o modelo.")

# Converter `mechanic_id` para string e depois aplicar Label Encoding
df['mechanic_id'] = df['mechanic_id'].astype(str)

# Aplicar Label Encoding em `mechanic_id` e `service_type`
label_encoder_mechanic = LabelEncoder()
label_encoder_service = LabelEncoder()

df['mechanic_id'] = label_encoder_mechanic.fit_transform(df['mechanic_id'])
df['service_type'] = label_encoder_service.fit_transform(df['service_type'])
df['complexity_level'] = df['complexity_level'].astype(int)


X = df[['mechanic_id', 'service_type', 'complexity_level']]
y = df['actual_time']


X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)


model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5)
model.fit(X_train, y_train)


y_pred = model.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
print(f"Erro Médio Absoluto: {mae:.2f} minutos")


joblib.dump(model, "model/carrotec_model.pkl")
print("Modelo treinado e salvo com sucesso!")


joblib.dump(label_encoder_mechanic, "model/mechanic_encoder.pkl")
joblib.dump(label_encoder_service, "model/service_encoder.pkl")
