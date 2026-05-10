interface ResultPopupProps {
  show: boolean;
  isWin: boolean;
  prize: string;
  customizationEnabled: boolean;
  onClose: () => void;
}

export function ResultPopup({ show, isWin, prize, customizationEnabled, onClose }: ResultPopupProps) {
  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
        <div className="bg-white rounded-3xl p-8 shadow-2xl min-w-[300px] max-w-[90vw]
          flex flex-col items-center pointer-events-auto
          animate-[popup_0.3s_ease-out_both]">
          {customizationEnabled && (
            <img
              src={isWin ? '/assets/atari.png' : '/assets/hazure.png'}
              alt={isWin ? '中奖' : '未中奖'}
              className="w-36 h-36 object-contain mb-4"
            />
          )}
          <p className={`text-2xl font-bold mb-6 text-center ${isWin ? 'text-rose-600' : 'text-gray-500'}`}>
            {isWin ? `恭喜！你抽中了: ${prize}` : '很遗憾，没有中奖。祝观影愉快～'}
          </p>
          <button
            onClick={onClose}
            className="px-8 py-3 bg-gradient-to-r from-rose-500 to-red-600
              hover:from-rose-600 hover:to-red-700
              text-white font-semibold rounded-xl
              transition-all duration-200 shadow-md"
          >
            关闭
          </button>
        </div>
      </div>
    </>
  );
}
