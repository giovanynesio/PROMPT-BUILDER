const makeIcon = (symbol) => function Icon({ className = "" }) {
  return <span className={`inline-flex items-center justify-center ${className}`}>{symbol}</span>;
};

export const Copy = makeIcon("Copiar");
export const Settings = makeIcon("Config");
export const Database = makeIcon("BD");
export const Palette = makeIcon("Cor");
export const Monitor = makeIcon("Tela");
export const Boxes = makeIcon("Mod");
export const Users = makeIcon("User");
export const Rocket = makeIcon("Go");
export const FolderTree = makeIcon("Dir");
export const ShieldCheck = makeIcon("Seg");
export const Plus = makeIcon("+");
export const Trash2 = makeIcon("X");
export const Network = makeIcon("Net");
export const KeyRound = makeIcon("Key");
export const FileText = makeIcon("Doc");
export const Bell = makeIcon("Aviso");
export const Activity = makeIcon("Status");

export const iconMap = {
  Copy,
  Settings,
  Database,
  Palette,
  Monitor,
  Boxes,
  Users,
  Rocket,
  FolderTree,
  ShieldCheck,
  Plus,
  Trash2,
  Network,
  KeyRound,
  FileText,
  Bell,
  Activity,
};
