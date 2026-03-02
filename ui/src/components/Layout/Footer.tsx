import { useRokuStore } from '../../store/roku-store';

export default function Footer() {
  const { rokuIp } = useRokuStore();

  return (
    <footer className="bg-gray-900 border-t border-gray-800 px-4 py-2 text-center">
      <span className="text-xs text-gray-600">
        rokujs • {rokuIp || 'no device configured'}
      </span>
    </footer>
  );
}
