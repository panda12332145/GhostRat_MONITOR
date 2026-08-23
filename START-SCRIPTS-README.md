# GhostRat Monitor - Scripts de Inicialização

Scripts para iniciar o projeto (backend + frontend) facilmente.

## 📋 Arquivos

### `start-dev.bat` (Windows)
Script batch para iniciar backend e frontend simultaneamente no Windows.

**Como usar:**
1. Clique duas vezes em `start-dev.bat`
2. Ou abra PowerShell/CMD e execute: `.\start-dev.bat`

**O que faz:**
- ✓ Verifica dependências (npm install se necessário)
- ✓ Inicia backend (Express) na porta 3001
- ✓ Inicia frontend (Vite) na porta 5173
- ✓ Abre duas janelas de terminal separadas

### `start-dev.py` (Python - Multiplataforma)
Script Python para iniciar backend e frontend simultaneamente (Windows, macOS, Linux).

**Como usar:**
```bash
python start-dev.py
```

**O que faz:**
- ✓ Verifica dependências (npm install se necessário)
- ✓ Inicia backend (Express) na porta 3001
- ✓ Inicia frontend (Vite) na porta 5173
- ✓ Monitora ambos os processos
- ✓ Pressione Ctrl+C para parar tudo de uma vez

## 🌐 Endpoints Disponíveis

Após iniciar com um dos scripts:

| Serviço | URL | Porta |
|---------|-----|-------|
| Frontend | http://localhost:5173 | 5173 |
| Backend | http://localhost:3001 | 3001 |
| API Alerts | http://localhost:3001/api/alerts | 3001 |

## 🔧 Requisitos

- Node.js (v16+)
- npm ou yarn
- Python 3.6+ (apenas para `start-dev.py`)

## 📝 Comandos Manuais (Se Preferir)

Se preferir iniciar manualmente:

```bash
# Terminal 1 - Backend
node server.js

# Terminal 2 - Frontend
npm run dev
```

## 🛠️ Troubleshooting

### Porta já em uso
Se a porta 3001 ou 5173 está em uso:

1. **Encontrar qual processo está usando:**
   ```bash
   netstat -ano | findstr :3001
   ```

2. **Matar o processo:**
   ```bash
   taskkill /PID <PID> /F
   ```

### Dependências não instaladas
Se vir erro de "module not found":

```bash
npm install
```

### Backend não inicia
Verifique se `server.js` existe na raiz do projeto e se todas as dependências estão instaladas:

```bash
npm list express cors
```

## 📦 Estrutura

```
GhostRat_MONITOR/
├── start-dev.bat          ← Script Windows
├── start-dev.py           ← Script Python
├── server.js              ← Backend Express
├── package.json           ← Dependências
├── vite.config.ts         ← Config frontend
└── src/                   ← Código frontend
```

## 💡 Dicas

- Use o script Python para melhor controle e logs
- Use o batch script para máxima compatibilidade com Windows
- Mantenha ambas as janelas/terminais abertas enquanto trabalha
- O frontend fará reload automático ao salvar arquivos
- O backend requer restart manual se mudar código
