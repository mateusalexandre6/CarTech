# CarroTec 🚗🔧

CarroTec é um sistema completo para gerenciamento de oficinas mecânicas, desenvolvido com **MERN Stack** e uma API de **Inteligência Artificial** para diagnósticos avançados.

---
## 📌 Features

### 🔙 Backend (Node.js + Express + MongoDB)
- **Autenticação JWT** para usuários.
- **Gerenciamento de mecânicos** (CRUD completo).
- **Orçamentos e agendamentos** para clientes.
- **Gamificação** para incentivar produtividade dos mecânicos.
- **Integração com a IA** para diagnósticos automatizados.

### 🎨 Frontend (React + Redux + MUI)
- **Painel administrativo** para gerenciar serviços.
- **Sistema de agendamentos** para clientes.
- **Dashboard interativa** com gráficos de estatísticas.
- **Tema dinâmico** para melhor experiência do usuário.

### 🤖 Inteligência Artificial (Flask + MongoDB)
- **Diagnóstico preditivo** baseado em dados históricos.
- **Análise de complexidade de serviços.**
- **Conexão com o backend do CarroTec para consultas.**

---
## 🚀 Como Rodar o Projeto

### 🔹 1. Rodando com Docker

Certifique-se de ter o **Docker** e **Docker Compose** instalados.

```sh
docker-compose up --build
```

Isso irá iniciar os containers para o **backend, frontend, banco de dados e inteligência artificial** automaticamente.

---
### 🔹 2. Rodando Manualmente (CMD)

#### 🖥️ Backend (Node.js)
```sh
cd backend
npm install
npm run dev
```

#### 🎨 Frontend (React)
```sh
cd frontend
npm install
npm run dev
```

#### 🤖 Inteligência Artificial (Flask)
```sh
cd artificial_intelligence
pip install -r requirements.txt
python app.py
```

O projeto estará acessível em:
- **Frontend:** `http://localhost:3000`
- **Backend:** `http://localhost:5000`
- **Inteligência Artificial:** `http://localhost:5001`

---
## 📌 Tecnologias Utilizadas

- **Frontend:** React, Redux, Material UI
- **Backend:** Node.js, Express, MongoDB, JWT
- **Inteligência Artificial:** Flask, MongoDB, Python
- **Docker** para ambiente de desenvolvimento

---
## 📸 Screenshots


![CarTech](screenshots/Captura%20de%20tela%202025-02-25%20201445.png)
![CarTech](screenshots/Captura%20de%20tela%202025-02-25%20201436.png)
![CarTech](screenshots/Captura%20de%20tela%202025-02-25%20201429.png)
![CarTech](screenshots/Captura%20de%20tela%202025-02-25%20201420.png)
![CarTech](screenshots/Captura%20de%20tela%202025-02-25%20201408.png)
![CarTech](screenshots/Captura%20de%20tela%202025-02-25%20201351.png)
![CarTech](screenshots/Captura%20de%20tela%202025-02-25%20201344.png)
![CarTech](screenshots/Captura%20de%20tela%202025-02-25%20201336.png)
![CarTech](screenshots/Captura%20de%20tela%202025-02-25%20201313.png)
![CarTech](screenshots/Captura%20de%20tela%202025-02-25%20201259.png)

---
## 🛠️ Contribuição
Sinta-se à vontade para contribuir com melhorias! Abra uma issue ou um pull request. 🚀

