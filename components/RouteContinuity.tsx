'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import {
  ROUTE_CONTINUITY_EVENT,
  type RouteContinuityDetail,
  type RouteContinuityRect,
} from '@/lib/route-continuity';

type Phase = 'source' | 'handoff' | 'arriving';

type TransitionState = RouteContinuityDetail & {
  targetPath: string;
  phase: Phase;
  currentRect: RouteContinuityRect;
};

function getHandoffRect(kind: RouteContinuityDetail['kind']) {
  const compact = window.matchMedia('(max-width: 767px)').matches;
  const viewportWidth = window.innerWidth;
  const viewportHeight = window.innerHeight;

  if (kind === 'solution') {
    const width = compact ? Math.min(viewportWidth * 0.9, 620) : Math.min(viewportWidth * 0.62, 920);
    const height = Math.min(width * 0.7, compact ? viewportHeight * 0.52 : viewportHeight * 0.64);
    return {
      left: (viewportWidth - width) / 2,
      top: Math.max(76, (viewportHeight - height) / 2),
      width,
      height,
    };
  }

  if (kind === 'work') {
    const width = compact ? Math.min(viewportWidth * 0.86, 560) : Math.min(viewportWidth * 0.48, 760);
    const height = compact ? Math.min(viewportHeight * 0.48, 520) : Math.min(viewportHeight * 0.56, 620);
    return {
      left: (viewportWidth - width) / 2,
      top: Math.max(78, (viewportHeight - height) / 2),
      width,
      height,
    };
  }

  return {
    left: viewportWidth / 2,
    top: 64,
    width: 1,
    height: 1,
  };
}

