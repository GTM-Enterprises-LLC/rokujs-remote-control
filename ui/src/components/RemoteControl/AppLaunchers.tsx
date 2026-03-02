import { SiNetflix, SiYoutube, SiAmazonprime, SiHbo, SiParamountplus, SiApple, SiRoku } from 'react-icons/si';
import { FiMonitor, FiTv } from 'react-icons/fi';
import { useRokuStore } from '../../store/roku-store';
import { useRokuControl } from '../../hooks/useRokuControl';

// Match is case-insensitive against the app name returned by the Roku API
const STREAMING_APPS = [
  { name: 'Netflix',           icon: <SiNetflix size={18} />,       bg: 'bg-red-700 hover:bg-red-600' },
  { name: 'Prime Video',       icon: <SiAmazonprime size={18} />,   bg: 'bg-sky-700 hover:bg-sky-600' },
  { name: 'HBO Max',           icon: <SiHbo size={18} />,           bg: 'bg-purple-800 hover:bg-purple-700' },
  { name: 'Hulu',              icon: <FiTv size={18} />,            bg: 'bg-green-700 hover:bg-green-600' },
  { name: 'Disney Plus',       icon: <FiTv size={18} />,            bg: 'bg-blue-700 hover:bg-blue-600' },
  { name: 'Paramount Plus',    icon: <SiParamountplus size={18} />, bg: 'bg-blue-800 hover:bg-blue-700' },
  { name: 'Apple TV',          icon: <SiApple size={18} />,         bg: 'bg-gray-600 hover:bg-gray-500' },
  { name: 'The Roku Channel',  icon: <SiRoku size={18} />,          bg: 'bg-violet-700 hover:bg-violet-600' },
  { name: 'YouTube',           icon: <SiYoutube size={18} />,       bg: 'bg-red-600 hover:bg-red-500' },
];

export default function AppLaunchers() {
  const { availableApps } = useRokuStore();
  const { launchApp, pressKey, disabled } = useRokuControl();

  const appNames = availableApps.map((a) => a.name.toLowerCase());
  const visibleApps = STREAMING_APPS.filter((a) =>
    appNames.includes(a.name.toLowerCase())
  );

  return (
    <div className="space-y-3">
      {/* Streaming app buttons */}
      {visibleApps.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {visibleApps.map((app) => (
            <button
              key={app.name}
              onClick={() => launchApp({ name: app.name })}
              disabled={disabled}
              className={`${app.bg} rounded-xl py-2.5 flex items-center justify-center
                          gap-2 text-white text-sm font-medium active:scale-95
                          disabled:opacity-40 transition-all`}
            >
              {app.icon}
              {app.name}
            </button>
          ))}
        </div>
      )}

      {/* HDMI inputs */}
      <div className="grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((n) => (
          <button
            key={n}
            onClick={() => pressKey(`inputHDMI${n}`)}
            disabled={disabled}
            className="py-2 rounded-lg bg-gray-700 hover:bg-gray-600
                       active:scale-95 text-gray-300 hover:text-white
                       text-xs font-medium disabled:opacity-40 transition-all
                       flex items-center justify-center gap-1"
          >
            <FiMonitor size={11} />
            H{n}
          </button>
        ))}
      </div>
    </div>
  );
}
