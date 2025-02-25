# Usa a imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código do backend
COPY . .

# Expõe a porta da API (ajuste conforme necessário)
EXPOSE 5000

# Comando para rodar a aplicação em modo de desenvolvimento
CMD ["npm", "run", "dev"]
