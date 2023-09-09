'use client';

import {useCallback, useRef, useEffect, MouseEventHandler} from 'react';
import {useRouter} from 'next/navigation';

export default function Modal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const overlay = useRef(null);
  const wrapper = useRef<HTMLDivElement | null>(null);
  const firstFocusableElementRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  const onDismiss = useCallback(() => {
    router.back();
  }, [router]);

  const onClick: MouseEventHandler = useCallback(
    e => {
      if (e.target === overlay.current || e.target === wrapper.current) {
        if (onDismiss) onDismiss();
      }
    },
    [onDismiss, overlay, wrapper],
  );

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onDismiss();
    },
    [onDismiss],
  );

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);

  useEffect(() => {
    if (wrapper.current) {
      const modalElements = wrapper.current.querySelectorAll(
        'a, button, input, textarea, select, [role="textbox"], [role="button"], [tabindex="0"]',
      );

      if (modalElements.length > 0) {
        firstFocusableElementRef.current = modalElements[0] as HTMLElement;
        firstFocusableElementRef.current.focus();
      }
    }
  }, []);

  return (
    <div
      ref={overlay}
      className="fixed z-10 inset-0 mx-auto bg-black/60 bg-opacity-[13%] backdrop-blur-sm transition-opacity"
      onClick={onClick}
    >
      <div
        ref={wrapper}
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-10/12 md:w-8/12 lg:w-1/2 max-w-[572px] ${className}`}
      >
        {children}
      </div>
    </div>
  );
}
