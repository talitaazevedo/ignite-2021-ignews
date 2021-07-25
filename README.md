- [Ignews Project blog](#ignews-project-blog)
  - [Stripe Plataforma de pagamento](#stripe-plataforma-de-pagamento)
  - [Get Static props - SSG (Static Site Generation)](#get-static-props---ssg-static-site-generation)
    - [revalidate](#revalidate)
  - [Get Server Side Props SSR - (Server side Renderings)](#get-server-side-props-ssr---server-side-renderings)
  - [Formas de fazer chamadas no next](#formas-de-fazer-chamadas-no-next)
  - [Backend No Frontend](#backend-no-frontend)
    - [Api Routes no NextJS](#api-routes-no-nextjs)
      - [Estratégias de Autenticação do NEXTJS](#estratégias-de-autenticação-do-nextjs)
    - [Autenticação com next-auth](#autenticação-com-next-auth)
  - [Escolhendo banco de dados (FaunaDB)](#escolhendo-banco-de-dados-faunadb)

# Ignews Project blog

this project is a simple blog, development using `nextjs,typescript.`

- Add typescript and then react and node typescript.

    ```bash

    yarn add typescript @types/react @types/node --dev
    ```

## Stripe Plataforma de pagamento

[Site da Stripe #️⃣](https://dashboard.stripe.com/settings)

- [ x ] fazer uma chamada a **API** de pagamento
- [ x ] Utilizar uma estratégia com server side renderings
- [ x ] Salvar a Chave de acesso secreta em um env.local
- [ x ] Criar um service para stripe.
- [ x ] Criar uma função para buscar dados na API Stripe.

## Get Static props - SSG (Static Site Generation)

Puxa os dados do servidor uma vez, salva um html estático da página de tantos em tantos períodos.

```typescript
export const getStaticProps: GetStaticProps = async () => {
```

> Observe que a função criada tem o mesmo nome da tipagem que vem direto do NextJs

### revalidate

`revalidate` é um atributo que serve para definir qual o tempo de atualização do meu html.

```typescript
return {
    props: {
        product,
    },
    revalidate: 60 * 60 * 24, //24 hours
};
```

## Get Server Side Props SSR - (Server side Renderings)

O client **Browser** faz a requisição do html, o nextjs solicita ao **React** que faz chamada com a **API** Api retorna os dados para o **React**, que gera o HTML do Bundle, então o **NextJs** faz o meio de campo provendo uma previa do por traz do javascript.

> Ajuda muito nos motores de busca, pois o mesmo encontrará direto a previa do html, e não JS do Bundle.

- **NextJs** observação quando utilizamos SSR o next vai fazer novas requisições de atualização de HTML a todo momento, então é necessário prestar atenção nessa parte.

> Este método permite que seja feita trabalhar de uma forma mais dinâmica.
> Somente usar o modo estático se for extremamente necessário

```typescript
export const getServerSideProps: GetServerSideProps = async () => {
```

## Formas de fazer chamadas no next

- **Client-side**
  - Quando não preciso de indexação,
  - Quando tem alguma ação do usuário que não necessite de carregamento da página
  - Quando não tem necessidade de já estar ali quando a página carrega.
- **Server-Side**
  - Quando se precisa de dados dinâmicos que precisam ser atualizados naquela hora.
- **Static Site Generation**
- Utilizar para blogs ou informações que precisam estar presentes de forma estática

## Backend No Frontend

Em alguns momentos, é possível fazer um backend dentro do nextJs.

### Api Routes no NextJS

-[ ] Login com github.

- [ ] Pagamentos.
- [ ] Para aplicações com escopo muito fechado utilizar o next como api pode ser uma solução.

#### Estratégias de Autenticação do NEXTJS

- JWT - (Storage) .
  - Maneira convencional.
- Next Auth  Quando usar.
  - Quando queremos um Sistema de  Auth Simples.
  - Quando precisamos de um login Social.
  - Quando não queremos nos preocupar com Autenticação.
  - Independe de ter um backend.
- Utilizando serviços externos.
  - Cognito.
  - Auth0.

### Autenticação com next-auth

 Este projeto utiliza `next-auth`, para fazer autenticação com o github.
 O Processo foi muito simples.

  [next-auth](https://next-auth.js.org/getting-started/example)

  > Seguir a documentação foi bem simples.

- Primeiro Criar uma estrutura de pasta dentro de pages.

```bash
src/pages
├── api
│   └── auth
│       └── [...nextauth].ts
├── _app.tsx
├── _document.tsx
├── home.module.scss
└── index.tsx

```

- `└── [...nextauth].ts` os colchetes significam que está pagina recebe parâmetros dinâmicos.

- criar um `Oauth` no github, para o projeto de autenticação.
- Criar duas variáveis ambiente com os códigos do Github.

  ```env
  GITHUB_CLIENT_ID=d*********************

  GITHUB_CLIENT_SECRET=0*********************

  ```

## Escolhendo banco de dados (FaunaDB)
<!-- Pode Ser também o DinamoDB -->
> **FaunaDB** feito especialmente para aplicações serverless.

- [x] Acessar o `faunadb`, criar uma conta e uma database.

- [x] Criar um service para instanciar.

- [x] Adicionar o secret em uma variável ambiente.
