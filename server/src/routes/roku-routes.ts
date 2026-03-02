import { Router } from 'express';
import { RokuController } from '../controllers/roku-controller';
import { asyncHandler } from '../middleware/error-handler';

export function createRouter(controller: RokuController): Router {
  const router = Router();

  router.get('/status', asyncHandler(controller.getStatus));
  router.get('/device-info', asyncHandler(controller.getDeviceInfo));
  router.get('/apps', asyncHandler(controller.getApps));
  router.get('/active-app', asyncHandler(controller.getActiveApp));
  router.get('/media-player', asyncHandler(controller.getMediaPlayer));
  router.get('/keys', asyncHandler(controller.getKeys));
  router.get('/config', asyncHandler(controller.getConfig));
  router.put('/config', asyncHandler(controller.putConfig));
  router.post('/keypress/:key', asyncHandler(controller.postKeypress));
  router.post('/launch', asyncHandler(controller.postLaunch));
  router.post('/type', asyncHandler(controller.postType));

  return router;
}
