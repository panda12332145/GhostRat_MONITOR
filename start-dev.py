#!/usr/bin/env python3
"""
GhostRat Monitor - Development Server Launcher
Inicia o frontend (Vite) e backend (Express) simultaneamente
"""

import subprocess
import sys
import os
import time
from pathlib import Path

def main():
    # Cores para output
    CYAN = '\033[96m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    RESET = '\033[0m'
    
    project_root = Path(__file__).parent
    os.chdir(project_root)
    
    print(f"\n{CYAN}{'='*60}")
    print(f"{'GhostRat Monitor - Development Server Launcher':^60}")
    print(f"{'='*60}{RESET}\n")
    
    # Verificar se node_modules existe
    if not (project_root / 'node_modules').exists():
        print(f"{YELLOW}📦 Instalando dependências...{RESET}")
        result = subprocess.run([sys.executable, '-m', 'pip', 'list'], capture_output=True)
        subprocess.run(['npm', 'install'], cwd=project_root)
        print(f"{GREEN}✓ Dependências instaladas{RESET}\n")
    
    # Processos a serem iniciados
    processes = []
    
    try:
        print(f"{CYAN}🚀 Iniciando servidores...{RESET}\n")
        
        # Iniciar Backend (Express)
        print(f"{YELLOW}→ Backend (Express) na porta 3001...{RESET}")
        backend_process = subprocess.Popen(
            ['node', 'server.js'],
            cwd=project_root,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        processes.append(('Backend', backend_process))
        
        # Aguardar um pouco para o backend iniciar
        time.sleep(2)
        
        # Iniciar Frontend (Vite)
        print(f"{YELLOW}→ Frontend (Vite) na porta 5173...{RESET}\n")
        frontend_process = subprocess.Popen(
            ['npm', 'run', 'dev'],
            cwd=project_root,
            stdout=subprocess.PIPE,
            stderr=subprocess.STDOUT,
            text=True,
            bufsize=1
        )
        processes.append(('Frontend', frontend_process))
        
        print(f"{GREEN}✓ Servidores iniciados com sucesso!{RESET}\n")
        print(f"{CYAN}{'='*60}")
        print(f"{'ENDPOINTS':^60}")
        print(f"{'='*60}")
        print(f"  Frontend:  {GREEN}http://localhost:5173{RESET}")
        print(f"  Backend:   {GREEN}http://localhost:3001{RESET}")
        print(f"  API:       {GREEN}http://localhost:3001/api{RESET}")
        print(f"{CYAN}{'='*60}\n")
        print(f"{YELLOW}Pressione Ctrl+C para parar os servidores{RESET}\n")
        
        # Monitorar processos
        while True:
            for name, process in processes:
                if process.poll() is not None:
                    print(f"{RED}✗ {name} foi encerrado com código {process.returncode}{RESET}")
            time.sleep(1)
    
    except KeyboardInterrupt:
        print(f"\n{YELLOW}⏹  Encerrando servidores...{RESET}")
        for name, process in processes:
            try:
                process.terminate()
                process.wait(timeout=5)
                print(f"  ✓ {name} encerrado")
            except subprocess.TimeoutExpired:
                process.kill()
                print(f"  ✓ {name} finalizado (forçado)")
        print(f"{GREEN}✓ Tudo encerrado{RESET}\n")
    
    except Exception as e:
        print(f"{RED}✗ Erro: {e}{RESET}")
        for name, process in processes:
            try:
                process.kill()
            except:
                pass
        sys.exit(1)

if __name__ == '__main__':
    main()
