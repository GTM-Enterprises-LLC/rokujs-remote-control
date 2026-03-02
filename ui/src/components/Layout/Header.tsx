import { useRokuStore } from '../../store/roku-store';

export default function Header() {
  const { isConnected, rokuIp, deviceInfo } = useRokuStore();

  const displayName =
    deviceInfo?.friendly_name ?? deviceInfo?.model_name ?? rokuIp ?? 'Roku';

  return (
    <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-white font-semibold text-lg">RokuJS Remote</span>
      </div>
      <div className="flex items-center gap-2">
        <span
          className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'}`}
        />
        <span className="text-sm text-gray-400">
          {isConnected ? displayName : 'Disconnected'}
        </span>
      </div>
    </header>
  );
}
