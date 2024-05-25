import { useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";
import Loader from "./common/Loader";
import { router } from "./routes/Routes.tsx";

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 500);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
