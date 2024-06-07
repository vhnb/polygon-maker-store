<img src="https://i.ibb.co/QfnB3Pz/Captura-de-tela-2024-06-06-210525.png" width="200" alt="Image dashboard" />

# Site de Blogs em React

## Tecnologias
- React | JavaScript | CSS

## Documentação
### Como rodar o aplicativo
Para rodar o aplicativo, você precisa ter o Node.js instalado em seu sistema.

1. Baixe o arquivo do projeto.
2. No diretório do projeto, abra o terminal e execute o comando abaixo para instalar as dependências:
```
npm install
```

Após a instalação das dependências, execute o seguinte comando para iniciar o aplicativo:
```
npm run start
```
> Isso é tudo que você precisa para rodar o site de blogs em sua máquina local.

# Paginas

- CreatePost: Permite que o usuário crie um novo post.
- Dashboard: Permite que o usuário gerencie seus posts.
- EditPost: Permite que o usuário edite um post existente.
- Home: Página principal que exibe os posts.
- Login: Permite que o usuário faça login.
- Not found: Página exibida quando uma rota não é encontrada.
- Post: Contêiner para exibir um post.
- Register: Permite que o usuário se cadastre.
- Search: Página de pesquisa.

# Hooks

- useAuthentication: Função para o usuário se cadastrar, fazer login e fazer logout.
- useDeleteDocument: Hook para excluir um post.
- useFetchDocument: Este hook faz a busca de um documento no banco de dados.
- useFetchDocuments: Também usado para buscar documentos no banco de dados.
- useInsertDocument: Função para inserir um novo documento.
- useQuery: Função para obter parâmetros de consulta.
- useUpdateDocument: Função para atualizar um documento no banco de dados.