function escapeTargetId(value: string) {
  if (typeof CSS !== 'undefined' && CSS.escape) return CSS.escape(value);
  return value.replace(/["\\]/g, '\\$&');
}

function targetSelector(transition: TransitionState) {
  const escaped = escapeTargetId(transition.targetId ?? '');

  if (transition.kind === 'solution') {
    return escaped
      ? `[data-solution-carry-target="${escaped}"]`
      : '[data-solution-carry-target]';
  }

  if (transition.kind === 'work') {
    return escaped
      ? `[data-work-carry-target="${escaped}"]`
      : '[data-work-carry-target]';
  }

  return '';
}

function findVisibleNavDestination(key: string | undefined) {
  if (!key) return null;
  return Array.from(
    document.querySelectorAll<HTMLElement>(`[data-route-continuity-link="${escapeTargetId(key)}"]`),
  ).find((element) => {
    const rect = element.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }) ?? null;
}

export default function RouteContinuity() {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [transition, setTransition] = useState<TransitionState | null>(null);
  const navigationTimerRef = useRef<number | null>(null);
  const finishTimerRef = useRef<number | null>(null);
  const locateFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setIsReady(true);
  }, []);

  useEffect(() => {
    const clearTimers = () => {
      if (navigationTimerRef.current) window.clearTimeout(navigationTimerRef.current);
      if (finishTimerRef.current) window.clearTimeout(finishTimerRef.current);
      if (locateFrameRef.current) window.cancelAnimationFrame(locateFrameRef.current);
    };

    const handleTransition = (event: Event) => {
      const customEvent = event as CustomEvent<RouteContinuityDetail>;
      const detail = customEvent.detail;
      if (!detail?.href || !detail.kind) return;

      const targetPath = new URL(detail.href, window.location.origin).pathname;
      if (targetPath === pathname) return;

      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        router.push(detail.href);
        return;
      }

      clearTimers();
      setTransition({
        ...detail,
        targetPath,
        phase: 'source',
        currentRect: detail.sourceRect,
      });

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransition((current) =>
            current
              ? {
                  ...current,
                  phase: 'handoff',
                  currentRect:
                    current.kind === 'nav' && current.destinationRect
                      ? current.destinationRect
                      : getHandoffRect(current.kind),
                }
              : current,
          );
        });
      });

      navigationTimerRef.current = window.setTimeout(
        () => router.push(detail.href),
        detail.kind === 'nav' ? 170 : 260,
      );
    };

    window.addEventListener(ROUTE_CONTINUITY_EVENT, handleTransition);
    return () => {
      window.removeEventListener(ROUTE_CONTINUITY_EVENT, handleTransition);
      clearTimers();
    };
  }, [pathname, router]);

  useEffect(() => {
    if (!transition || pathname !== transition.targetPath) return;

    if (transition.kind === 'nav') {
      const destination = findVisibleNavDestination(transition.destinationKey);
      const rect = destination?.getBoundingClientRect();
      setTransition((current) => current ? {
        ...current,
        phase: 'arriving',
        currentRect: rect
          ? { left: rect.left, top: rect.top, width: rect.width, height: rect.height }
          : current.currentRect,
      } : current);
      if (finishTimerRef.current) window.clearTimeout(finishTimerRef.current);
      finishTimerRef.current = window.setTimeout(() => setTransition(null), 280);
      return;
    }

    const selector = targetSelector(transition);
    if (!selector) {
      setTransition(null);
      return;
    }

    let attempts = 0;
    const locateDestination = () => {
      const destination = document.querySelector<HTMLElement>(selector);
      if (!destination) {
        attempts += 1;
        if (attempts < 60) {
          locateFrameRef.current = window.requestAnimationFrame(locateDestination);
        } else {
          setTransition(null);
        }
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
      finishTimerRef.current = window.setTimeout(() => setTransition(null), 460);
    };

    locateFrameRef.current = window.requestAnimationFrame(locateDestination);
  }, [pathname, transition?.targetPath]);

  if (!transition) {
    return isReady ? <span hidden data-hiltech-app-ready /> : null;
  }

  if (transition.kind === 'nav') {
    const viewportWidth = typeof window === 'undefined' ? 1440 : window.innerWidth;
    const sourceX = Math.max(
      18,
      Math.min(
        viewportWidth - 18,
        transition.sourceRect.left + transition.sourceRect.width / 2,
      ),
    );
    const targetRect = transition.destinationRect ?? transition.currentRect;
    const targetX = Math.max(
      18,
      Math.min(viewportWidth - 18, targetRect.left + targetRect.width / 2),
    );
    const signalDelta = targetX - sourceX;

    return (
      <div
        className={`hiltech-route-continuity-nav is-${transition.phase}`}
        data-route-continuity
        data-route-continuity-kind="nav"
        aria-hidden="true"
      >
        <svg
          viewBox={`0 0 ${viewportWidth} 104`}
          preserveAspectRatio="none"
          style={{ '--hiltech-nav-signal-delta': `${signalDelta}px` } as CSSProperties}
        >
          <path pathLength="1" d={`M ${sourceX} 61 V 84 H ${targetX} V 61`} />
          <circle className="is-source" cx={sourceX} cy="61" r="4" />
          <circle className="is-target" cx={targetX} cy="61" r="4" />
          <circle className="is-signal" cx={sourceX} cy="61" r="5" />
        </svg>
        <div>
          <span>PHYSICAL ROUTE</span>
          <strong>{transition.label}</strong>
        </div>
      </div>
    );
  }

  const { currentRect } = transition;

  return (
    <div
      className={`hiltech-route-carry-object is-${transition.kind} is-${transition.phase}${transition.sourceVariant ? ` is-${transition.sourceVariant}` : ''}`}
      data-route-continuity
      data-route-continuity-kind={transition.kind}
      data-route-continuity-target={transition.targetId}
      style={{
        left: currentRect.left,
        top: currentRect.top,
        width: currentRect.width,
        height: currentRect.height,
      }}
      aria-hidden="true"
    >
      {transition.kind === 'solution' ? (
        <div
          className="hiltech-route-carry-diagram"
          dangerouslySetInnerHTML={{ __html: transition.markup ?? '' }}
        />
      ) : (
        <img src={transition.src} alt="" />
      )}
      <div className="hiltech-route-carry-meta">
        <span>{transition.kind === 'solution' ? 'SYSTEM → DETAIL' : 'EVIDENCE → ARCHIVE'}</span>
        <strong>{transition.label}</strong>
      </div>
    </div>
  );
}
