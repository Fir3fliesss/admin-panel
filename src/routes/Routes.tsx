import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layout/DefaultLayout.tsx";
import Welcome from "@/pages/Dashboard/Welcome";
import PageTitle from "@/components/PageTitle";
import SignIn from "@/pages/Authentication/SignIn";
// Berita
import CreateBerita from "@/pages/Dashboard/Berita/CreateBeritaPage";
import UpdateBerita from "@/pages/Dashboard/Berita/UpdateBeritaPage";
// Galeri
import CreateGaleri from "@/pages/Dashboard/Galeri/CreateGaleriPage";
import UpdateGaleri from "@/pages/Dashboard/Galeri/UpdateGaleriPage";
// Sarana
import CreateSarana from "@/pages/Dashboard/Sapras/CreateSaprasPage";
import UpdateSarana from "@/pages/Dashboard/Sapras/UpdateSaprasPage";
// import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <PageTitle title="Signin | Admin Panel" />
        <SignIn />
      </>
    ),
  },
  {
    path: "/Welcome",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: (
          <>
            <PageTitle title="Dashboard Admin SMK PLUSPNB" />
            <Welcome />
          </>
        ),
      },
    ],
  },
  {
    path: "/berita",
    element: <DefaultLayout />,
    children: [
      {
        path: "create",
        element: (
          <>
            <PageTitle title="Create Berita - Admin SMK PLUSPNB" />
            <CreateBerita />
          </>
        ),
      },

      {
        path: "update/:id",
        element: (
          <>
            <PageTitle title="Update Berita - Admin SMK PLUSPNB" />
            <UpdateBerita />
          </>
        ),
      },
    ],
  },
  {
    path: "/galeri",
    element: <DefaultLayout />,
    children: [
      {
        path: "create",
        element: (
          <>
            <PageTitle title="Create Berita - Admin SMK PLUSPNB" />
            <CreateGaleri />
          </>
        ),
      },

      {
        path: "update/:id",
        element: (
          <>
            <PageTitle title="Update Galeri - Admin SMK PLUSPNB" />
            <UpdateGaleri />
          </>
        ),
      },
    ],
  },
  {
    path: "/sarana",
    element: <DefaultLayout />,
    children: [
      {
        path: "create",
        element: (
          <>
            <PageTitle title="Create Sarana - Admin SMK PLUSPNB" />
            <CreateSarana />
          </>
        ),
      },
      {
        path: "update/:id",
        element: (
          <>
            <PageTitle title="Update Sarana - Admin SMK PLUSPNB" />
            <UpdateSarana />
          </>
        ),
      },
    ],
  },
  {
    path: "*",
    element: (
      <>
        <PageTitle title="404 - Halaman Tidak Ditemukan" />
        {/* <NotFoundPage /> */}
        <h1>404 - Halaman Tidak Ditemukan</h1>
      </>
    ),
  },
]);
