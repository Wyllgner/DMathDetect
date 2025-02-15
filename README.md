# Uso de Inteligência Artificial na Identificação de Sinais de Discalculia no Ensino Básico

## Visão Geral
Este repositório contém o código-fonte e a documentação do projeto **DMathDetect**, uma ferramenta baseada em inteligência artificial desenvolvida para auxiliar na identificação de sinais de discalculia em crianças da educação básica. Utilizando **árvores de decisão**, a ferramenta analisa o tempo de resposta e a pontuação média de um questionário estruturado para classificar os participantes com base nesses dados.

## Objetivos do Projeto
### Objetivo Geral
Desenvolver uma ferramenta baseada em inteligência artificial para auxiliar profissionais da educação e saúde na triagem inicial relacionada ao diagnóstico de discalculia.

### Objetivos Específicos
- Implementar algoritmos de **árvores de decisão** para análise de respostas matemáticas.
- Criar uma interface **acessível** e **intuitiva** para professores, psicopedagogos e profissionais da educação.
- Fornecer **relatórios visuais e gráficos interativos** para facilitar a interpretação dos dados coletados.

## Tecnologias Utilizadas
- **Linguagem de programação:** Python
- **Framework de IA:** Scikit-Learn (para implementação das árvores de decisão)
- **Desenvolvimento web:** React (frontend)
- **Backend:** Flask (API para comunicação com o modelo de IA)
- **Banco de dados:** MySQL

## Metodologia
O projeto foi desenvolvido em três fases principais:
1. **Elaboração do questionário de avaliação**: Baseado nos critérios do **DSM-5** e na literatura sobre discalculia, abrangendo dimensões como **senso numérico**, **memória de trabalho**, **Compreensão do tempo e espaço**, **cálculo simples** e **Reconhecimento de padrões**.
2. **Implementação do modelo de IA**: Modelo de **árvores de decisão**, treinado com uma base sintética gerada a partir de estudos sobre discalculia.
3. **Desenvolvimento da interface da plataforma**: Focada em **usabilidade** e **acessibilidade**, permitindo interação intuitiva por parte de educadores e profissionais da saúde.

## Como Executar o Projeto
### Clonar o repositório
```bash
git clone https://github.com/Wyllgner/DMathDetect.git
cd DMathDetect
```
## Autores
- **Wyllgner F. Amorim** - wyllgner.amorim@proton.me
- **Andrey R. S. Rça** - andreyrica.dev@gmail.com
- **Lucas M. Cunha** - lucas.marques@unir.br

## Licença
Este projeto está sob a licença **MIT**.


