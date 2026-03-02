import { Request, Response } from 'express';
import { RokuService, ROKU_KEYS } from '../services/roku-service';
import { getConfig, updateConfig } from '../config/environment';

export class RokuController {
  constructor(private service: RokuService) {}

  private ok(res: Response, data: unknown) {
    res.json({ success: true, data, timestamp: new Date().toISOString() });
  }

  getStatus = async (_req: Request, res: Response): Promise<void> => {
    const reachable = await this.service.isReachable();
    this.ok(res, { connected: reachable, rokuIp: getConfig().rokuIp });
  };

  getConfig = async (_req: Request, res: Response): Promise<void> => {
    this.ok(res, getConfig());
  };

  putConfig = async (req: Request, res: Response): Promise<void> => {
    const { rokuIp } = req.body as { rokuIp?: string };
    if (!rokuIp) {
      res.status(400).json({ success: false, error: { message: 'rokuIp is required' } });
      return;
    }
    updateConfig(rokuIp);
    this.service.updateIp(rokuIp);
    this.ok(res, { rokuIp });
  };

  getDeviceInfo = async (_req: Request, res: Response): Promise<void> => {
    const info = await this.service.deviceInfo();
    this.ok(res, info);
  };

  getApps = async (_req: Request, res: Response): Promise<void> => {
    const apps = await this.service.apps();
    this.ok(res, apps);
  };

  getActiveApp = async (_req: Request, res: Response): Promise<void> => {
    const app = await this.service.activeApp();
    this.ok(res, app);
  };

  getMediaPlayer = async (_req: Request, res: Response): Promise<void> => {
    const player = await this.service.mediaPlayer();
    this.ok(res, player);
  };

  postKeypress = async (req: Request, res: Response): Promise<void> => {
    const { key } = req.params;
    if (!ROKU_KEYS.includes(key)) {
      res.status(400).json({
        success: false,
        error: { message: `Invalid key "${key}". Valid keys: ${ROKU_KEYS.join(', ')}` },
      });
      return;
    }
    await this.service.press(key);
    this.ok(res, { key });
  };

  postLaunch = async (req: Request, res: Response): Promise<void> => {
    const { name, id } = req.body as { name?: string; id?: number };
    if (!name && !id) {
      res.status(400).json({ success: false, error: { message: 'name or id required' } });
      return;
    }
    await this.service.launch({ name, id });
    this.ok(res, { launched: name ?? id });
  };

  postType = async (req: Request, res: Response): Promise<void> => {
    const { text } = req.body as { text?: string };
    if (!text) {
      res.status(400).json({ success: false, error: { message: 'text is required' } });
      return;
    }
    await this.service.type(text);
    this.ok(res, { typed: text });
  };

  getKeys = async (_req: Request, res: Response): Promise<void> => {
    this.ok(res, ROKU_KEYS);
  };
}
