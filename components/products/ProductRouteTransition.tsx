'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export const PRODUCT_ROUTE_TRANSITION_EVENT = 'hiltech-product-route-transition';

export type ProductRouteTransitionDetail = {
  href: string;
  productId: string;
  src: string;
  alt: string;
  rect: {
    left: number;
    top: number;
    width: number;
    height: number;
  };
};

type TransitionState = ProductRouteTransitionDetail & {
  targetPath: string;
  phase: 'source' | 'handoff' | 'arriving';
  currentRect: ProductRouteTransitionDetail['rect'];
};

function getHandoffRect() {
  const compact = window.matchMedia('(max-width: 767px)').matches;
  const width = compact
    ? Math.min(window.innerWidth * 0.82, 520)
    : Math.min(window.innerWidth * 0.52, 760);
  const height = compact
    ? Math.min(window.innerHeight * 0.48, 520)
    : Math.min(window.innerHeight * 0.62, 650);

  return {
    left: (window.innerWidth - width) / 2,
    top: Math.max(72, (window.innerHeight - height) / 2),
    width,
    height,
  };
}

export default function ProductRouteTransition() {
  const pathname = usePathname();
  const router = useRouter();
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const navigationTimerRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);
  const locateFrameRef = useRef<number | null>(null);

  useEffect(() => {
    const handleTransition = (event: Event) => {
      const customEvent = event as CustomEvent<ProductRouteTransitionDetail>;
      const detail = customEvent.detail;
      if (!detail?.href || !detail.src) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(detail.href);
        return;
      }

      const targetPath = new URL(detail.href, window.location.origin).pathname;
      const handoffRect = getHandoffRect();

      setTransition({
        ...detail,
        targetPath,
        phase: 'source',
        currentRect: detail.rect,
      });

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransition((current) =>
            current
              ? {
                  ...current,
                  phase: 'handoff',
                  currentRect: handoffRect,
                }
              : current,
          );
        });
      });

      if (navigationTimerRef.current) window.clearTimeout(navigationTimerRef.current);
      navigationTimerRef.current = window.setTimeout(() => {
        router.push(detail.href);
      }, 260);
    };

    window.addEventListener(PRODUCT_ROUTE_TRANSITION_EVENT, handleTransition);
    return () => {
      window.removeEventListener(PRODUCT_ROUTE_TRANSITION_EVENT, handleTransition);
      if (navigationTimerRef.current) window.clearTimeout(navigationTimerRef.current);
      if (finishTimerRef.current) window.clearTimeout(finishTimerRef.current);
      if (locateFrameRef.current) window.cancelAnimationFrame(locateFrameRef.current);
    };
  }, [router]);

  useEffect(() => {
    if (!transition || pathname !== transition.targetPath) return;

    let attempts = 0;
    const locateDestination = () => {
      const destination = document.querySelector<HTMLElement>('[data-product-object]');
      if (!destination) {
        attempts += 1;
        if (attempts < 60) locateFrameRef.current = window.requestAnimationFrame(locateDestination);
        else setTransition(null);
        return;
      }

      const rect = destination.getBoundingClientRect();
      setTransition((current) =>
        current
          ? {
              ...current,
              phase: 'arriving',
              currentRect: {
                left: rect.left,
                top: rect.top,
                width: rect.width,
                height: rect.height,
              },
            }
          : current,
      );

      if (finishTimerRef.current) window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = window.setTimeout(() => setTransition(null), 430);
    };

    locateFrameRef.current = window.requestAnimationFrame(locateDestination);
  }, [pathname, transition?.targetPath]);

  if (!transition) return null;

  const { currentRect } = transition;

  return (
    <div
      className={`hiltech-product-route-transition is-${transition.phase}`}
      data-product-route-transition
      data-product-transition-id={transition.productId}
      style={{
        left: currentRect.left,
        top: currentRect.top,
        width: currentRect.width,
        height: currentRect.height,
      }}
      aria-hidden="true"
    >
      <img src={transition.src} alt="" />
      <div>
        <span>REFERENCE → DETAIL</span>
        <strong>{transition.productId}</strong>
      </div>
    </div>
  );
}
