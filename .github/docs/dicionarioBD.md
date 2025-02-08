# Dicionário de Dados

#### Tabela: Usuarios
<div align="center">

| **Campo**   | **Tipo**     | **Descrição**                        | **Restrições**                            |
| ----------- | ------------ | ------------------------------------ | ----------------------------------------- |
| `idUsers`   | Inteiro      | Identificador único do usuário       | Chave primária, não nulo, auto incremento |
| `name`      | Varchar(45)  | Nome completo do usuário             | Não nulo                                  |
| `email`     | Varchar(100) | E-mail único do usuário              | Não nulo, único                           |
| `password`  | Varchar(255) | Senha do usuário                     | Não nulo                                  |
| `access`    | Enum         | Nível de acesso (`root` ou `padrao`) | Não nulo                                  |
</div>

#### Tabela: Promocoes
<div align="center">

| **Campo**       | **Tipo**    | **Descrição**                              | **Restrições**                            |
| --------------  | ----------- | ------------------------------------------ | ----------------------------------------- |
| `idPromocoes`   | Inteiro     | Identificador único da promoção            | Chave primária, não nulo, auto incremento |
| `data_validade` | Date        | Data de validade da promoção               | Não nulo                                  |
| `titulo`       | Varchar(100) | Título da promoção                         | Não nulo                                  |
| `descricao`    | Text        | Descrição detalhada da promoção            | Não nulo                                  |
| `status`       | Enum        | Status da promoção (`ativa` ou `suspensa`) | Não nulo                                  |
| `valor`        | Decimal(10,2) | Valor da promoção                          | Não nulo                                  |
| `condicoes`    | Text        | Condições da promoção                      | Não nulo                                  |
</div>

#### Tabela: Mensagens
<div align="center">

| **Campo**     | **Tipo**     | **Descrição**                             | **Restrições**                            |
| ------------- | ------------ | ----------------------------------------- | ----------------------------------------- |
| `idMensagens` | Inteiro      | Identificador único da mensagem           | Chave primária, não nulo, auto incremento |
| `name`        | Varchar(45)  | Nome completo do usuário                  | Não nulo                                  |
| `email`       | Varchar(100) | E-mail único do usuário                   | Não nulo, único                           |
| `mensagem`    | Text         | Descrição detalhada da mensagem           | Não nulo                                  |
| `status`      | Booleano     | Status da mensagem (`lida` ou `nao lida`) | Não nulo                                  |
</div>

#### Tabela: Inscricoes
<div align="center">

| **Campo**       | **Tipo**     | **Descrição**                  | **Restrições**                  |
| --------------  | ------------ | ------------------------------ | ------------------------------- |
| `idInscricoes`  | Inteiro      | Identificador único do usuário | Chave primária, auto incremento |
| `email`        | Varchar(100) | E-mail único do usuário        | Não nulo, único                 |
| `data_cadastro` | Date         | Data de cadastro do usuário    | Não nulo                        |
</div>

