import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Loader from "./common/Loader";
import { router } from "./routes/Routes.tsx";
import "@mantine/core/styles.css";

import { MantineProvider } from "@mantine/core";

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <MantineProvider>
        <RouterProvider router={router} />
      </MantineProvider>
    </>
  );
}

export default App;
