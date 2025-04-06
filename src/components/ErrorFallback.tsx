import LOGO404 from "../assets/404.svg";

export default function ErrorFallback({ error, resetErrorBoundary }: any) {
  console.log(error);
  if (error?.response?.status) {
    switch (error?.response?.status) {
      case 401:
        return <InternalServer resetBoundary={resetErrorBoundary} />;

      case 500:
        return (
          <InternalServer resetBoundary={resetErrorBoundary} error={error} />
        );

      case 403:
        return <PageNotFound resetBoundary={resetErrorBoundary} />;

      case 404:
        return <PageNotFound resetBoundary={resetErrorBoundary} />;

      default:
        return (
          <InternalServer resetBoundary={resetErrorBoundary} error={error} />
        );
    }
  }

  if (error?.message === "Network Error") {
    return <NoInternet resetBoundary={resetErrorBoundary} />;
  }

  return (
    <>
      <p>Try again</p>
    </>
  );
}

export function PageNotFound({ resetBoundary }: any) {
  return <div className="flex justify-center text-[120px] font-bold">404</div>;
}

export function NoInternet({ resetBoundary }: any) {
  return (
    <>
      <img src={LOGO404} alt="No Internet Found" width={470} />
    </>
  );
}

export function InternalServer({ resetBoundary, error }: any) {
  return (
    <>
      <img src={LOGO404} alt="internal server error" width={470} />
    </>
  );
}
