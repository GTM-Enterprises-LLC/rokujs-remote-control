import { FiArrowUp, FiArrowDown, FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import { useRokuControl } from '../../hooks/useRokuControl';

export default function NavigationPad() {
  const { pressKey, disabled } = useRokuControl();

  const arrow = (key: string, icon: React.ReactNode, style: string) => (
    <button
      onClick={() => pressKey(key)}
      disabled={disabled}
      className={`dpad-arrow ${style}`}
      aria-label={key}
    >
      {icon}
    </button>
  );

  return (
    <div className="flex justify-center">
      <div className="dpad-ring w-48 h-48 relative">
        {/* Up */}
        {arrow('up', <FiArrowUp size={22} />, 'top-2 left-1/2 -translate-x-1/2')}
        {/* Down */}
        {arrow('down', <FiArrowDown size={22} />, 'bottom-2 left-1/2 -translate-x-1/2')}
        {/* Left */}
        {arrow('left', <FiArrowLeft size={22} />, 'left-2 top-1/2 -translate-y-1/2')}
        {/* Right */}
        {arrow('right', <FiArrowRight size={22} />, 'right-2 top-1/2 -translate-y-1/2')}

        {/* Center OK */}
        <button
          onClick={() => pressKey('select')}
          disabled={disabled}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-16 h-16 rounded-full bg-purple-700 hover:bg-purple-600
                     active:scale-95 text-white text-sm font-semibold
                     shadow-lg shadow-purple-900/50 disabled:opacity-40
                     ring-4 ring-[#2d2d2d]"
          aria-label="OK"
        >
          OK
        </button>
      </div>
    </div>
  );
}
