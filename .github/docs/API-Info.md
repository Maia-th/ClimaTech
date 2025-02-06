# Documentação da API

## Endpoints

### Cadastro de Usuário

- **Método:** POST
- **Endpoint:** `/api/usuarios`
- **Descrição:** Esta rota cadastra um novo usuário no banco de dados.
- **Corpo da Requisição:**
  ```json
  {
    "Name": "string",
    "email": "string",
    "password": "string",
    "access": "root | padrão"
  }
  ```
- **Exemplo de Requisição:**
  ```json
  {
    "Name": "John Doe",
    "email": "john.doe@example.com",
    "password": "password123",
    "access": "padrão"
  }
  ```

- **Resposta de Sucesso:**
  - **Código:** 201 Created
  - **Corpo:**
    ```json
    {
      "idUsers": 1,
      "Name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "access": "padrão",
      "createdAt": "2025-02-06T01:00:19.000Z",
      "updatedAt": "2025-02-06T01:00:19.000Z"
    }
    ```
- **Mensagens de Erro:**
  - **Código:** 400 Bad Request
    - **Corpo:**
      ```json
      {
        "message": "Dados inválidos"
      }
      ```
  - **Código:** 500 Internal Server Error
    - **Corpo:**
      ```json
      {
        "message": "Erro ao cadastrar usuário",
        "error": "Descrição do erro"
      }
      ```

### Edição de Usuário

- **Método:** PUT
- **Endpoint:** `/api/usuarios/:id`
- **Descrição:** Esta rota edita os dados de um usuário específico com base no seu `id`.
- **Corpo da Requisição:**
  ```json
  {
    "Name": "string",
    "email": "string",
    "password": "string",
    "access": "root | padrão"
  }
  ```
- **Exemplo de Requisição:**
  ```json
  {
    "Name": "John Doe Updated",
    "email": "john.doe.updated@example.com",
    "password": "newpassword123",
    "access": "root"
  }
  ```

- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Corpo:**
    ```json
    {
      "idUsers": 1,
      "Name": "John Doe Updated",
      "email": "john.doe.updated@example.com",
      "password": "newpassword123",
      "access": "root",
      "createdAt": "2025-02-06T01:00:19.000Z",
      "updatedAt": "2025-02-06T01:05:19.000Z"
    }
    ```
- **Mensagens de Erro:**
  - **Código:** 400 Bad Request
    - **Corpo:**
      ```json
      {
        "message": "Dados inválidos"
      }
      ```
  - **Código:** 404 Not Found
    - **Corpo:**
      ```json
      {
        "message": "Usuário não encontrado"
      }
      ```
  - **Código:** 500 Internal Server Error
    - **Corpo:**
      ```json
      {
        "message": "Erro ao editar usuário",
        "error": "Descrição do erro"
      }
      ```

### Visualização de Usuário

- **Método:** GET
- **Endpoint:** `/api/usuarios/:id`
- **Descrição:** Esta rota retorna os dados de um usuário específico com base no seu `id`.

- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Corpo:**
    ```json
    {
      "idUsers": 1,
      "Name": "John Doe",
      "email": "john.doe@example.com",
      "password": "password123",
      "access": "padrão",
      "createdAt": "2025-02-06T01:00:19.000Z",
      "updatedAt": "2025-02-06T01:00:19.000Z"
    }
    ```
- **Mensagens de Erro:**
  - **Código:** 404 Not Found
    - **Corpo:**
      ```json
      {
        "message": "Usuário não encontrado"
      }
      ```
  - **Código:** 500 Internal Server Error
    - **Corpo:**
      ```json
      {
        "message": "Erro ao visualizar usuário",
        "error": "Descrição do erro"
      }
      ```

### Exclusão de Usuário

- **Método:** DELETE
- **Endpoint:** `/api/usuarios/:id`
- **Descrição:** Esta rota exclui um usuário específico com base no seu `id`.

- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Corpo:**
    ```json
    {
      "message": "Usuário excluído com sucesso"
    }
    ```
- **Mensagens de Erro:**
  - **Código:** 404 Not Found
    - **Corpo:**
      ```json
      {
        "message": "Usuário não encontrado"
      }
      ```
  - **Código:** 500 Internal Server Error
    - **Corpo:**
      ```json
      {
        "message": "Erro ao excluir usuário",
        "error": "Descrição do erro"
      }
      ```

### Login de Usuário

- **Método:** POST
- **Endpoint:** `/api/login`
- **Descrição:** Esta rota autentica um usuário e retorna um token JWT.
- **Corpo da Requisição:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Exemplo de Requisição:**
  ```json
  {
    "email": "john.doe@example.com",
    "password": "password123"
  }
  ```

- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Corpo:**
    ```json
    {
      "token": "jwt_token"
    }
    ```
- **Mensagens de Erro:**
  - **Código:** 401 Unauthorized
    - **Corpo:**
      ```json
      {
        "message": "Credenciais inválidas"
      }
      ```
  - **Código:** 500 Internal Server Error
    - **Corpo:**
      ```json
      {
        "message": "Erro ao realizar login",
        "error": "Descrição do erro"
      }
      ```
---
