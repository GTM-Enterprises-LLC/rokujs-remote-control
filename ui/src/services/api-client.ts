import axios from 'axios';
import type {
  ApiResponse,
  StatusData,
  RokuApp,
  RokuActiveApp,
  RokuDeviceInfo,
  RokuMediaPlayer,
  RokuConfig,
} from '../types/api';

const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? '/api/v1';

const http = axios.create({ baseURL: BASE_URL });

export const rokuApi = {
  getStatus: () => http.get<ApiResponse<StatusData>>('/status').then((r) => r.data),

  getDeviceInfo: () =>
    http.get<ApiResponse<RokuDeviceInfo>>('/device-info').then((r) => r.data),

  getApps: () => http.get<ApiResponse<RokuApp[]>>('/apps').then((r) => r.data),

  getActiveApp: () =>
    http.get<ApiResponse<RokuActiveApp>>('/active-app').then((r) => r.data),

  getMediaPlayer: () =>
    http.get<ApiResponse<RokuMediaPlayer>>('/media-player').then((r) => r.data),

  getKeys: () => http.get<ApiResponse<string[]>>('/keys').then((r) => r.data),

  getConfig: () => http.get<ApiResponse<RokuConfig>>('/config').then((r) => r.data),

  updateConfig: (rokuIp: string) =>
    http.put<ApiResponse<RokuConfig>>('/config', { rokuIp }).then((r) => r.data),

  press: (key: string) =>
    http.post<ApiResponse<{ key: string }>>(`/keypress/${key}`).then((r) => r.data),

  launch: (options: { name?: string; id?: number }) =>
    http.post<ApiResponse<unknown>>('/launch', options).then((r) => r.data),

  type: (text: string) =>
    http.post<ApiResponse<unknown>>('/type', { text }).then((r) => r.data),
};
