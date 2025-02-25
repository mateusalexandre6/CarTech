# Usando a imagem oficial do Python
FROM python:3.9

# Definir diretório de trabalho no container
WORKDIR /app

# Copiar arquivos para o container
COPY . .

# Instalar dependências
RUN pip install --no-cache-dir -r requirements.txt

# Expor a porta da API Flask
EXPOSE 5001

# Comando para rodar a aplicação
CMD ["python", "app.py"]
