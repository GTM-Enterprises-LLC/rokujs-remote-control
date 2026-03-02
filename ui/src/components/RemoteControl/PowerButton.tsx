import { FiPower } from 'react-icons/fi';
import { useRokuControl } from '../../hooks/useRokuControl';

export default function PowerButton() {
  const { pressKey, disabled } = useRokuControl();

  return (
    <div className="flex justify-end pr-1">
      <button
        onClick={() => pressKey('home')}
        disabled={disabled}
        aria-label="Power"
        className="w-10 h-10 rounded-full bg-red-600 hover:bg-red-500
                   active:scale-90 flex items-center justify-center
                   text-white shadow-lg shadow-red-900/50 disabled:opacity-40
                   transition-all"
      >
        <FiPower size={18} />
      </button>
    </div>
  );
}
