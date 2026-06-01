import React, { useMemo, useState } from "react";
import { Button, Card, CardContent, Field, Select, TextArea, TextInput, motion } from "./components/ui.jsx";
import { Copy, Network, Plus, ShieldCheck, Trash2, iconMap } from "./lib/icons.jsx";
import {
  defaultModules,
  defaultProfiles,
  defaultServices,
  densityMap,
  fontMap,
  palettes,
  radiusMap,
  screenOptions,
  tabsConfig,
} from "./data/briefBuilderData.js";

export default function GnsSystemBriefBuilder() {
  const [step, setStep] = useState(0);
  const [copied, setCopied] = useState(false);
  const [project, setProject] = useState({ name: "", description: "", objective: "", type: "SaaS Multiempresa", org: "GNS", rootPath: "/opt/gns" });
  const [design, setDesign] = useState({ paletteName: "GNS Corporate", theme: "Claro", font: "Sans Moderno", radius: "Arredondado", navigation: "Sidebar + Navbar", density: "Normal", documentation: "Completa", ...palettes["GNS Corporate"] });
  const [screens, setScreens] = useState(["Login / Autenticação", "Dashboard", "Configurações", "Responsivo Mobile", "Responsivo Tablet"]);
  const [modules, setModules] = useState(defaultModules);
  const [profiles, setProfiles] = useState(defaultProfiles);
  const [tech, setTech] = useState({ frontend: "React", backend: "Node.js", database: "PostgreSQL", auth: "JWT", extras: "Docker, Docker Compose, Nginx reverso, logs, auditoria, .env, migrations" });
  const [backup, setBackup] = useState({ automatic: "Ativado", frequency: "Diário", retention: "Últimos 7", externalLocation: "Local / Servidor", restore: "Manual", userConfig: "Permitir configuração de backup" });
  const [roleplay, setRoleplay] = useState({
    role: "Arquiteto de Software",
    mission: "Criar um sistema completo seguindo boas práticas enterprise.",
    deliverable: "Sistema completo",
    depth: "Detalhado",
    tone: "Técnico e objetivo",
    restrictions: "Não inventar funcionalidades fora do escopo informado. Quando houver dúvida, documentar premissas.",
    outputFormat: "Prompt completo para Codex",
    focus: "Arquitetura, segurança, organização, código limpo, documentação e deploy."
  });
  const [services, setServices] = useState(defaultServices.map((service) => ({ ...service, icon: iconMap[service.icon] || Network })));
  const [completedSteps, setCompletedSteps] = useState([]);

  const previewRadius = radiusMap[design.radius] || "18px";
  const previewDensity = densityMap[design.density] || densityMap.Normal;
  const previewFont = fontMap[design.font] || "Inter, system-ui, sans-serif";

  const tabs = tabsConfig.map(([name, icon]) => [name, iconMap[icon] || Network]);

  const setPalette = (name) => setDesign({ ...design, paletteName: name, ...palettes[name] });
  const addModule = () => setModules([...modules, { name: "Novo módulo", description: "Descreva a funcionalidade deste módulo." }]);
  const addProfile = () => setProfiles([...profiles, { name: "Novo perfil", permissions: "Descreva as permissões deste perfil." }]);
  const updateService = (index, patch) => setServices(services.map((svc, i) => i === index ? { ...svc, ...patch } : svc));
  const addService = () => setServices([...services, { key: `custom-${Date.now()}`, name: "Novo serviço GNS", icon: Network, enabled: true, mode: "Usar serviço central GNS", endpoint: "", env: "GNS_SERVICE_URL", description: "Descreva o serviço comum." }]);
  const copyPrompt = async () => { await navigator.clipboard.writeText(prompt); setCopied(true); setTimeout(() => setCopied(false), 1800); };

  const enabledServices = services.filter(s => s.enabled);

  const stepRequirements = [
    {
      title: "Projeto",
      isValid: project.name.trim().length >= 2 && project.description.trim().length >= 10 && project.objective.trim().length >= 10,
      message: "Informe nome, descrição e objetivo do sistema."
    },
    {
      title: "Role Play",
      isValid: roleplay.role.trim().length >= 3 && roleplay.mission.trim().length >= 10 && roleplay.deliverable.trim().length >= 3,
      message: "Defina o papel do agente, a missão e o tipo de entrega esperada."
    },
    {
      title: "Design",
      isValid: Boolean(design.paletteName && design.theme && design.font && design.navigation && design.density),
      message: "Selecione paleta, tema, tipografia, navegação e densidade."
    },
    {
      title: "Telas",
      isValid: screens.length > 0,
      message: "Selecione pelo menos uma tela do sistema."
    },
    {
      title: "Módulos",
      isValid: modules.length > 0 && modules.every(m => m.name.trim() && m.description.trim()),
      message: "Informe pelo menos um módulo com nome e descrição."
    },
    {
      title: "Usuários",
      isValid: profiles.length > 0 && profiles.every(p => p.name.trim() && p.permissions.trim()),
      message: "Informe pelo menos um perfil de usuário com permissões."
    },
    {
      title: "Tecnologia",
      isValid: Boolean(tech.frontend && tech.backend && tech.database && tech.auth),
      message: "Selecione frontend, backend, banco de dados e autenticação."
    },
    {
      title: "Serviços GNS",
      isValid: services.length > 0,
      message: "Revise os serviços comuns GNS."
    },
    {
      title: "Estrutura",
      isValid: Boolean(project.rootPath),
      message: "Confirme a estrutura do servidor."
    },
    {
      title: "Backup",
      isValid: Boolean(backup.automatic && backup.frequency && backup.retention && backup.userConfig),
      message: "Defina política de backup e configuração pelo usuário."
    },
    {
      title: "Prompt Final",
      isValid: true,
      message: "Prompt pronto para copiar."
    },
  ];

  const currentRequirement = stepRequirements[step];
  const canGoNext = currentRequirement?.isValid;
  const progressPercent = Math.round(((step + 1) / tabs.length) * 100);
  const goNext = () => {
    if (!canGoNext) return;
    setCompletedSteps(prev => prev.includes(step) ? prev : [...prev, step]);
    setStep(Math.min(tabs.length - 1, step + 1));
  };
  const goBack = () => setStep(Math.max(0, step - 1));
  const canAccessStep = (index) => index <= step || completedSteps.includes(index - 1) || completedSteps.includes(index);

  const prompt = useMemo(() => `# BRIEFING TÉCNICO — ${project.name || "NOVO SISTEMA"}

## 1. Projeto
Nome: ${project.name || "Não informado"}
Descrição: ${project.description || "Não informado"}
Objetivo: ${project.objective || "Não informado"}
Tipo: ${project.type}
Organização: ${project.org}
Caminho raiz: ${project.rootPath}

## 2. Papel do agente / Role Play
Papel que o agente deve assumir: ${roleplay.role}
Missão principal: ${roleplay.mission}
Tipo de entrega esperada: ${roleplay.deliverable}
Nível de profundidade: ${roleplay.depth}
Tom da resposta: ${roleplay.tone}
Formato de saída: ${roleplay.outputFormat}
Foco principal: ${roleplay.focus}
Restrições e cuidados: ${roleplay.restrictions}

Instrução obrigatória para o agente:
- Antes de executar, assuma explicitamente o papel definido acima.
- Ajuste a resposta conforme o tipo de entrega esperada.
- Se a entrega for apenas diagrama de arquitetura, não criar código completo.
- Se a entrega for sistema completo, criar arquitetura, estrutura, backend, frontend, banco, Docker, documentação e instruções de execução.
- Se a entrega for documentação, priorizar clareza, organização, escopo, requisitos, fluxos e padrões técnicos.

## 3. Design / UI
Paleta: ${design.paletteName}
Primária: ${design.primary}
Secundária: ${design.secondary}
Accent: ${design.accent}
Neutra: ${design.neutral}
Background: ${design.bg}
Tema: ${design.theme}
Fonte: ${design.font}
Bordas: ${design.radius}
Navegação: ${design.navigation}
Densidade visual: ${design.density}
Documentação solicitada: ${design.documentation}

## 4. Telas obrigatórias
${screens.map(s => `- ${s}`).join("\n")}

## 5. Módulos
${modules.map(m => `- ${m.name}: ${m.description}`).join("\n")}

## 6. Perfis e permissões
${profiles.map(p => `- ${p.name}: ${p.permissions}`).join("\n")}

## 7. Tecnologia
Frontend: ${tech.frontend}
Backend: ${tech.backend}
Banco de dados: ${tech.database}
Autenticação: ${tech.auth}
Extras: ${tech.extras}

## 8. Serviços comuns GNS
O sistema deve estar preparado para consumir serviços centrais compartilhados da GNS.
Não recriar localmente funcionalidades que já existirem como serviço comum, salvo quando explicitamente definido como "implementar local".

Serviços selecionados:
${enabledServices.map(s => `- ${s.name}\n  Modo: ${s.mode}\n  Endpoint: ${s.endpoint || "Configurar via .env"}\n  Variável .env: ${s.env}\n  Descrição: ${s.description}`).join("\n")}

Regras obrigatórias para integração com serviços GNS:
- Usar variáveis de ambiente para endpoints, tokens e secrets.
- Nunca deixar URL sensível, token ou senha fixos no código.
- Criar camada de integração em backend/src/integrations/gns-services/.
- Criar clients separados para auth, logs, backup, auditoria, notificações e monitoramento.
- Criar fallback controlado caso o serviço central esteja indisponível.
- Registrar logs de falhas de integração.
- Documentar cada endpoint consumido.
- Preparar healthcheck dos serviços externos.
- Separar configuração por ambiente: development, staging e production.

## 9. Estrutura obrigatória
${project.rootPath}/sistemas/NOME-SISTEMA/
├── frontend/
├── backend/
│   └── src/
│       ├── integrations/
│       │   └── gns-services/
│       │       ├── auth.client.js
│       │       ├── logs.client.js
│       │       ├── backup.client.js
│       │       ├── audit.client.js
│       │       └── notifications.client.js
│       ├── controllers/
│       ├── services/
│       ├── routes/
│       └── middleware/
├── docs/
├── scripts/
├── docker/
├── nginx/
├── logs/
├── .env.example
└── docker-compose.yml

/mnt/dados/NOME-SISTEMA/
├── cliente-001/
└── cliente-002/

## 10. Backup
Backup automático: ${backup.automatic}
Frequência: ${backup.frequency}
Retenção: ${backup.retention}
Local externo: ${backup.externalLocation}
Restauração: ${backup.restore}
Configuração pelo usuário no sistema: ${backup.userConfig}

Regras obrigatórias de backup:
- Separar backup de database e storage.
- Em sistemas multiempresa, separar backup por cliente/tenant.
- Se o serviço Backup GNS estiver ativado, integrar com ele em vez de criar rotina isolada duplicada.
- Criar script local apenas como fallback ou executor.
- Não armazenar senha fixa no código.
- Registrar logs de sucesso e falha do backup.
- Manter arquivo latest para último backup válido.

## 11. Segurança
- Senhas devem usar hash seguro com bcrypt ou argon2.
- Secrets, tokens e endpoints devem ficar no .env.
- Rotas protegidas por autenticação e autorização.
- Rate limit no login.
- Logs de acesso e falha.
- Auditoria para ações críticas.

## 12. Entrega esperada
Criar o sistema seguindo este briefing como fonte única de verdade, com integração preparada para os serviços comuns GNS. Não inventar módulos, telas ou integrações fora deste escopo sem confirmação.`, [project, roleplay, design, screens, modules, profiles, tech, backup, services]);

  return <div className="min-h-screen bg-slate-100 text-slate-900">
    <header className="sticky top-0 z-10 border-b bg-[#111] text-white shadow-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 lg:flex-row lg:items-center lg:justify-between">
        <div><p className="text-xs tracking-[0.35em] text-slate-400">GNS SYSTEM</p><h1 className="text-2xl font-black">Brief Builder</h1><p className="text-sm text-slate-400">Monte o briefing visual, técnico e as integrações comuns antes de enviar ao Codex.</p></div>
        <div className="flex flex-wrap gap-2">{tabs.map(([name, Icon], i) => {
          const locked = i > step && !completedSteps.includes(i - 1);
          return <Button key={name} disabled={locked} onClick={() => !locked && setStep(i)} variant={step === i ? "secondary" : "outline"} className={step === i ? "bg-white text-black" : locked ? "border-slate-800 bg-transparent text-slate-600" : "border-slate-700 bg-transparent text-white hover:bg-slate-800"}><Icon className="mr-2 h-4 w-4" />{completedSteps.includes(i) ? "✅ " : locked ? "🔒 " : ""}{name}</Button>
        })}</div>
      </div>
    </header>

    <main className="mx-auto max-w-7xl px-6 py-8">
      <div className="mb-6 rounded-3xl border bg-white p-5 shadow-sm">
        <div className="mb-3 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Fluxo guiado</p>
            <h2 className="text-xl font-black">Etapa {step + 1} de {tabs.length}: {currentRequirement?.title}</h2>
          </div>
          <span className={`rounded-full px-4 py-2 text-sm font-bold ${canGoNext ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{canGoNext ? "Etapa completa" : "Pendente"}</span>
        </div>
        <div className="h-3 overflow-hidden rounded-full bg-slate-100"><div className="h-full bg-black transition-all" style={{ width: `${progressPercent}%` }} /></div>
        {!canGoNext && <p className="mt-3 text-sm font-medium text-amber-700">⚠️ {currentRequirement?.message}</p>}
      </div>
      <motion.div key={step} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.2 }}>
        <Card className="rounded-3xl border-0 shadow-sm"><CardContent className="p-7">
          {step === 0 && <section className="space-y-8"><div><h2 className="text-3xl font-black">🏗️ Projeto + Estrutura do Sistema</h2><p className="text-slate-500">Defina o objetivo do sistema e o padrão de organização no servidor.</p></div><div className="rounded-3xl border bg-white p-6 space-y-5"><h3 className="text-xl font-black">📌 Sobre o Projeto</h3><div className="grid gap-5 md:grid-cols-2"><Field label="Nome do sistema"><TextInput placeholder="Ex: GNS ERP" value={project.name} onChange={e => setProject({ ...project, name: e.target.value })} /></Field><Field label="Tipo de sistema"><Select value={project.type} onChange={e => setProject({ ...project, type: e.target.value })}><option>SaaS Multiempresa</option><option>Sistema Interno</option><option>Cliente Único</option></Select></Field><Field label="Organização"><TextInput value={project.org} onChange={e => setProject({ ...project, org: e.target.value })} /></Field><Field label="Caminho raiz"><TextInput value={project.rootPath} onChange={e => setProject({ ...project, rootPath: e.target.value })} /></Field></div><Field label="Descrição curta"><TextArea placeholder="O que este sistema faz? Para quem é destinado?" value={project.description} onChange={e => setProject({ ...project, description: e.target.value })} /></Field><Field label="Objetivo principal"><TextArea placeholder="Qual problema principal ele resolve?" value={project.objective} onChange={e => setProject({ ...project, objective: e.target.value })} /></Field></div><div className="rounded-3xl bg-slate-950 p-6 text-slate-100"><h3 className="mb-5 text-sm font-black uppercase tracking-[0.25em] text-slate-400">Preview — Estrutura no servidor</h3><pre className="overflow-auto text-sm leading-7 text-cyan-200">{`${project.rootPath || "/opt/gns"}/
├── sistemas/
│   └── nome-sistema/
│       ├── frontend/
│       ├── backend/
│       ├── docs/
│       ├── scripts/
│       └── logs/
├── database/
└── backups/`}</pre></div></section>}

          {step === 1 && <section className="space-y-8"><div><h2 className="text-3xl font-black">🎭 Role Play do Agente</h2><p className="text-slate-500">Defina qual papel o agente deve assumir e qual tipo de entrega você espera. Isso muda completamente o prompt final.</p></div><div className="rounded-3xl border bg-white p-6 space-y-6"><div><h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-slate-400">Papel do agente</h3><div className="flex flex-wrap gap-3">{["Arquiteto de Software","Engenheiro de Software","Engenheiro DevOps","Especialista em Segurança","Analista de Requisitos","UX/UI Designer","Documentador Técnico","Engenheiro de Prompt"].map(item => <button key={item} onClick={() => setRoleplay({...roleplay, role:item})} className={`rounded-full px-6 py-3 font-bold ${roleplay.role === item ? "bg-black text-white" : "border bg-white"}`}>{item}</button>)}</div></div><div><h3 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-slate-400">Tipo de entrega esperada</h3><div className="grid gap-3 md:grid-cols-3">{["Sistema completo","Somente diagrama de arquitetura","Somente documentação","Prompt técnico para Codex","Análise técnica","Planejamento de desenvolvimento","Checklist de implementação","MVP inicial"].map(item => <button key={item} onClick={() => setRoleplay({...roleplay, deliverable:item})} className={`rounded-2xl border p-5 text-left font-bold ${roleplay.deliverable === item ? "border-black bg-black text-white" : "border-slate-200 bg-white"}`}>{item}</button>)}</div></div><div className="grid gap-5 md:grid-cols-2"><Field label="Missão principal"><TextArea value={roleplay.mission} onChange={e => setRoleplay({...roleplay, mission:e.target.value})} placeholder="Ex: Criar um diagrama de arquitetura claro para orientar o desenvolvimento do sistema." /></Field><Field label="Foco principal"><TextArea value={roleplay.focus} onChange={e => setRoleplay({...roleplay, focus:e.target.value})} placeholder="Ex: Segurança, multi-tenant, integração com serviços GNS, backup e deploy." /></Field></div><div className="grid gap-5 md:grid-cols-3"><Field label="Nível de profundidade"><Select value={roleplay.depth} onChange={e => setRoleplay({...roleplay, depth:e.target.value})}><option>Objetivo</option><option>Detalhado</option><option>Enterprise / Profundo</option></Select></Field><Field label="Tom da resposta"><Select value={roleplay.tone} onChange={e => setRoleplay({...roleplay, tone:e.target.value})}><option>Técnico e objetivo</option><option>Executivo e estratégico</option><option>Didático passo a passo</option><option>Direto para implementação</option></Select></Field><Field label="Formato de saída"><Select value={roleplay.outputFormat} onChange={e => setRoleplay({...roleplay, outputFormat:e.target.value})}><option>Prompt completo para Codex</option><option>Documento técnico</option><option>Checklist</option><option>Diagrama textual</option><option>Plano de execução por etapas</option></Select></Field></div><Field label="Restrições e cuidados"><TextArea value={roleplay.restrictions} onChange={e => setRoleplay({...roleplay, restrictions:e.target.value})} /></Field></div><div className="rounded-3xl bg-slate-950 p-6 text-slate-100"><h3 className="mb-3 text-xl font-black">Como isso altera o prompt?</h3><p className="text-slate-300">Se você escolher “Arquiteto de Software” + “Somente diagrama de arquitetura”, o prompt final vai orientar o agente a criar apenas arquitetura, sem sair programando o sistema completo.</p></div></section>}

          {step === 2 && <section className="space-y-6"><h2 className="text-3xl font-black">🎨 Design System</h2><p className="text-slate-500">Defina a identidade visual padrão aplicada em todas as telas do sistema.</p><div className="rounded-3xl border bg-white p-6"><h3 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-slate-400">Paleta de cores</h3><div className="grid gap-3 md:grid-cols-3">{Object.entries(palettes).map(([name, colors]) => <button key={name} onClick={() => setPalette(name)} className={`rounded-2xl border p-4 text-left transition-all ${design.paletteName === name ? "border-black bg-black text-white" : "border-slate-200 bg-white"}`}><div className="mb-3 flex gap-2">{[colors.primary, colors.secondary, colors.accent, colors.bg].map(c => <span key={c} className="h-4 w-4 rounded-full border" style={{ background: c }} />)}</div><div className="font-bold">{name}</div></button>)}</div><div className="mt-6 rounded-3xl border bg-slate-50 p-6"><div className="mb-4"><h4 className="text-lg font-black text-slate-900">Preview do sistema</h4><p className="text-sm text-slate-500">Apenas os componentes internos mudam conforme tipografia, bordas e densidade visual.</p></div><div style={{ borderRadius: '24px', background: design.bg, padding: previewDensity.cardPadding, fontFamily: previewFont }}><div className="flex flex-wrap items-center" style={{ gap: previewDensity.gap }}><button className="font-bold text-white" style={{ background: design.primary, borderRadius: previewRadius, padding: previewDensity.padding }}>Primário</button><button className="border-2 font-bold" style={{ borderColor: design.primary, color: design.primary, borderRadius: previewRadius, padding: previewDensity.padding }}>Outline</button><button className="font-bold text-white" style={{ background: design.accent, borderRadius: previewRadius, padding: previewDensity.padding }}>Accent</button><span style={{ color: design.text }}>Texto em {design.font}</span></div></div><div className="mt-6"><h4 className="mb-4 text-sm font-black uppercase tracking-[0.2em] text-slate-400">Ajuste fino</h4><div className="flex flex-wrap gap-5">{["primary", "secondary", "accent", "bg", "text"].map(k => <div key={k} className="space-y-2 text-center"><input type="color" value={design[k]} onChange={e => setDesign({ ...design, [k]: e.target.value })} className="h-14 w-14 rounded-2xl border" /><div className="text-xs text-slate-500 capitalize">{k}</div></div>)}</div></div></div></div><div className="grid gap-6 md:grid-cols-2"><div className="rounded-3xl border bg-white p-6 space-y-5"><h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Tema</h3><div className="flex flex-wrap gap-3">{["Claro", "Escuro", "Automático"].map(item => <button key={item} onClick={() => setDesign({ ...design, theme: item })} className={`rounded-full px-6 py-3 font-bold ${design.theme === item ? "bg-black text-white" : "border bg-white"}`}>{item}</button>)}</div><h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Tipografia</h3><div className="flex flex-wrap gap-3">{["Sans Moderno", "Serif Clássico", "Mono / Tech", "Geométrico"].map(item => <button key={item} onClick={() => setDesign({ ...design, font: item })} className={`rounded-full px-6 py-3 font-bold ${design.font === item ? "bg-black text-white" : "border bg-white"}`}>{item}</button>)}</div></div><div className="rounded-3xl border bg-white p-6 space-y-5"><h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Layout e navegação</h3><div className="flex flex-wrap gap-3">{["Sidebar", "Navbar", "Sidebar + Navbar"].map(item => <button key={item} onClick={() => setDesign({ ...design, navigation: item })} className={`rounded-full px-6 py-3 font-bold ${design.navigation === item ? "bg-black text-white" : "border bg-white"}`}>{item}</button>)}</div><h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Bordas</h3><div className="flex flex-wrap gap-3">{["Quadrado", "Suave", "Arredondado", "Muito redondo"].map(item => <button key={item} onClick={() => setDesign({ ...design, radius: item })} className={`rounded-full px-6 py-3 font-bold ${design.radius === item ? "bg-black text-white" : "border bg-white"}`}>{item}</button>)}</div><h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">Densidade visual</h3><div className="flex flex-wrap gap-3">{["Compacta", "Normal", "Espaçada"].map(item => <button key={item} onClick={() => setDesign({ ...design, density: item })} className={`rounded-full px-6 py-3 font-bold ${design.density === item ? "bg-black text-white" : "border bg-white"}`}>{item}</button>)}</div></div></div></section>}

          {step === 3 && <section className="space-y-5"><h2 className="text-3xl font-black">🖥️ Telas</h2><div className="grid gap-3 md:grid-cols-4">{screenOptions.map(s => <button key={s} onClick={() => setScreens(screens.includes(s) ? screens.filter(x => x !== s) : [...screens, s])} className={`rounded-2xl border p-4 text-left font-bold ${screens.includes(s) ? "border-teal-700 bg-teal-50 text-teal-900" : "border-slate-200 bg-white"}`}>{screens.includes(s) ? "✅" : "⬜"} {s}</button>)}</div></section>}

          {step === 4 && <section className="space-y-5"><div className="flex items-center justify-between"><h2 className="text-3xl font-black">📦 Módulos</h2><Button onClick={addModule}><Plus className="mr-2 h-4 w-4" />Adicionar</Button></div>{modules.map((m, i) => <div key={i} className="grid gap-3 rounded-2xl border bg-white p-4 md:grid-cols-[1fr_2fr_auto]"><TextInput value={m.name} onChange={e => { const copy=[...modules]; copy[i].name=e.target.value; setModules(copy); }} /><TextInput value={m.description} onChange={e => { const copy=[...modules]; copy[i].description=e.target.value; setModules(copy); }} /><Button variant="outline" onClick={() => setModules(modules.filter((_,idx)=>idx!==i))}><Trash2 className="h-4 w-4" /></Button></div>)}</section>}

          {step === 5 && <section className="space-y-5"><div className="flex items-center justify-between"><h2 className="text-3xl font-black">👥 Usuários</h2><Button onClick={addProfile}><Plus className="mr-2 h-4 w-4" />Adicionar</Button></div>{profiles.map((p, i) => <div key={i} className="grid gap-3 rounded-2xl border bg-white p-4 md:grid-cols-[1fr_2fr_auto]"><TextInput value={p.name} onChange={e => { const copy=[...profiles]; copy[i].name=e.target.value; setProfiles(copy); }} /><TextInput value={p.permissions} onChange={e => { const copy=[...profiles]; copy[i].permissions=e.target.value; setProfiles(copy); }} /><Button variant="outline" onClick={() => setProfiles(profiles.filter((_,idx)=>idx!==i))}><Trash2 className="h-4 w-4" /></Button></div>)}</section>}

          {step === 6 && <section className="space-y-8"><div><h2 className="text-3xl font-black">⚙️ Stack Tecnológica</h2><p className="text-slate-500">Defina as tecnologias para que o código seja gerado na stack correta.</p></div>{[["Frontend", ["React","Vue","Angular","Next.js","HTML/CSS puro","Outro"], "frontend"], ["Backend / API", ["Node.js","Python / Django","Python / FastAPI","Laravel / PHP","Spring Boot",".NET","Outro"], "backend"], ["Banco de Dados", ["PostgreSQL","MySQL","MongoDB","SQLite","Firebase","Supabase","Outro"], "database"], ["Autenticação", ["JWT","OAuth2 / Social Login","Sessão + Cookie","Magic Link","Keycloak / SSO"], "auth"]].map(([title, items, key]) => <div key={title} className="rounded-3xl border bg-white p-6"><h3 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-slate-400">{title}</h3><div className="flex flex-wrap gap-3">{items.map(item => <button key={item} onClick={() => setTech({...tech, [key]:item})} className={`rounded-full px-6 py-3 font-bold ${tech[key].includes(item) ? "bg-black text-white" : "border bg-white"}`}>{item}</button>)}</div></div>)}<div className="rounded-3xl border bg-white p-6"><h3 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-slate-400">Extras / Observações</h3><TextArea placeholder="Ex: Tailwind CSS, Redis, WebSocket, filas, IA..." value={tech.extras} onChange={e=>setTech({...tech, extras:e.target.value})} /></div></section>}

          {step === 7 && <section className="space-y-8"><div><h2 className="text-3xl font-black">🔗 Serviços Comuns GNS</h2><p className="text-slate-500">Defina se este sistema vai consumir serviços centrais compartilhados da GNS em vez de recriar tudo dentro do projeto.</p></div><div className="rounded-3xl bg-slate-950 p-6 text-white"><h3 className="mb-2 text-xl font-black">Padrão recomendado</h3><p className="text-slate-300">Sistemas novos devem apontar para serviços comuns sempre que possível: autenticação, logs, backup, auditoria, notificações e monitoramento.</p></div><div className="grid gap-5">{services.map((svc, i) => { const Icon = svc.icon || Network; return <div key={svc.key} className={`rounded-3xl border p-6 ${svc.enabled ? "bg-white" : "bg-slate-50 opacity-70"}`}><div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between"><div className="flex gap-4"><div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${svc.enabled ? "bg-black text-white" : "bg-slate-200"}`}><Icon className="h-6 w-6" /></div><div><h3 className="text-xl font-black">{svc.name}</h3><p className="text-sm text-slate-500">{svc.description}</p></div></div><button onClick={() => updateService(i, { enabled: !svc.enabled })} className={`rounded-full px-5 py-3 font-bold ${svc.enabled ? "bg-emerald-600 text-white" : "border bg-white"}`}>{svc.enabled ? "✅ Ativo" : "⬜ Desativado"}</button></div>{svc.enabled && <div className="mt-6 grid gap-4 md:grid-cols-2"><Field label="Modo de uso"><Select value={svc.mode} onChange={e => updateService(i, { mode: e.target.value })}><option>Usar serviço central GNS</option><option>Implementar local neste sistema</option><option>Híbrido: serviço central + fallback local</option><option>Não usar neste projeto</option></Select></Field><Field label="Variável .env"><TextInput value={svc.env} onChange={e => updateService(i, { env: e.target.value })} /></Field><Field label="Endpoint / URL do serviço"><TextInput value={svc.endpoint} onChange={e => updateService(i, { endpoint: e.target.value })} /></Field><Field label="Descrição"><TextInput value={svc.description} onChange={e => updateService(i, { description: e.target.value })} /></Field></div>}</div>})}</div><button onClick={addService} className="w-full rounded-3xl border-2 border-dashed border-slate-300 py-5 text-lg font-bold text-slate-600 hover:border-slate-500 hover:bg-white">+ Adicionar serviço comum GNS</button></section>}

          {step === 8 && <section className="space-y-5"><h2 className="text-3xl font-black">📁 Estrutura</h2><pre className="overflow-auto rounded-2xl bg-slate-950 p-5 text-sm text-slate-100">{`${project.rootPath}/sistemas/NOME-SISTEMA/
├── frontend/
├── backend/
│   └── src/
│       └── integrations/
│           └── gns-services/
├── docs/
├── scripts/
├── docker/
├── nginx/
├── logs/
├── .env.example
└── docker-compose.yml

/mnt/dados/NOME-SISTEMA/
├── cliente-001/
└── cliente-002/`}</pre></section>}

          {step === 9 && <section className="space-y-8"><div><h2 className="text-3xl font-black">💾 Política de Backup</h2><p className="text-slate-500">Configure backups automáticos, retenção, destinos e se o sistema permitirá configuração dinâmica pelo usuário.</p></div><div className="rounded-3xl border bg-white p-6 space-y-8"><div><h3 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-slate-400">Backup automático</h3><div className="flex flex-wrap gap-3">{["Ativado","Apenas manual"].map(item => <button key={item} onClick={() => setBackup({...backup, automatic:item})} className={`rounded-full px-6 py-3 font-bold ${backup.automatic === item ? "bg-black text-white" : "border bg-white"}`}>{item === "Ativado" ? "✅" : "⛔"} {item}</button>)}</div></div><div><h3 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-slate-400">Frequência</h3><div className="flex flex-wrap gap-3">{["Diário","Semanal","Quinzenal","Mensal"].map(item => <button key={item} onClick={() => setBackup({...backup, frequency:item})} className={`rounded-full px-6 py-3 font-bold ${backup.frequency === item ? "bg-black text-white" : "border bg-white"}`}>🗓️ {item}</button>)}</div></div></div><div className="rounded-3xl border bg-white p-6"><h3 className="mb-5 text-sm font-black uppercase tracking-[0.2em] text-slate-400">Retenção</h3><div className="flex flex-wrap gap-3">{[3,5,7,10,15,30].map(item => <button key={item} onClick={() => setBackup({...backup, retention:`Últimos ${item}`})} className={`rounded-full px-6 py-3 font-bold ${backup.retention === `Últimos ${item}` ? "bg-black text-white" : "border bg-white"}`}>Últimos {item}</button>)}</div></div><div className="rounded-3xl border bg-white p-6 space-y-5"><h3 className="text-xl font-black">⚙️ Configuração pelo Usuário no Sistema</h3><div className="flex flex-wrap gap-3">{["Permitir configuração de backup","Somente técnico/admin","Sem acesso pelo sistema"].map(item => <button key={item} onClick={() => setBackup({...backup, userConfig:item})} className={`rounded-full px-6 py-3 font-bold ${backup.userConfig === item ? "bg-black text-white" : "border bg-white"}`}>🛠️ {item}</button>)}</div></div><div className="rounded-2xl bg-amber-50 p-4 text-sm text-amber-900"><ShieldCheck className="mb-2 h-5 w-5" />Se o serviço Backup GNS estiver ativo, o sistema deve integrar com ele e não duplicar rotina isolada sem necessidade.</div></section>}

          {step === 10 && <section className="space-y-5"><div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"><h2 className="text-3xl font-black">🚀 Prompt Final</h2><Button onClick={copyPrompt} className="bg-black text-white hover:bg-slate-800"><Copy className="mr-2 h-4 w-4" />{copied ? "Copiado!" : "Copiar prompt"}</Button></div><pre className="max-h-[620px] overflow-auto whitespace-pre-wrap rounded-2xl bg-slate-950 p-5 text-sm leading-6 text-slate-100">{prompt}</pre></section>}
        </CardContent></Card>
      </motion.div>

      <div className="mt-6 flex flex-col gap-3 rounded-3xl border bg-white p-5 md:flex-row md:items-center md:justify-between">
        <Button disabled={step === 0} variant="outline" onClick={goBack}>← Anterior</Button>
        <div className="text-center text-sm text-slate-500">{step === tabs.length - 1 ? "Revise e copie o prompt final." : canGoNext ? "Tudo certo nesta etapa. Pode avançar." : currentRequirement?.message}</div>
        <Button disabled={!canGoNext} onClick={goNext} className={!canGoNext ? "opacity-50" : "bg-black text-white hover:bg-slate-800"}>{step === tabs.length - 1 ? "Finalizado" : "Salvar etapa e avançar →"}</Button>
      </div>
    </main>
  </div>;
}
