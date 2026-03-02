import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { useRokuControl } from '../../hooks/useRokuControl';

export default function ChannelControls() {
  const { pressKey, disabled } = useRokuControl();

  const btn = (key: string, icon: React.ReactNode, label: string) => (
    <button
      onClick={() => pressKey(key)}
      disabled={disabled}
      aria-label={label}
      className="flex items-center gap-1 px-4 py-2 rounded-full bg-gray-700
                 hover:bg-gray-600 active:scale-95 text-gray-300 hover:text-white
                 text-xs font-medium disabled:opacity-40 transition-all"
    >
      {icon}
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex justify-around px-2">
      {btn('channelUp', <FiChevronUp size={14} />, 'CH ▲')}
      {btn('channelDown', <FiChevronDown size={14} />, 'CH ▼')}
    </div>
  );
}
