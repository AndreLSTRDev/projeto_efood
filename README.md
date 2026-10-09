# eFood — atividade EBAC

Projeto React com Vite e Styled Components, consumindo os restaurantes e cardápios pela API da EBAC.

## Funcionalidades

- Listagem dinâmica de restaurantes pela API `https://api-ebac.vercel.app/api/efood/restaurantes`.
- Página de restaurante com pratos carregados dinamicamente.
- Modal de detalhes e ação para adicionar pratos ao carrinho.
- Estado global do carrinho gerenciado com Redux Toolkit e React Redux.
- Página `/carrinho` com listagem dinâmica dos produtos, remoção individual e soma automática dos preços.

## Executar localmente

```bash
npm install
npm run dev
```

## Gerar build de produção

```bash
npm run build
```

No Vercel, use o comando de build `npm run build` e a pasta de saída `dist`.
