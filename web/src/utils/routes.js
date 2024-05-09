// import { Suspense, lazy } from "react";
// import { Navigate, useRoutes } from "react-router-dom";
// import { Layout, LoadingScreen } from "";

// const Loadable = (Component) => (props) => {
//   return (
//     <Suspense fallback={<LoadingScreen />}>
//       <Component {...props} />
//     </Suspense>
//   );
// };

// const Home = Loadable(lazy(() => import("../pages/Home")));
// const Dashboard = Loadable(lazy(() => import("../pages/Dashboard")));
// const NotFound = Loadable(lazy(() => import("../pages/NotFound")));
// const Cards = Loadable(lazy(() => import("../pages/Cards")));
// const Bugs = Loadable(lazy(() => import("../pages/Bugs")));

// export default function Routes() {
//   return useRoutes([
//     {
//       path: "/",
//       element: <Layout />,
//       children: [
//         { element: <Home />, index: true },
//         { path: "admin/dashboard", element: <Dashboard /> },
//         { path: "cards", element: <Cards /> },
//         { path: "fixed-bugs", element: <Bugs /> },
//         { path: "404", element: <NotFound /> },
//         { path: "*", element: <Navigate to="/404" replace /> },
//       ],
//     },
//     { path: "*", element: <Navigate to="/404" replace /> },
//   ]);
// }
