import { useRokuStore } from '../store/roku-store';

export function useRokuControl() {
  const { pressKey, launchApp, isExecuting, isConnected } = useRokuStore();
  const disabled = isExecuting || !isConnected;
  return { pressKey, launchApp, isExecuting, isConnected, disabled };
}
