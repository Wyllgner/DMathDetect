import joblib
import pandas as pd

# Carrega o modelo salvo
model_path = "/home/andrey/UNIR/Sexto_Periodo/IHC/final-ihc/backend/discalculia_decision_tree_model.pkl"
clf = joblib.load(model_path)

# Recursos esperados pelo modelo
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