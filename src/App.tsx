import { useEffect, useState, StrictMode, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { MantineProvider, createTheme } from "@mantine/core";
import "@mantine/core/styles.css";
import Loader from "./common/Loader";
import { router } from "./routes/Routes.tsx";

const theme = createTheme({
  fontFamily: "Open Sans, sans-serif",
  primaryColor: "blue",
});

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <StrictMode>
        <MantineProvider theme={theme}>
          <Suspense fallback={<Loader />}>
            <RouterProvider router={router} />
          </Suspense>
        </MantineProvider>
    </StrictMode>
  );
}

export default App;
