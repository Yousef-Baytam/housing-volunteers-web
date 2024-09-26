/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import { useEffect } from "react";
import Router, { NextRouter } from "next/router";

const saveScrollPos = (asPath: string) => {
  sessionStorage.setItem(
    `scrollPos:${asPath}`,
    JSON.stringify({ x: window.scrollX, y: window.scrollY }),
  );
};

const restoreScrollPos = (asPath: string) => {
  const json = sessionStorage.getItem(`scrollPos:${asPath}`);
  const scrollPos = json ? JSON.parse(json) : undefined;
  if (scrollPos) {
    window.scrollTo(scrollPos.x, scrollPos.y);
  }
};

const useScrollRestoration = (router: NextRouter, ignoreQueryParams = true) => {
  useEffect(() => {
    if (!("scrollRestoration" in window.history)) return;
    let shouldScrollRestore = false;
    window.history.scrollRestoration = "manual";
    restoreScrollPos(
      ignoreQueryParams ? router.asPath?.split("?")?.[0] : router.asPath,
    );

    const onBeforeUnload = (event: BeforeUnloadEvent) => {
      saveScrollPos(
        ignoreQueryParams ? router.asPath?.split("?")?.[0] : router.asPath,
      );
      delete event.returnValue;
    };

    const onRouteChangeStart = () => {
      saveScrollPos(
        ignoreQueryParams ? router.asPath?.split("?")?.[0] : router.asPath,
      );
    };

    const onRouteChangeComplete = (url: string) => {
      if (shouldScrollRestore) {
        shouldScrollRestore = false;
        /**
         * Calling with relative url, not expected asPath, so this
         * will break if there is a basePath or locale path prefix.
         */
        restoreScrollPos(url);
      }
    };

    window.addEventListener("beforeunload", onBeforeUnload);
    Router.events.on("routeChangeStart", onRouteChangeStart);
    Router.events.on("routeChangeComplete", onRouteChangeComplete);
    Router.beforePopState(() => {
      shouldScrollRestore = true;
      return true;
    });

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      Router.events.off("routeChangeStart", onRouteChangeStart);
      Router.events.off("routeChangeComplete", onRouteChangeComplete);
      Router.beforePopState(() => true);
    };
  }, [ignoreQueryParams, router]);
};

export { useScrollRestoration };
