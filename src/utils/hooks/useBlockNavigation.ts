import { useCallback, useEffect } from "react";
import { useRouter } from "next/router";

const confirmExit = () => "";

const useBlockNavigation = (isBlocked: boolean) => {
  const { asPath, events } = useRouter();

  const handleRouteChange = useCallback(
    (url: string) => {
      const currentPath = asPath.split("?")[0];
      const newPath = url.split("?")[0];
      if (currentPath !== newPath && isBlocked) {
        if (
          // eslint-disable-next-line no-alert
          window.confirm(
            "You have unsaved changes. Are you sure you want to leave?",
          )
        ) {
          return;
        }
        events.emit("routeChangeError");
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw "route change aborted";
      }
    },
    [asPath, events, isBlocked],
  );

  useEffect(() => {
    if (isBlocked) window.onbeforeunload = confirmExit;
    else window.onbeforeunload = null;
  }, [isBlocked]);

  useEffect(() => {
    events.on("routeChangeStart", handleRouteChange);

    return () => {
      events.off("routeChangeStart", handleRouteChange);
    };
  }, [handleRouteChange, events, isBlocked]);
};

export { useBlockNavigation };
