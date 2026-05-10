interface LoadingOverlayProps {
  show: boolean;
  customizationEnabled: boolean;
}

export function LoadingOverlay({ show, customizationEnabled }: LoadingOverlayProps) {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex flex-col items-center justify-center z-50">
      <img
        src={customizationEnabled ? '/assets/loading.gif' : '/assets/praying.gif'}
        alt="Loading..."
        className="w-48 h-48 object-contain mb-4"
      />
      <p className="text-white text-lg font-bold">
        {customizationEnabled ? '好运嘎嘎加载中…' : '少女祈祷中…'}
      </p>
    </div>
  );
}
