# Publicar no GitHub Pages

Este projeto já está preparado para publicar automaticamente pelo GitHub Actions.

## Passo a passo

1. Abra o repositório no GitHub: `giovanynesio/PROMPT-BUILDER`.
2. Entre em **Settings**.
3. No menu lateral, abra **Pages**.
4. Em **Build and deployment**, selecione **Source: GitHub Actions**.
5. Volte para a aba **Actions** do repositório.
6. Abra o workflow **Deploy GitHub Pages**.
7. Clique em **Run workflow** se quiser publicar manualmente, ou apenas faça um novo push na branch `main`.
8. Ao final da execução, o site ficará disponível no endereço mostrado pelo próprio GitHub Pages.

## Rodar localmente

```powershell
npm install
npm run build
npm run standalone
```

Depois abra `http://localhost:5173`.

## Desenvolvimento

```powershell
npm run dev
```
