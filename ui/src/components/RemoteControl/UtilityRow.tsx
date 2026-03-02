import { FiArrowLeft, FiHome, FiSettings } from 'react-icons/fi';
import { useRokuControl } from '../../hooks/useRokuControl';

interface RoundBtnProps {
  onClick: () => void;
  disabled: boolean;
  icon: React.ReactNode;
  label: string;
}

function RoundBtn({ onClick, disabled, icon, label }: RoundBtnProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="flex flex-col items-center gap-1 group"
    >
      <span className="w-11 h-11 rounded-full bg-gray-700 hover:bg-gray-600
                       active:scale-90 flex items-center justify-center
                       text-gray-300 group-hover:text-white
                       disabled:opacity-40 transition-all">
        {icon}
      </span>
      <span className="text-[10px] text-gray-500 group-hover:text-gray-400">{label}</span>
    </button>
  );
}

export default function UtilityRow() {
  const { pressKey, disabled } = useRokuControl();

  return (
    <div className="flex justify-around px-2">
      <RoundBtn
        onClick={() => pressKey('back')}
        disabled={disabled}
        icon={<FiArrowLeft size={18} />}
        label="Back"
      />
      <RoundBtn
        onClick={() => pressKey('home')}
        disabled={disabled}
        icon={<FiHome size={18} />}
        label="Home"
      />
      <RoundBtn
        onClick={() => pressKey('info')}
        disabled={disabled}
        icon={<FiSettings size={18} />}
        label="Options"
      />
    </div>
  );
}
