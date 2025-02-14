import joblib
import pandas as pd

model_path = "discalculia_decision_tree_model.pkl"
clf = joblib.load(model_path)
print(f"Modelo carregado de: {model_path}")

features = [
    "Senso_Numérico_Acertos", "Tempo_Senso_Numérico",
    "Cálculo_Simples_Acertos", "Tempo_Cálculo_Simples",
    "Compreensão_Tempo_Espaço_Acertos", "Tempo_Compreensão_Tempo_Espaço",
    "Reconhecimento_Padrões_Acertos", "Tempo_Reconhecimento_Padrões",
    "Memória_Trabalho_Acertos", "Tempo_Memória_Trabalho"
]


def prever_categoria(resposta):
    if len(resposta) != len(features):
        raise ValueError(
            f"A entrada deve conter {len(features)} valores correspondentes às características: {features}")

    nova_amostra = pd.DataFrame([resposta], columns=features)

    categoria_prevista = clf.predict(nova_amostra)

    return categoria_prevista[0]


# Acertos, Tempo
nova_resposta = [
    30.0, 2.5,  # Senso Numérico
    2.0, 8.2,  # Calculo Simples
    30.0, 5.0,  # Compreensão Tempo/Espaço
    20.0, 4.9,  # Reconhecimento de Padroes
    28.2, 3.5  # Memoria de Trabalho
]
categoria = prever_categoria(nova_resposta)
print(f"A categoria prevista para a nova entrada é: {categoria}")
