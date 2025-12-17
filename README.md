# goBarber

Aplicação (API) para agendamento de barbearia usando Node.js, TypeScript e TypeORM.

**Resumo**
- Projeto em desenvolvimento para agendamento, com rotas para usuários, sessões e agendamentos.
- Usa TypeORM para persistência, `date-fns` para manipulação de datas e `jsonwebtoken` para autenticação.

**Requisitos**
- Node.js (>= 16 recomendado)
- NPM
- Banco de dados PostgreSQL (ou outro suportado pelo TypeORM, ajustando `data-source.ts`).

**Instalação**
- Clone o repositório e instale dependências:

```bash
git clone <repo-url>
cd goBarber
npm install
```

**Variáveis de ambiente**
Crie um arquivo `.env` (ou use variáveis do ambiente) com as chaves necessárias. O projeto usa `src/config/auth.ts` e `src/database/data-source.ts` para configuração — as variáveis comuns são:

- `DB_HOST` — host do banco (ex: `localhost`)
- `DB_PORT` — porta do banco (ex: `5432`)
- `DB_USERNAME` — usuário do banco
- `DB_PASSWORD` — senha do banco
- `DB_DATABASE` — nome do banco
- `JWT_SECRET` — segredo para geração de tokens JWT
- `JWT_EXPIRES_IN` — tempo de expiração do token (ex: `1d`)

Ajuste conforme seu `data-source.ts`.

**Banco de dados / Migrations**
- Criar migration (exemplo já usado no projeto):

```bash
npm run migration:create <NomeDaMigration>
```

- Rodar migrations:

```bash
npm run migration:run
```

**Scripts úteis**
- Rodar em modo de desenvolvimento:

```bash
npm run dev:server
```

(Ajuste os scripts se necessário conforme seu `package.json`.)

**Endpoints principais**
- `POST /users` — criar usuário
  - Body: `{ "name": "Exemplo", "email": "a@b.com", "password": "senha" }`
  - Retorna o usuário sem o campo `password`.

- `POST /sessions` — autenticar
  - Body: `{ "email": "a@b.com", "password": "senha" }`
  - Retorna: `{ user, token }` — usar `token` para chamadas protegidas (se houver middleware de auth).

- `GET /appointments` — listar agendamentos

- `POST /appointments` — criar agendamento
  - Body: `{ "provider": "id-do-provider", "date": "2025-12-31T09:00:00.000Z" }`

**Exemplo rápido (curl)**
- Criar usuário:

```bash
curl -X POST http://localhost:3333/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"João","email":"joao@example.com","password":"123456"}'
```

- Autenticar e obter token:

```bash
curl -X POST http://localhost:3333/sessions \
  -H 'Content-Type: application/json' \
  -d '{"email":"joao@example.com","password":"123456"}'
```

- Criar agendamento:

```bash
curl -X POST http://localhost:3333/appointments \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer <TOKEN>' \
  -d '{"provider":"provider-id","date":"2025-12-31T09:00:00.000Z"}'
```

**Boas práticas presentes no projeto**
- O retorno de usuários remove o campo `password` antes de enviar a resposta.
- Erros são convertidos com `String(err)` para evitar crashs por `err.message` inexistente.

---
