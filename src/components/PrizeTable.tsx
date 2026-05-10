import type { PrizeSetting } from '../types';

interface PrizeTableProps {
  settings: PrizeSetting[];
  onChange: (settings: PrizeSetting[]) => void;
}

export function PrizeTable({ settings, onChange }: PrizeTableProps) {
  const addPrize = () => {
    onChange([...settings, { name: '新奖品', count: 1 }]);
  };

  const removePrize = (index: number) => {
    onChange(settings.filter((_, i) => i !== index));
  };

  const updatePrize = (index: number, field: keyof PrizeSetting, value: string | number) => {
    const newSettings = [...settings];
    if (field === 'name') {
      newSettings[index] = { ...newSettings[index], name: value as string };
    } else {
      newSettings[index] = { ...newSettings[index], count: Math.max(1, Number(value)) };
    }
    onChange(newSettings);
  };

  return (
    <div>
      <div className="max-h-[45vh] overflow-y-auto rounded-xl border border-amber-200">
        <table className="w-full">
          <thead>
            <tr className="bg-amber-50 sticky top-0">
              <th className="py-3 px-4 text-left text-amber-800 font-semibold">奖品名称</th>
              <th className="py-3 px-4 text-center text-amber-800 font-semibold w-24">数量</th>
              <th className="py-3 px-4 text-center text-amber-800 font-semibold w-24">操作</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((prize, index) => (
              <tr key={index} className="border-t border-amber-100 hover:bg-amber-50/50 transition-colors">
                <td className="py-2 px-4">
                  <input
                    type="text"
                    value={prize.name}
                    onChange={(e) => updatePrize(index, 'name', e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-amber-200
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                      text-sm"
                    placeholder="奖品名称"
                  />
                </td>
                <td className="py-2 px-4">
                  <input
                    type="number"
                    value={prize.count}
                    onChange={(e) => updatePrize(index, 'count', e.target.value)}
                    min="1"
                    className="w-full px-3 py-2 rounded-lg border border-amber-200
                      focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent
                      text-sm text-center"
                  />
                </td>
                <td className="py-2 px-4 text-center">
                  <button
                    onClick={() => removePrize(index)}
                    className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white text-sm
                      rounded-lg transition-colors"
                  >
                    删除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        onClick={addPrize}
        className="mt-4 w-full py-3 bg-amber-500 hover:bg-amber-600 text-white
          font-semibold rounded-xl transition-colors shadow-md"
      >
        添加奖品
      </button>
    </div>
  );
}
