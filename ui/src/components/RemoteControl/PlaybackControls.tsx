import { FiRewind, FiPlay, FiFastForward, FiRotateCcw } from 'react-icons/fi';
import { useRokuControl } from '../../hooks/useRokuControl';

interface IconBtnProps {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  label: string;
  size?: 'sm' | 'md';
}

function IconBtn({ onClick, disabled, icon, label, size = 'md' }: IconBtnProps) {
  const dim = size === 'sm' ? 'w-9 h-9' : 'w-11 h-11';
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={`${dim} rounded-full bg-gray-700 hover:bg-gray-600
                  active:scale-90 flex items-center justify-center
                  text-gray-300 hover:text-white disabled:opacity-40 transition-all`}
    >
      {icon}
    </button>
  );
}

export default function PlaybackControls() {
  const { pressKey, disabled } = useRokuControl();

  return (
    <div className="space-y-3">
      {/* Replay + Info row */}
      <div className="flex justify-around px-4">
        <IconBtn
          onClick={() => pressKey('replay')}
          disabled={disabled}
          icon={<FiRotateCcw size={16} />}
          label="Replay"
          size="sm"
        />
        <IconBtn
          onClick={() => pressKey('info')}
          disabled={disabled}
          icon={<span className="text-xs font-bold">*</span>}
          label="Options"
          size="sm"
        />
      </div>

      {/* Rev / Play / Fwd */}
      <div className="flex justify-around px-2">
        <IconBtn
          onClick={() => pressKey('rev')}
          disabled={disabled}
          icon={<FiRewind size={18} />}
          label="Rewind"
        />
        <IconBtn
          onClick={() => pressKey('play')}
          disabled={disabled}
          icon={<FiPlay size={18} />}
          label="Play/Pause"
        />
        <IconBtn
          onClick={() => pressKey('fwd')}
          disabled={disabled}
          icon={<FiFastForward size={18} />}
          label="Fast Forward"
        />
      </div>
    </div>
  );
}
