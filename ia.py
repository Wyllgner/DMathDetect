from sklearn.tree import DecisionTreeClassifier, export_text
from sklearn.model_selection import train_test_split, GridSearchCV, cross_val_score
from sklearn.metrics import accuracy_score, classification_report, confusion_matrix
from sklearn.preprocessing import StandardScaler
import pandas as pd
import joblib

# Carregar os dados
file_path = "discalculia_updated_data.csv"
df = pd.read_csv(file_path)

features = [
    "Senso_Numérico_Acertos", "Tempo_Senso_Numérico",
    "Cálculo_Simples_Acertos", "Tempo_Cálculo_Simples",
    "Compreensão_Tempo_Espaço_Acertos", "Tempo_Compreensão_Tempo_Espaço",
    "Reconhecimento_Padrões_Acertos", "Tempo_Reconhecimento_Padrões",
    "Memória_Trabalho_Acertos", "Tempo_Memória_Trabalho"
]
X = df[features].copy()
y = df["Discalculia"]

print("Valores ausentes por coluna:")
print(X.isnull().sum())

X.fillna(X.mean(), inplace=True)

scaler = StandardScaler()
tempo_features = [col for col in features if "Tempo" in col]
X.loc[:, tempo_features] = scaler.fit_transform(X[tempo_features])  #

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

param_grid = {
    "max_depth": [3, 4, 5, 6, 7, 8],
    "min_samples_split": [2, 5, 10],
    "min_samples_leaf": [1, 2, 5]
}
grid_search = GridSearchCV(DecisionTreeClassifier(random_state=42), param_grid, cv=5, scoring="accuracy")
grid_search.fit(X_train, y_train)

best_clf = grid_search.best_estimator_

y_pred = best_clf.predict(X_test)
accuracy = accuracy_score(y_test, y_pred)
print(f"Precisão do modelo: {accuracy:.2%}")  # Exibir em formato de porcentagem
print("\nRelatório de Classificação:\n", classification_report(y_test, y_pred))
print("\nMatriz de Confusão:\n", confusion_matrix(y_test, y_pred))

cv_scores = cross_val_score(best_clf, X, y, cv=5)
print(f"Média da Acurácia na Validação Cruzada: {cv_scores.mean():.2%}")

tree_rules = export_text(best_clf, feature_names=features)
print("\nRegras da Árvore de Decisão:")
print(tree_rules)

model_path = "discalculia_decision_tree_best.pkl"
joblib.dump(best_clf, model_path)
print(f"\nModelo salvo em: {model_path}")
