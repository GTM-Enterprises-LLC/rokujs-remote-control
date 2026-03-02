import { FiVolume1, FiVolumeX, FiVolume2 } from 'react-icons/fi';
import { useRokuControl } from '../../hooks/useRokuControl';

export default function VolumeControls() {
  const { pressKey, disabled } = useRokuControl();

  const btn = (key: string, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => pressKey(key)}
      disabled={disabled}
      aria-label={label}
      className="w-11 h-11 rounded-full bg-gray-700 hover:bg-gray-600
                 active:scale-90 flex items-center justify-center
                 text-gray-300 hover:text-white disabled:opacity-40 transition-all"
    >
      {icon}
    </button>
  );

  return (
    <div className="flex justify-around px-2">
      {btn('volumeDown', <FiVolume1 size={18} />, 'Volume Down')}
      {btn('volumeMute', <FiVolumeX size={18} />, 'Mute')}
      {btn('volumeUp', <FiVolume2 size={18} />, 'Volume Up')}
    </div>
  );
}
