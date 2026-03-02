import { useEffect } from 'react';
import { useRokuStore } from './store/roku-store';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import RemoteControl from './components/RemoteControl/RemoteControl';
import NowPlaying from './components/NowPlaying';

function App() {
  const { fetchStatus, fetchDeviceInfo, fetchApps, fetchActiveApp, fetchMediaPlayer } = useRokuStore();

  useEffect(() => {
    fetchStatus();
    fetchDeviceInfo();
    fetchApps();
    fetchActiveApp();
    fetchMediaPlayer();

    const statusInterval = setInterval(fetchStatus, 10000);
    const nowPlayingInterval = setInterval(() => {
      fetchActiveApp();
      fetchMediaPlayer();
    }, 5000);

    return () => {
      clearInterval(statusInterval);
      clearInterval(nowPlayingInterval);
    };
  }, [fetchStatus, fetchDeviceInfo, fetchApps, fetchActiveApp, fetchMediaPlayer]);

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center py-8 px-4">
        <NowPlaying />
        <RemoteControl />
      </main>
      <Footer />
    </div>
  );
}

export default App;
