# Usa a imagem oficial do Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos package.json e package-lock.json
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia todo o código do frontend
COPY . .

# Expõe a porta do frontend
EXPOSE 5173

# Comando para rodar o frontend em modo de desenvolvimento
CMD ["npm", "run", "dev"]
