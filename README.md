# eFood — React

Projeto de delivery baseado no layout do Figma da atividade EBAC.

## Tecnologias
- React + Vite
- Styled Components
- React Router DOM
- Fetch API (AJAX) para carregar os restaurantes e cardápios da API EBAC

## Executar localmente
1. Instale Node.js LTS.
2. Abra esta pasta no VS Code.
3. Execute:

```bash
npm install
npm run dev
```

## Build de produção

```bash
npm run build
```

A saída é gerada em `dist/`.

## API utilizada
`https://api-ebac.vercel.app/api/efood/restaurantes`

Os dados da listagem e os cardápios são carregados dinamicamente via `fetch`. Ao selecionar “Comprar o produto”, abre-se o modal com imagem, descrição, porção e preço do prato vindo da API.

## Deploy na Vercel
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm install`

O `vercel.json` inclui rewrite para suportar as rotas do React Router.

## Nota
O checkout é apenas demonstrativo e não processa pagamentos reais. Não utilize dados reais de cartão.
