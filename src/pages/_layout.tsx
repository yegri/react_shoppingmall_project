import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getClient } from "../queryClient";
import "../scss/index.scss";
import Gnb from "../assets/components/gnb";
import { worker } from "../mocks/browser";

if (import.meta.env.DEV) {
  worker.start();
}

const Layout: React.FC = () => {
  const queryClient = getClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={"loading..."}>
        <Gnb />
        <Outlet />
      </Suspense>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Layout;
