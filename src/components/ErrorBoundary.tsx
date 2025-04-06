import { ReactElement, ReactNode } from "react";
import {
  ErrorBoundary as ReactErrorBoundary,
  FallbackProps,
} from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { useLocation } from "react-router-dom";
import ErrorFallback from "./ErrorFallback";

export default function ErrorBoundary({
  children,
  resetKey,
  customFallback,
}: {
  children: ReactNode;
  resetKey?: string;
  customFallback?: (props: FallbackProps) => JSX.Element;
}) {
  const location = useLocation();
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ReactErrorBoundary
          key={resetKey ?? location?.pathname}
          fallbackRender={customFallback ?? ErrorFallback}
          onReset={reset}
        >
          {children}
        </ReactErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
