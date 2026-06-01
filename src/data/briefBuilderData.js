export const palettes = {
  "GNS Corporate": { primary: "#09343d", secondary: "#1b717d", accent: "#0ea5a4", neutral: "#3f3f3f", bg: "#f5f7fa", text: "#111827" },
  "Dark Premium": { primary: "#0f172a", secondary: "#334155", accent: "#6366f1", neutral: "#64748b", bg: "#020617", text: "#f8fafc" },
  "Verde Saúde": { primary: "#064e3b", secondary: "#10b981", accent: "#34d399", neutral: "#4b5563", bg: "#f0fdf4", text: "#111827" },
  "Laranja Energia": { primary: "#9a3412", secondary: "#ea580c", accent: "#f59e0b", neutral: "#4b5563", bg: "#fff7ed", text: "#111827" },
  "Roxo Moderno": { primary: "#581c87", secondary: "#a855f7", accent: "#ec4899", neutral: "#52525b", bg: "#faf5ff", text: "#111827" },
  "Cinza Neutro": { primary: "#1f2937", secondary: "#6b7280", accent: "#3b82f6", neutral: "#9ca3af", bg: "#f9fafb", text: "#111827" },
};

export const screenOptions = [
  "Login / Autenticação", "Dashboard", "Listagem / Tabela", "Formulário — Cadastro", "Formulário — Edição", "Detalhe / Visualização", "Modal / Popup", "Perfil do Usuário", "Configurações", "Relatório / Gráficos", "Notificações", "Kanban / Board", "Calendário", "Chat / Mensagens", "Upload de Arquivos", "Página de Erro", "Responsivo Mobile", "Responsivo Tablet", "PWA / App Instalável", "Modo Offline"
];

export const defaultModules = [
  { name: "Clientes", description: "Cadastro, edição, consulta e histórico de clientes." },
  { name: "Dashboard", description: "Indicadores principais do sistema em tempo real." },
];

export const defaultProfiles = [
  { name: "Administrador", permissions: "Acesso total ao sistema, usuários, permissões, configurações e relatórios." },
  { name: "Operador", permissions: "Acesso operacional aos módulos liberados, sem alterar configurações críticas." },
];

export const defaultServices = [
  { key: "auth", name: "Autenticação GNS", icon: "KeyRound", enabled: true, mode: "Usar serviço central GNS", endpoint: "https://auth.gns.local", env: "GNS_AUTH_URL", description: "Login, senha, JWT, refresh token, perfis, permissões e recuperação de senha." },
  { key: "logs", name: "Logs Centralizados", icon: "FileText", enabled: true, mode: "Usar serviço central GNS", endpoint: "https://logs.gns.local", env: "GNS_LOG_URL", description: "Recebe logs de aplicação, erros, acessos, eventos críticos e auditoria técnica." },
  { key: "backup", name: "Backup GNS", icon: "Database", enabled: true, mode: "Usar serviço central GNS", endpoint: "https://backup.gns.local", env: "GNS_BACKUP_URL", description: "Agenda backups, retenção, destinos, restore por cliente e validação automática." },
  { key: "audit", name: "Auditoria", icon: "ShieldCheck", enabled: true, mode: "Usar serviço central GNS", endpoint: "https://audit.gns.local", env: "GNS_AUDIT_URL", description: "Registra quem fez, quando fez, antes/depois e origem da alteração." },
  { key: "notifications", name: "Notificações", icon: "Bell", enabled: false, mode: "Usar serviço central GNS", endpoint: "https://notify.gns.local", env: "GNS_NOTIFY_URL", description: "E-mail, WhatsApp, push, alertas internos e notificações administrativas." },
  { key: "monitoring", name: "Monitoramento", icon: "Activity", enabled: false, mode: "Usar serviço central GNS", endpoint: "https://monitor.gns.local", env: "GNS_MONITOR_URL", description: "Healthcheck, uptime, métricas, fila, performance e alertas de indisponibilidade." },
];

export const radiusMap = { "Quadrado": "0px", "Suave": "8px", "Arredondado": "18px", "Muito redondo": "999px" };

export const densityMap = {
  "Compacta": { padding: "8px 14px", gap: "8px", cardPadding: "18px" },
  "Normal": { padding: "12px 24px", gap: "16px", cardPadding: "24px" },
  "Espaçada": { padding: "18px 32px", gap: "24px", cardPadding: "34px" },
};

export const fontMap = {
  "Sans Moderno": "Inter, system-ui, sans-serif",
  "Serif Clássico": "Georgia, serif",
  "Mono / Tech": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  "Geométrico": "Montserrat, Poppins, system-ui, sans-serif",
};

export const tabsConfig = [
  ["Projeto", "Monitor"],
  ["Role Play", "Users"],
  ["Design", "Palette"],
  ["Telas", "Monitor"],
  ["Módulos", "Boxes"],
  ["Usuários", "Users"],
  ["Tecnologia", "Settings"],
  ["Serviços GNS", "Network"],
  ["Estrutura", "FolderTree"],
  ["Backup", "Database"],
  ["Prompt Final", "Rocket"],
];
