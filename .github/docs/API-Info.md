# Documentação da API

## Índice

1. [Cadastro de Usuário](#cadastro-de-usuário)
2. [Edição de Usuário](#edição-de-usuário)
3. [Visualização de Usuário](#visualização-de-usuário)
4. [Listar Todos os Usuário](#listar-todos-os-usuários)
5. [Exclusão de Usuário](#exclusão-de-usuário)
6. [Login de Usuário](#login-de-usuário)

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

### Listar Todos os Usuários

- **Método:** GET
- **Endpoint:** `/api/usuarios`
- **Descrição:** Esta rota retorna uma lista de todos os usuários cadastrados.

- **Resposta de Sucesso:**
  - **Código:** 200 OK
  - **Corpo:**
    ```json
    [
      {
        "idUsers": 1,
        "Name": "John Doe",
        "email": "john.doe@example.com",
        "password": "password123",
        "access": "padrão",
      },
      {
        "idUsers": 2,
        "Name": "Jane Doe",
        "email": "jane.doe@example.com",
        "password": "password456",
        "access": "root",
      }
    ]
    ```
- **Mensagens de Erro:**
  - **Código:** 500 Internal Server Error
    - **Corpo:**
      ```json
      {
        "message": "Erro ao listar usuários",
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

> [Subir ao Topo](#documentação-da-api)
