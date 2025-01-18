# Dicionário de Dados

#### Tabela: Usuários  
| **Campo**   | **Tipo**    | **Descrição**                          | **Restrições**                 |  
|-------------|-------------|----------------------------------------|--------------------------------|  
| `idUsers`        | Inteiro     | Identificador único do usuário         | Chave primária, não nulo, auto incremento |  
| `Name`      | Texto (45)       | Nome completo do usuário               | Não nulo                      |  
| `e-mail`     | Varchar (45)       | E-mail único do usuário                | Não nulo, único               |  
| `password`     | Texto (16)       | Senha do usuário                       | Não nulo                      |  
| `access`    | Enum        | Nível de acesso (`root` ou `padrão`)   | Não nulo                      |  

#### Tabela: Promoções  
| **Campo**      | **Tipo**   | **Descrição**                        | **Restrições**                 |  
|----------------|------------|--------------------------------------|--------------------------------|  
| `idPromoções`           | Inteiro    | Identificador único da promoção      | Chave primária, não nulo, auto incremento |
| `Data_validade`       | Date      | Data de validade da promoção                   | Não nulo                      | 
| `titulo`       | Texto (45)      | Título da promoção                   | Não nulo                      |  
| `Descrição`    | Texto Longo      | Descrição detalhada da promoção      | Não nulo                      |  
| `status`       | Enum       | Status da promoção (`ativa` ou `suspensa`) | Não nulo                  |  
| `Valor`| Float       | Valor da promoção         | Não nulo                      |
| `Condições`       | Texto médio     | Condições da promoção | Não nulo                  |  

#### Tabela: Mensagens  
| **Campo**      | **Tipo**   | **Descrição**                        | **Restrições**                 |  
|----------------|------------|--------------------------------------|--------------------------------|  
| `idMensagens`           | Inteiro    | Identificador único da mensagem      | Chave primária, não nulo, auto incremento |
| `Name`      | Texto (45)       | Nome completo do usuário               | Não nulo                      |
| `e-mail`     | Varchar (45)       | E-mail único do usuário                | Não nulo, único               |    
| `Mensagem`    | Texto Longo      | Descrição detalhada da mensagem      | Não nulo                      |  
| `status`       | Booleano       | Status da mensagem (`ilda` ou `não lida`) | Não nulo                  |  

#### Tabela: Inscrições
| **Campo**      | **Tipo**   | **Descrição**                        | **Restrições**                 |  
|----------------|------------|--------------------------------------|--------------------------------|  
| `idInscrições`           | Inteiro    | Identificador único do usuário     | Chave primária, auto incremento |  
| `e-mail`     | Varchar (45)       | E-mail único do usuário                | Não nulo, único               |  
| `data_cadastro`     | Data       | Data de cadastro do usuário                | Não nulo               |
