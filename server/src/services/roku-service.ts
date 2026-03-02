import axios from 'axios';
import { parseStringPromise } from 'xml2js';

export const ROKU_KEYS = [
  'home', 'rev', 'fwd', 'play',
  'select', 'left', 'right', 'down',
  'up', 'back', 'replay', 'info',
  'backspace', 'enter', 'volumeDown', 'volumeUp',
  'volumeMute', 'inputTuner', 'inputHDMI1', 'inputHDMI2',
  'inputHDMI3', 'inputHDMI4', 'inputAV1', 'channelUp',
  'channelDown',
];

export interface RokuApp {
  id: number;
  name: string;
  version: string;
}

export interface RokuActiveApp {
  id: number | null;
  name: string;
  version: string | null;
}

export interface RokuMediaPlayer {
  state: 'play' | 'pause' | 'buffering' | 'close' | 'none' | string;
  app_id: string | null;
  app_name: string | null;
  position_ms: number | null;
  duration_ms: number | null;
  is_live: boolean;
}

export interface RokuDeviceInfo {
  friendly_name: string | undefined;
  model_name: string | undefined;
  model_number: string | undefined;
  serial_number: string | undefined;
  software_version: string | undefined;
  network_type: string | undefined;
  wifi_mac: string | undefined;
  power_mode: string | undefined;
}

export class RokuService {
  private baseUrl: string;

  constructor(private ip: string) {
    this.baseUrl = `http://${ip}:8060`;
  }

  async isReachable(): Promise<boolean> {
    try {
      await axios.get(this.baseUrl, { timeout: 3000 });
      return true;
    } catch {
      return false;
    }
  }

  async press(key: string): Promise<void> {
    await axios.post(`${this.baseUrl}/keypress/${key}`, null, { timeout: 3000 });
  }

  async type(text: string): Promise<void> {
    for (const char of text.split('')) {
      await axios.post(
        `${this.baseUrl}/keypress/Lit_${encodeURIComponent(char)}`,
        null,
        { timeout: 3000 }
      );
    }
  }

  async apps(): Promise<RokuApp[]> {
    const res = await axios.get(`${this.baseUrl}/query/apps`, { timeout: 3000 });
    const result = await parseStringPromise(res.data);
    return (result.apps.app as any[])
      .filter((i) => i.$.type === 'appl')
      .map((i) => ({
        id: Number(i.$.id),
        name: i._,
        version: i.$.version,
      }));
  }

  async activeApp(): Promise<RokuActiveApp> {
    const res = await axios.get(`${this.baseUrl}/query/active-app`, { timeout: 3000 });
    const result = await parseStringPromise(res.data);
    const app = result['active-app'].app[0];
    if (typeof app === 'string') {
      return { id: null, name: app, version: null };
    }
    return {
      id: parseFloat(app.$.id),
      name: app._,
      version: app.$.version,
    };
  }

  async deviceInfo(): Promise<RokuDeviceInfo> {
    const [rootRes, infoRes] = await Promise.all([
      axios.get(this.baseUrl, { timeout: 3000 }),
      axios.get(`${this.baseUrl}/query/device-info`, { timeout: 3000 }),
    ]);

    const [root, info] = await Promise.all([
      parseStringPromise(rootRes.data),
      parseStringPromise(infoRes.data),
    ]);

    const d = root.root?.device?.[0];
    const i = info['device-info'];

    return {
      friendly_name: d?.friendlyName?.[0],
      model_name: d?.modelName?.[0],
      model_number: d?.modelNumber?.[0],
      serial_number: d?.serialNumber?.[0],
      software_version: i?.['software-version']?.[0],
      network_type: i?.['network-type']?.[0],
      wifi_mac: i?.['wifi-mac']?.[0],
      power_mode: i?.['power-mode']?.[0],
    };
  }

  async mediaPlayer(): Promise<RokuMediaPlayer> {
    const res = await axios.get(`${this.baseUrl}/query/media-player`, { timeout: 3000 });
    const result = await parseStringPromise(res.data);
    const p = result.player;
    const state: string = p?.$?.state ?? 'none';

    if (state === 'close' || state === 'none') {
      return { state, app_id: null, app_name: null, position_ms: null, duration_ms: null, is_live: false };
    }

    const plugin = p?.plugin?.[0]?.$;
    const posRaw: string | undefined = p?.position?.[0];
    const durRaw: string | undefined = p?.duration?.[0];
    const liveRaw: string | undefined = p?.['is_live']?.[0];

    return {
      state,
      app_id: plugin?.id ?? null,
      app_name: plugin?.name ?? null,
      position_ms: posRaw ? parseInt(posRaw) : null,
      duration_ms: durRaw ? parseInt(durRaw) : null,
      is_live: liveRaw === 'true',
    };
  }

  async launch(options: { id?: number; name?: string }): Promise<void> {
    const apps = await this.apps();
    const app = options.id
      ? apps.find((a) => a.id === options.id)
      : apps.find((a) => a.name.toLowerCase() === options.name?.toLowerCase());
    if (!app) throw new Error('App not found');
    await axios.post(`${this.baseUrl}/launch/${app.id}`, null, { timeout: 3000 });
  }

  updateIp(ip: string): void {
    this.ip = ip;
    this.baseUrl = `http://${ip}:8060`;
  }
}
