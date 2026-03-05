// filename: src/components/AvatarPicker.jsx
import { useState } from "react";

const CATALOG = ["🦊","🐼","🐸","🐯","🐝","🐧","🦄","🐶","🐱","🐰","🐻","🦉","🐵","🐨","🐹","🐙","🦁","🐮"];

export default function AvatarPicker({ value, onChange }) {
  const [tab, setTab] = useState("catalog"); // 'catalog' | 'upload'

  const handleFile = async (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => onChange(reader.result); // dataURL
    reader.readAsDataURL(file);
  };

  return (
    <div className="rounded-xl border border-slate-200 p-3">
      <div className="flex gap-2 mb-3">
        <button
          type="button"
          onClick={() => setTab("catalog")}
          className={`px-3 py-1 rounded-lg text-sm font-semibold ${tab==="catalog" ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
        >
          Catálogo
        </button>
        <button
          type="button"
          onClick={() => setTab("upload")}
          className={`px-3 py-1 rounded-lg text-sm font-semibold ${tab==="upload" ? "bg-indigo-500 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
        >
          Upload
        </button>
      </div>

      {tab === "catalog" ? (
        <div className="grid grid-cols-8 gap-2">
          {CATALOG.map((e, i) => {
            const selected = value === `emoji:${e}`;
            return (
              <button
                key={i}
                type="button"
                onClick={() => onChange(`emoji:${e}`)}
                className={`h-10 rounded-lg border text-xl ${selected ? "border-indigo-500 bg-indigo-50" : "border-slate-200 hover:bg-slate-100"}`}
                title={e}
              >
                {e}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="space-y-2">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleFile(e.target.files?.[0])}
            className="block w-full text-sm text-slate-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
          <p className="text-xs text-slate-500">Dica: use imagens quadradas (128×128, 256×256) para melhor resultado.</p>
        </div>
      )}
    </div>
  );
}