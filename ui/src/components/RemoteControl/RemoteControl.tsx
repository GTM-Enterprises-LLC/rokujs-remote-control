import { useRokuStore } from '../../store/roku-store';
import PowerButton from './PowerButton';
import UtilityRow from './UtilityRow';
import NavigationPad from './NavigationPad';
import PlaybackControls from './PlaybackControls';
import VolumeControls from './VolumeControls';
import ChannelControls from './ChannelControls';
import AppLaunchers from './AppLaunchers';

function Divider() {
  return <div className="h-px bg-white/5 mx-2" />;
}

export default function RemoteControl() {
  const { error, clearError } = useRokuStore();

  return (
    <div className="flex flex-col items-center gap-4 w-full">
      {/* Error banner — sits above the pill */}
      {error && (
        <div className="w-full max-w-sm px-4 py-3 bg-red-900/50 border border-red-700
                        rounded-xl flex items-center justify-between text-sm">
          <span className="text-red-200">{error}</span>
          <button
            onClick={clearError}
            className="text-red-300 hover:text-white ml-4 font-semibold"
          >
            ✕
          </button>
        </div>
      )}

      {/* Remote pill */}
      <div
        className="remote-pill bg-[#1c1c1e] rounded-[3rem] px-6 py-8
                   w-full max-w-[280px] flex flex-col gap-5"
      >
        {/* Power */}
        <PowerButton />

        <Divider />

        {/* Back / Home / Options */}
        <UtilityRow />

        <Divider />

        {/* Circular D-pad */}
        <NavigationPad />

        <Divider />

        {/* Replay / Options / Rev / Play / Fwd */}
        <PlaybackControls />

        <Divider />

        {/* Volume */}
        <VolumeControls />

        {/* Channel */}
        <ChannelControls />

        <Divider />

        {/* App launchers + HDMI */}
        <AppLaunchers />
      </div>
    </div>
  );
}
