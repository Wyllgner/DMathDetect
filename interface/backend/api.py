import joblib
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS  # Para permitir requisições de outros domínios, se necessário
from predict import prever_categoria

app = Flask(__name__)
CORS(app)  # Habilita CORS para todas as rotas

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        print("Dados recebidos na API:", data)  # Para depuração
        resposta = data.get("resposta")

        if not resposta:
            return jsonify({"error": "Nenhuma resposta fornecida"}), 400

        # Previsão usando o modelo
        categoria = prever_categoria(resposta)

        # Converta o valor retornado para um tipo Python nativo
        categoria = int(categoria)

        return jsonify({"categoria": categoria})
    except Exception as e:
        print("Erro na API:", e)  # Para depuração
        return jsonify({"error": str(e)}), 500
if __name__ == '__main__':
    app.run(debug=True)