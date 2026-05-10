interface DrawButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function DrawButton({ onClick, disabled }: DrawButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full py-4 px-8 text-xl font-bold rounded-2xl
        bg-gradient-to-r from-rose-500 to-red-600
        hover:from-rose-600 hover:to-red-700
        active:from-rose-700 active:to-red-800
        text-white shadow-lg shadow-rose-500/30
        hover:shadow-xl hover:shadow-rose-500/40
        transform hover:-translate-y-0.5 active:translate-y-0
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
    >
      抽奖
    </button>
  );
}
