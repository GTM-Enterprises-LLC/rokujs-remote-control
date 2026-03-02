export interface ApiResponse<T> {
  success: boolean;
  data: T;
  timestamp: string;
}

export interface ApiError {
  success: false;
  error: { message: string };
  timestamp: string;
}

export interface StatusData {
  connected: boolean;
  rokuIp: string;
}

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

export interface RokuDeviceInfo {
  friendly_name?: string;
  model_name?: string;
  model_number?: string;
  serial_number?: string;
  software_version?: string;
  network_type?: string;
  wifi_mac?: string;
  power_mode?: string;
}

export interface RokuMediaPlayer {
  state: 'play' | 'pause' | 'buffering' | 'close' | 'none' | string;
  app_id: string | null;
  app_name: string | null;
  position_ms: number | null;
  duration_ms: number | null;
  is_live: boolean;
}

export interface RokuConfig {
  rokuIp: string;
}
