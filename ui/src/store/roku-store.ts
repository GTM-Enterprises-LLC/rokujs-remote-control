import { create } from 'zustand';
import { rokuApi } from '../services/api-client';
import type { RokuApp, RokuActiveApp, RokuDeviceInfo, RokuMediaPlayer } from '../types/api';

interface RokuStore {
  isConnected: boolean;
  rokuIp: string;
  deviceInfo: RokuDeviceInfo | null;
  availableApps: RokuApp[];
  activeApp: RokuActiveApp | null;
  mediaPlayer: RokuMediaPlayer | null;
  isExecuting: boolean;
  error: string | null;

  fetchStatus: () => Promise<void>;
  fetchDeviceInfo: () => Promise<void>;
  fetchApps: () => Promise<void>;
  fetchActiveApp: () => Promise<void>;
  fetchMediaPlayer: () => Promise<void>;
  pressKey: (key: string) => Promise<void>;
  launchApp: (options: { name?: string; id?: number }) => Promise<void>;
  updateConfig: (ip: string) => Promise<void>;
  clearError: () => void;
}

export const useRokuStore = create<RokuStore>((set, get) => ({
  isConnected: false,
  rokuIp: '',
  deviceInfo: null,
  availableApps: [],
  activeApp: null,
  mediaPlayer: null,
  isExecuting: false,
  error: null,

  fetchStatus: async () => {
    try {
      const res = await rokuApi.getStatus();
      set({ isConnected: res.data.connected, rokuIp: res.data.rokuIp });
    } catch {
      set({ isConnected: false });
    }
  },

  fetchDeviceInfo: async () => {
    try {
      const res = await rokuApi.getDeviceInfo();
      set({ deviceInfo: res.data });
    } catch {
      // device info is optional — don't surface as error
    }
  },

  fetchApps: async () => {
    try {
      const res = await rokuApi.getApps();
      set({ availableApps: res.data });
    } catch {
      // non-critical
    }
  },

  fetchActiveApp: async () => {
    try {
      const res = await rokuApi.getActiveApp();
      set({ activeApp: res.data });
    } catch {
      // non-critical
    }
  },

  fetchMediaPlayer: async () => {
    try {
      const res = await rokuApi.getMediaPlayer();
      set({ mediaPlayer: res.data });
    } catch {
      // non-critical
    }
  },

  pressKey: async (key: string) => {
    set({ isExecuting: true, error: null });
    try {
      await rokuApi.press(key);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Command failed';
      set({ error: msg });
    } finally {
      set({ isExecuting: false });
    }
  },

  launchApp: async (options) => {
    set({ isExecuting: true, error: null });
    try {
      await rokuApi.launch(options);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Launch failed';
      set({ error: msg });
    } finally {
      set({ isExecuting: false });
    }
  },

  updateConfig: async (ip: string) => {
    try {
      await rokuApi.updateConfig(ip);
      set({ rokuIp: ip });
      await get().fetchStatus();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Config update failed';
      set({ error: msg });
    }
  },

  clearError: () => set({ error: null }),
}));
