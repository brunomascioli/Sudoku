# Sudoku

Este projeto consiste em um jogo de Sudoku. O projeto foi dividido em duas partes principais: um frontend para a interface do usuário e um backend para a lógica do jogo e armazenamento de dados.

## Instalação

### Frontend

- Após iniciar a aplicação, você pode acessar a aplicação no navegador em `http://localhost:5173` (porta padrão do vite).

1. Navegue até o diretório `frontend`:
    ```sh
    cd frontend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
    ```sh
    npm run dev
    ```

### Backend

- Após iniciar a aplicação, você pode acessar a aplicação no navegador em `http://localhost:5173` (porta padrão do vite).

1. No backend, crie um arquivo `.env` na raiz do diretório `backend` com o seguinte conteúdo:
  ```sh
  DB_NAME=nome_banco
  DB_USER=nome_usuario
  DB_PASSWORD=senha_banco
  DB_HOST=host_banco
  DB_PORT=porta_banco
  SERVER_PORT=porta_node
  ```
1. Navegue até o diretório `backend`:
    ```sh
    cd backend
    ```

2. Instale as dependências:
    ```sh
    npm install
    ```

3. Inicie o servidor de desenvolvimento:
    ```sh
    npm run dev
    ```