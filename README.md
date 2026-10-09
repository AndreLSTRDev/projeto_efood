# eFood — React

Projeto de delivery inspirado nas 7 telas do protótipo eFood enviado em PDF.

## Tecnologias
- React + Vite
- Styled Components
- React Router DOM

## Como executar
1. Instale o Node.js LTS: https://nodejs.org/
2. Extraia o ZIP e abra a pasta `efood-react` no VS Code.
3. No terminal, execute:

```bash
npm install
npm run dev
```

4. Abra o endereço local exibido pelo Vite (normalmente `http://localhost:5173`).

## Gerar versão de produção

```bash
npm run build
npm run preview
```

A pasta `dist` será gerada pelo build.

## Publicar na Vercel
1. Envie o projeto para um repositório no GitHub.
2. Entre em https://vercel.com/ e importe o repositório.
3. Framework: Vite; comando de build: `npm run build`; diretório de saída: `dist`.
4. Publique. O `vercel.json` deste projeto permite atualizar rotas internas sem erro 404.

## Observações
- As imagens são carregadas de URLs externas do Unsplash; é necessário estar conectado à internet para visualizá-las.
- O checkout é demonstrativo: não processa pagamentos reais nem envia pedidos a um restaurante.
- Não insira dados reais de cartão. Use apenas dados fictícios para testar a interface.
