export function Button({ children, className = "", variant, ...props }) {
  const base = "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-bold transition disabled:cursor-not-allowed disabled:opacity-50";
  const style = variant === "outline" ? "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50" : "bg-slate-900 text-white hover:bg-slate-700";
  return <button className={`${base} ${style} ${className}`} {...props}>{children}</button>;
}

export function Card({ children, className = "" }) {
  return <div className={`rounded-2xl border bg-white ${className}`}>{children}</div>;
}

export function CardContent({ children, className = "" }) {
  return <div className={className}>{children}</div>;
}

export function Field({ label, children }) {
  return <label className="block space-y-2"><span className="text-xs font-bold tracking-[0.18em] text-slate-500 uppercase">{label}</span>{children}</label>;
}

export function TextInput(props) {
  return <input {...props} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-600" />;
}

export function TextArea(props) {
  return <textarea {...props} className="min-h-24 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-600" />;
}

export function Select(props) {
  return <select {...props} className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-teal-600" />;
}

export const motion = {
  div: ({ children, ...props }) => <div {...props}>{children}</div>,
};
