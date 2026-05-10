interface StatusBarProps {
  remaining: number;
  total: number;
}

export function StatusBar({ remaining, total }: StatusBarProps) {
  return (
    <div className="mt-6 pt-4 border-t border-amber-100 text-center">
      <span className="text-lg font-semibold text-amber-800">
        计数: {remaining} / {total}
      </span>
    </div>
  );
}
