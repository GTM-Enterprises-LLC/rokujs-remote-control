import { FiPlay, FiPause, FiLoader, FiTv } from 'react-icons/fi';
import { useRokuStore } from '../store/roku-store';

function formatMs(ms: number): string {
  const totalSec = Math.floor(ms / 1000);
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  return `${m}:${String(s).padStart(2, '0')}`;
}

const STATE_ICON: Record<string, React.ReactNode> = {
  play:      <FiPlay size={12} className="text-green-400" />,
  pause:     <FiPause size={12} className="text-yellow-400" />,
  buffering: <FiLoader size={12} className="text-blue-400 animate-spin" />,
};

export default function NowPlaying() {
  const { activeApp, mediaPlayer, isConnected } = useRokuStore();

  if (!isConnected) return null;

  const appName = activeApp?.name ?? null;
  const state = mediaPlayer?.state;
  const isIdle = !state || state === 'close' || state === 'none';
  const stateIcon = state ? STATE_ICON[state] : null;

  const position = mediaPlayer?.position_ms;
  const duration = mediaPlayer?.duration_ms;
  const isLive = mediaPlayer?.is_live;

  const progress =
    position != null && duration != null && duration > 0
      ? Math.min((position / duration) * 100, 100)
      : null;

  return (
    <div className="w-full max-w-[280px] mx-auto mb-3">
      <div className="bg-gray-800/60 border border-white/5 rounded-2xl px-4 py-3 space-y-2">
        {/* App + state row */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <FiTv size={13} className="text-gray-500 shrink-0" />
            <span className="text-sm font-medium text-white truncate">
              {appName ?? '—'}
            </span>
          </div>
          {!isIdle && stateIcon && (
            <div className="flex items-center gap-1 shrink-0">
              {stateIcon}
              <span className="text-xs text-gray-400 capitalize">{state}</span>
            </div>
          )}
          {isIdle && (
            <span className="text-xs text-gray-600">idle</span>
          )}
        </div>

        {/* Progress bar + timestamps */}
        {progress !== null && (
          <div className="space-y-1">
            <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-purple-500 rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-[10px] text-gray-500">
              <span>{position != null ? formatMs(position) : '—'}</span>
              <span>
                {isLive
                  ? '⬤ LIVE'
                  : duration != null
                  ? formatMs(duration)
                  : '—'}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
