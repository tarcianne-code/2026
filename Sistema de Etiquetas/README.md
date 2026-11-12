# ValidaFácil — Node.js + SQLite

Sistema MVP para cadastro de produtos, regras verificadas de validade após abertura, lotes, etiquetas de 100 x 65 mm, alertas diários no painel e sugestões de promoção.

## Requisitos
- Node.js 20 ou superior (preferencialmente 22 LTS)
- npm

## Instalação
1. Abra o terminal na pasta do projeto.
2. Execute `npm install`.
3. Execute `npm run setup` para criar o **único** administrador (e-mail e senha de no mínimo 12 caracteres).
4. Execute `npm start`.
5. Abra http://localhost:3000.

O banco é criado automaticamente em `data/validafacil.sqlite`.

## Como usar
1. Cadastre um produto em **Produtos e regras**. Para liberar a geração de etiquetas, informe prazo em dias após abertura, condições de conservação, fonte da regra e responsável que verificou.
2. Vá em **Lotes e etiquetas**, clique **Novo lote** e informe empresa, lote, quantidade, fabricação, abertura, validade original e manipulador.
3. O sistema calcula `mínimo(abertura + dias validados, validade original)`.
4. Na lista de lotes, clique **Etiqueta**, depois **Imprimir / Salvar PDF**. Configure o papel em 100 × 65 mm e escala 100% na impressora.
5. Abra o painel diariamente para consultar alertas. Promoções são apenas sugestões com aprovação manual; não há integração com o caixa.

## Cuidados obrigatórios
- Não há uma tabela legal universal de prazos após abertura. **Não invente prazos.** A validade deve ser definida por orientação aplicável do fabricante e/ou procedimento validado por responsável técnico, considerando conservação e normas locais.
- Este é um **MVP local**. Antes de colocar na internet: implementar proteção robusta contra tentativas de login, HTTPS com proxy confiável, CSRF token, auditoria, testes, backups automáticos e restauração testada, política de retenção e avaliação de LGPD. Não publique o projeto diretamente em produção.
- `NODE_ENV=production` ativa cookies `secure`; exige HTTPS. Em desenvolvimento local não use essa variável.
- A tela de alertas consulta o banco quando o usuário abre/recarrega o sistema; não envia notificações externas.
- Atualizar a regra de um produto **não recalcula lotes antigos** automaticamente. Revise-os manualmente se houver mudança de regra. Não reutilize etiquetas antigas.
- A etiqueta 100 × 65 mm é um modelo inicial: valide campos obrigatórios e dimensões com o responsável técnico e a impressora do cliente.
- Para backup local, pare o servidor e copie a pasta `data` para armazenamento seguro. Faça testes de restauração.

## Estrutura
- `server.js`: API HTTP, autenticação e regras de negócio.
- `db.js`: esquema SQLite.
- `setup.js`: criação do usuário inicial.
- `public/index.html`: interface.
- `public/style.css`: estilos.
- `public/script.js`: telas, formulários, alertas e impressão.
