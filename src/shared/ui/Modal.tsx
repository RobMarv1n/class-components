import { useEffect, type ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleEsc);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/50 z-50"
      onMouseDown={handleOverlayClick}
    >
      <div className="bg-white rounded-2xl shadow-xl relative min-w-[300px] max-h-[100vh] overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-black hover:text-gray-500 cursor-pointer"
          data-testid="close-modal"
        >
          ✕
        </button>

        <div className="p-8 max-h-[100vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
}

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};
