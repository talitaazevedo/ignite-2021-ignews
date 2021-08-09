# Ignews Project blog

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
    - [Pagamentos no stripe](#pagamentos-no-stripe)
  - [Ouvindo webhooks](#ouvindo-webhooks)
    - [Webhooks no stripe](#webhooks-no-stripe)
    - [Ouvindo eventos no stripe](#ouvindo-eventos-no-stripe)
  - [Posts com Prismic](#posts-com-prismic)
    - [Formatação de dados com react](#formatação-de-dados-com-react)
    - [Componente Active Link](#componente-active-link)
    - [Gerando Builds GetStatic Paths](#gerando-builds-getstatic-paths)

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

### Estratégias de Autenticação do NEXTJS

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

### Escolhendo banco de dados (FaunaDB)
<!-- Pode Ser também o DinamoDB -->
> **FaunaDB** feito especialmente para aplicações serverless.

- [x] Acessar o `faunadb`, criar uma conta e uma database.
  - [x] Configurando faunadb

- [x] Criar um service para instanciar.
  - [x] Salvando usuário no banco

- [x] Adicionar o secret em uma variável ambiente.
  - [x] Chave Privada JWT

- [x] Verificando usuário duplicado

### Pagamentos no stripe

Stripe é um serviço terceiro de pagamentos.
[acesso o stripe](https://dashboard.stripe.com/)

- [x] Acessar o Stripe e criar uma conta.
  - [x] Criar um produto.
  - [x] Redirecionar para o stripe.
  - [x] Evitar duplicação no stripe.

- Criar um arquivo de subscribe para gerarmos o checkout, criar este arquivo dentro da pastinha `API`, conforme mostrado abaixo

  ```bash
        src/pages/api

      ├── auth
      │   └── [...nextauth].ts
      └── subscribe.ts

  ```

Este arquivo será responsável por gerar a rota de checkout no site da stripe.

  ```typescript
      export default async (req: NextApiRequest, res: NextApiResponse) => {
          if (req.method === 'POST') {
              const session = await getSession({ req });
              const stripeCustomer = await stripe.customers.create({
                  email: session.user.email,
              });
              const user = await fauna.query<User>(
                  q.Get(
                      q.Match(
                          q.Index('user_by_email'),
                          q.Casefold(session.user.email),
                      ),
                  ),
              );
              let customerId = user.data.stripe_customer_id;

              if (!customerId) {
                  await fauna.query(
                      q.Update(q.Ref(q.Collection('users'), user.ref.id), {
                          data: {
                              stripe_customer_id: stripeCustomer.id,
                          },
                      }),
                  );

                  customerId = stripeCustomer.id;
              }

              const stripeCheckoutSession = await stripe.checkout.sessions.create({
                  customer: stripeCustomer.id,
                  payment_method_types: ['card'],
                  billing_address_collection: 'required',
                  line_items: [
                      {
                          price: 'price_1JGrKzFZnKPPGbbtmvoAQ9cb',
                          quantity: 1,
                      },
                  ],
                  mode: 'subscription',
                  allow_promotion_codes: true,
                  success_url: process.env.STRIPE_SUCCESS_URL,
                  cancel_url: process.env.STRIPE_FAIL_URL,
              });
              return res.status(200).json({ sessionId: stripeCheckoutSession.id });
          } else {
              res.setHeader('Allow', 'POST');
              res.status(405).end('Method not allowed');
          }
      };
  ```

## Ouvindo webhooks

### Webhooks no stripe

> Caso a aplicação esteja em produção é necessário criar um `endpoint` pelo stripe.
> Como não está criaremos pela linha de comando instalando a `cli do stripe`.

- Acesse o github  do stripe cli e siga as instruções de instalação [clique aqui](https://github.com/stripe/stripe-cli)

- Após a  instalação   crie um arquivo, chamado `webhooks.ts` no diretório abaixo.

```bash

src/pages/api
├── auth
│   └── [...nextauth].ts
├── subscribe.ts
└── webhooks.ts
```

- Após  criar o arquivo de configuração execute o comando abaixo para  que o stripe comece a ouvir  a página.

```bash
stripe listen --forward-to localhost:3000/api/webhooks

```

[text](https://link)

### Ouvindo eventos no stripe

Para ouvir eventos no stripe é necessário fazer um `parser`  de dados, para isso foi usada uma função pronta da internet para conversão .

```typescript
async function buffer(readable: Readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}

```

## Posts com Prismic

### Formatação de dados com react

Sempre que puder faça a formatação dos dados conversão de preço, data etc. logo após consumir os dados daAPI externa

### Componente Active Link

Este componente é muito interessante.
Paraw criar utilizamos o componente `Link` do `next`  foi bem simples explicação abaixo.

**Propriedadades do componente `ActiveLink`**

- **children**: elemento html do código `<a>`.
- **ActiveClassName**: classe css do código.
- **...rest**:  restante das propriedades do componente link.

- [x] `cloneElement` do react, esta função clona, um elemento html.
- [x] `asPath`  do  `useRouter`  é responsável por verificar determinados atributos.
- [x] Então o que  foi feito, como a propriedade `children` não podia receber mais uma propriedade `activeClassName` ,  foi feita uma verificação simples,  onde caso não seja encontrada a classe do elemento ele substitui por uma string vazia.

```typescript

// Importação  dos elementos
import { ReactElement, cloneElement } from 'react';

interface ActiveLinkProps extends LinkProps {
    children: ReactElement;
    activeClassName: string;
}

export function ActiveLink({
    children,
    activeClassName,
    ...rest
}: ActiveLinkProps) {
    const { asPath } = useRouter();
    const className = asPath === rest.href ? activeClassName : '';
    // Clone elemente é muito legal e avançado.
    return <Link {...rest}>{cloneElement(children, { className })}</Link>;
}


```

### Gerando Builds GetStatic Paths

Estrátegias importantes para gerar páginas estáticas trabalhando com o `nextjs`.

1. Gerar Páginas estáticas durante a Build.
   1. Usar essa opção apenas quando o site não for muito grande, senão a **build** fica enorme
2. Gerar a página estática no primeiro acesso.
   1. Quando houver o primeiro acesso naquela página o servidor do next vai gerar página e disponibilizar para os outros usuários.
3. Gerar meio a meio, gerar o produto que for mais acessado durante a build e o restante no primeiro acesso.
   1. ess Opção é muito viável quando um e-commerce  é muito grande, gera uma  build com  as páginas mais acessadas , e consequentemente gera durante o acesso do cliente as próximas
