import { useState, useCallback } from 'react';
import { PrizeTable } from './PrizeTable';
import type { PrizeSetting } from '../types';

interface SettingsPanelProps {
  show: boolean;
  title: string;
  totalPeople: number;
  prizeSettings: PrizeSetting[];
  prizePool: string[];
  organizerLogo: string | null;
  filmLogo: string | null;
  onClose: () => void;
  onSave: (title: string, totalPeople: number, settings: PrizeSetting[]) => void;
  onReset: () => void;
  onOrganizerLogoChange: (logo: string | null) => void;
  onFilmLogoChange: (logo: string | null) => void;
}

const LOGO_MAX_WIDTH = 360;
const LOGO_MAX_HEIGHT = 240;

function resizeImage(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let { width, height } = img;

        if (width > LOGO_MAX_WIDTH) {
          height = (height * LOGO_MAX_WIDTH) / width;
          width = LOGO_MAX_WIDTH;
        }
        if (height > LOGO_MAX_HEIGHT) {
          width = (width * LOGO_MAX_HEIGHT) / height;
          height = LOGO_MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d')!;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/png'));
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export function SettingsPanel({
  show,
  title,
  totalPeople,
  prizeSettings,
  prizePool,
  organizerLogo,
  filmLogo,
  onClose,
  onSave,
  onReset,
  onOrganizerLogoChange,
  onFilmLogoChange,
}: SettingsPanelProps) {
  const [editTitle, setEditTitle] = useState(title);
  const [editTotalPeople, setEditTotalPeople] = useState(totalPeople);
  const [editSettings, setEditSettings] = useState<PrizeSetting[]>(prizeSettings);

  const handleLogoUpload = useCallback(async (
    e: React.ChangeEvent<HTMLInputElement>,
    onChange: (logo: string | null) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const resized = await resizeImage(file);
    onChange(resized);
  }, []);

  if (!show) return null;

  const handleSave = () => {
    onSave(editTitle, editTotalPeople, editSettings);
    onClose();
  };

  const handleReset = () => {
    onReset();
    setEditTitle('抽奖活动');
    setEditTotalPeople(10);
    setEditSettings([]);
  };

  const prizeCount = prizePool.reduce<Record<string, number>>((acc, prize) => {
    acc[prize] = (acc[prize] || 0) + 1;
    return acc;
  }, {});

  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={onClose} />
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50
        bg-white rounded-3xl p-6 shadow-2xl w-[90vw] max-w-lg max-h-[85vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-amber-800">奖品设置</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200
              flex items-center justify-center transition-colors text-gray-500"
          >
            ✕
          </button>
        </div>

        <div className="space-y-6">
          <section>
            <h3 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-amber-500 rounded-full" />
              基本设置
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600 w-20 shrink-0">抽奖标题</label>
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-amber-200
                    focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                  placeholder="请输入抽奖活动标题"
                />
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm text-gray-600 w-20 shrink-0">总人数</label>
                <input
                  type="number"
                  value={editTotalPeople}
                  onChange={(e) => setEditTotalPeople(Math.max(1, Number(e.target.value)))}
                  min="1"
                  className="flex-1 px-3 py-2 rounded-lg border border-amber-200
                    focus:outline-none focus:ring-2 focus:ring-amber-400 text-sm"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-amber-500 rounded-full" />
              Logo 设置
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-gray-600">组织方 Logo</label>
                <div className="relative">
                  {organizerLogo ? (
                    <div className="relative group">
                      <img
                        src={organizerLogo}
                        alt="组织方Logo"
                        className="w-full h-20 object-contain rounded-lg border border-amber-200 bg-amber-50"
                      />
                      <button
                        onClick={() => onOrganizerLogoChange(null)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500
                          text-white text-xs flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-20
                      border-2 border-dashed border-amber-300 rounded-lg cursor-pointer
                      hover:border-amber-400 hover:bg-amber-50 transition-colors">
                      <span className="text-2xl text-amber-400">+</span>
                      <span className="text-xs text-gray-500">上传图片</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(e, onOrganizerLogoChange)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600">影片 Logo</label>
                <div className="relative">
                  {filmLogo ? (
                    <div className="relative group">
                      <img
                        src={filmLogo}
                        alt="影片Logo"
                        className="w-full h-20 object-contain rounded-lg border border-amber-200 bg-amber-50"
                      />
                      <button
                        onClick={() => onFilmLogoChange(null)}
                        className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500
                          text-white text-xs flex items-center justify-center"
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-20
                      border-2 border-dashed border-amber-300 rounded-lg cursor-pointer
                      hover:border-amber-400 hover:bg-amber-50 transition-colors">
                      <span className="text-2xl text-amber-400">+</span>
                      <span className="text-xs text-gray-500">上传图片</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleLogoUpload(e, onFilmLogoChange)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">支持 JPG/PNG，上传后自动适配显示</p>
          </section>

          <section>
            <h3 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-amber-500 rounded-full" />
              奖品设置
            </h3>
            <PrizeTable settings={editSettings} onChange={setEditSettings} />
          </section>

          {prizePool.length > 0 && (
            <section>
              <h3 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
                <span className="w-1 h-4 bg-amber-500 rounded-full" />
                奖品剩余数量
              </h3>
              <div className="bg-amber-50 rounded-xl p-4 space-y-1">
                {Object.entries(prizeCount)
                  .filter(([name]) => name !== '未中奖')
                  .map(([name, count]) => (
                    <div key={name} className="flex justify-between text-sm">
                      <span className="text-gray-700">{name}</span>
                      <span className="font-semibold text-amber-700">{count}</span>
                    </div>
                  ))}
              </div>
            </section>
          )}

          <section>
            <h3 className="text-sm font-semibold text-amber-700 mb-3 flex items-center gap-2">
              <span className="w-1 h-4 bg-amber-500 rounded-full" />
              操作
            </h3>
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white
                  font-semibold rounded-xl transition-colors shadow-md"
              >
                保存设置
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white
                  font-semibold rounded-xl transition-colors shadow-md"
              >
                重置奖池
              </button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
