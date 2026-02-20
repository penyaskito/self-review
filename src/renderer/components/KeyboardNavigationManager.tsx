import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import { HintOverlay } from './HintOverlay';

interface KeyboardNavigationManagerProps {
  onToggleFindBar?: () => void;
}

export function KeyboardNavigationManager({ onToggleFindBar }: KeyboardNavigationManagerProps) {
  const { hints, inputBuffer } = useKeyboardNavigation({ onToggleFindBar });
  return <HintOverlay hints={hints} inputBuffer={inputBuffer} />;
}
