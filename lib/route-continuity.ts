export const ROUTE_CONTINUITY_EVENT = 'hiltech-route-continuity';

export type RouteContinuityKind = 'nav' | 'solution' | 'work';

export type RouteContinuityRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type RouteContinuityDetail = {
  kind: RouteContinuityKind;
  href: string;
  label: string;
  sourceRect: RouteContinuityRect;
  destinationRect?: RouteContinuityRect;
  destinationKey?: string;
  markup?: string;
  src?: string;
  alt?: string;
  targetId?: string;
  sourceVariant?: 'map';
};

type RouteClickLike = {
  button: number;
  defaultPrevented: boolean;
  metaKey: boolean;
  ctrlKey: boolean;
  shiftKey: boolean;
  altKey: boolean;
};

export function shouldInterceptRouteClick(event: RouteClickLike) {
  return (
    event.button === 0 &&
    !event.defaultPrevented &&
    !event.metaKey &&
    !event.ctrlKey &&
    !event.shiftKey &&
    !event.altKey
  );
}

export function emitRouteContinuity(detail: RouteContinuityDetail) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<RouteContinuityDetail>(ROUTE_CONTINUITY_EVENT, { detail }));
}
