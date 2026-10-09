# eFood — exercício EBAC

Projeto React com Vite, React Router, Styled Components e Redux Toolkit.

## Executar localmente

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
```

## Funcionalidades

- Lista de restaurantes e cardápios carregados pela API `https://api-ebac.vercel.app/api/efood/restaurantes`.
- Adição e remoção de pratos no carrinho com Redux Toolkit.
- Cálculo automático do valor total.
- Página `/entrega` com dados de entrega e pagamento.
- Ao concluir, envia um `POST` para `https://api-ebac.vercel.app/api/efood/checkout` com os produtos, endereço e dados de pagamento exigidos pelo exercício.
- Página `/confirmacao` exibindo os dados simples retornados pela API.

Use apenas dados fictícios de cartão durante os testes.
