import { createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layout/DefaultLayout.tsx";
import ECommerce from "@/pages/Dashboard/ECommerce.tsx";
import PageTitle from "@/components/PageTitle";
import Calendar from "@/pages/Calendar";
import Profile from "@/pages/Profile";
import Tables from "@/pages/Tables";
import Settings from "@/pages/Settings";
import Chart from "@/pages/Chart";
import Alerts from "@/pages/UiElements/Alerts";
import Buttons from "@/pages/UiElements/Buttons";
import SignUp from "@/pages/Authentication/SignUp";
import FormElements from "@/pages/Form/FormElements";
import FormLayout from "@/pages/Form/FormLayout";
import SignIn from "@/pages/Authentication/SignIn";

export const router = createBrowserRouter([
  {
    path: "/auth/signin",
    element:
      <>
        <PageTitle title="Signin | Admin - Template" />
        <SignIn />
      </>
  },
  {
    path: "/auth/signup",
    element:
      <>
        <PageTitle title="Signup | Admin - Template" />
        <SignUp />
      </>
  },
  {
    path: "/",
    element: <DefaultLayout />,
    // errorElement: <NotFound />,
    children: [
      {
        index: true,
        element:
          <>
            <PageTitle title="eCommerce Dashboard | Admin - Template" />
            <ECommerce />
          </>
      },
      {
        path: "/calendar",
        element:
          <>
            <PageTitle title="Calendar | Admin - Template" />
            <Calendar />
          </>
      },
      {
        path: "/profile",
        element:
          <>
            <PageTitle title="Profile | Admin - Template" />
            <Profile />
          </>
      },
      {
        path: "/tables",
        element:
          <>
            <PageTitle title="Tables | Admin - Template" />
            <Tables />
          </>
      },
      {
        path: "/settings",
        element:
          <>
            <PageTitle title="Settings | Admin - Template" />
            <Settings />
          </>
      },
      {
        path: "/chart",
        element:
          <>
            <PageTitle title="Chart | Admin - Template" />
            <Chart/>
          </>
      },
      {
        path: "/ui/alerts",
        element:
          <>
            <PageTitle title="Alerts | Admin - Template" />
            <Alerts/>
          </>
      },
      {
        path: "/ui/buttons",
        element:
          <>
            <PageTitle title="Buttons | Admin - Template" />
            <Buttons/>
          </>
      },
      {
        path: "/forms/form-elements",
        element:
          <>
            <PageTitle title="Form Elements | Admin - Template" />
            <FormElements />
          </>
      },
      {
        path: "/forms/form-layout",
        element:
          <>
            <PageTitle title="Form Layout | Admin - Template" />
            <FormLayout />
          </>
      },
    ],
  },
  {
    path: "*",
    element: <div>404</div>,
  }
]);
