# ClimaTech

Este projeto está em desenvolvimento ativo. Todas as novas funcionalidades e correções devem seguir o fluxo de trabalho definido com o uso de GitFlow.

<img alt='Fluxo do GitFlow' src='.github/assets/gitFlow.png'/>

- [Estrutura do Projeto](.github/docs/Geral.md)

## Requisitos do Ambiente

Para rodar o projeto localmente, certifique-se de ter a seguinte ferramenta instalada:

- Node.js >= 20.18.0
- Extensão Live Server no VS Code

## Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Maia-th/ClimaTech.git
cd ClimaTech
```

2. Instale as dependências do projeto:

```bash
npm install
```

## Suba o Banco de Dados

- ⚠️ Em Breve!

## Configure o arquivo .env:

- Copie o arquivo `.env.example` e renomeie para `.env`
- Defina as variáveis de ambiente como o banco de dados, serviços de cache e outras integrações.

## Iniciar o Backend

Para iniciar o servidor Express, execute o seguinte comando:

```bash
npm start
```

Agora a API estará disponível em http://localhost:3000.

## Iniciar o Frontend

Para iniciar o frontend com o Live Server:

1. Abra o arquivo `index.html` no VS Code.
2. Clique com o botão direito no arquivo e selecione "Open with Live Server".

## Fluxo de Desenvolvimento

Este projeto segue o modelo GitFlow para organização das branches e fluxo de desenvolvimento.

- `main`: Branch principal que contém o código em produção.
- `develop`: Branch de desenvolvimento com o código que será testado antes de ir para a produção.
- `feature` branches: Cada nova funcionalidade ou melhoria deve ser desenvolvida em uma branch de feature (feature/nome-da-feature).
- `hotfix` branches: Correções de bugs urgentes devem ser feitas em branches específicas (hotfix/nome-do-hotfix).

Passos para contribuir com uma nova feature ou correção

1. Crie uma nova branch a partir de develop:

> Antes de criar a nova branch, execute um `git pull origin develop` para garantir que a sua branch `develop` local esteja atualizada com a versão mais recente do repositório remoto.

```bash
git checkout -b feature/nome-da-feature develop
```

2. Desenvolva a funcionalidade ou correção de bug.

3. Ao concluir, faça o commit das suas alterações:

```bash
git add .
git commit -m "feat: Descrição da feature ou correção"
```

4. Faça o push da branch:

```bash
git push origin feature/nome-da-feature
```

5. Abra um Pull Request (PR) para a branch develop.

6. Exclua a branch criada após o merge com a branch `develop`:

```bash
git branch -d feature/nome-da-feature
```

## Regras para Aprovação de PR

- Todo PR deve ser revisado e aprovado por dois desenvolvedores antes de ser mesclado à branch develop.

## Bibliotecas

- ⚠️ Em Breve!
