"use client";



export function MaterialTile({
  materialId,
  name,
  preview,
  isSelected,
  disabled,
  onPick,
}: {
  materialId: string;
  name: string;
  preview: string; // data uri
  isSelected: boolean;
  disabled?: boolean;
  onPick: () => void;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onPick}
      className={
        "group relative rounded-2xl border p-2 text-left transition " +
        (disabled
          ? "cursor-not-allowed border-white/10 bg-black/20 opacity-60"
          : isSelected
            ? "border-cyan-300/60 bg-black/25 shadow-[0_0_0_1px_rgba(34,211,238,0.15)]"
            : "border-white/10 bg-black/20 hover:border-white/25")
      }
      aria-pressed={isSelected}
      aria-label={`Apply ${name} material`}
      title={disabled ? "Select an element first" : `Apply ${name}`}
    >
      <div className="flex items-center gap-2">
        <div className="relative h-12 w-12 overflow-hidden rounded-xl border border-white/10 bg-black/30">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={preview} alt="" className="h-full w-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[11px] font-semibold text-zinc-200">{name}</p>
          <p className="mt-1 text-[10px] text-zinc-500">{materialId}</p>
        </div>
      </div>
      {isSelected ? (
        <div className="pointer-events-none absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-cyan-300 shadow-[0_0_0_2px_rgba(34,211,238,0.25)]" />
      ) : null}
    </button>
  );
}

