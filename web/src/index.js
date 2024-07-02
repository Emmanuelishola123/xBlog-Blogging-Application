import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import { Layout } from "./components";
import {
  ForgetPassword,
  Register,
  Login,
  PostPage,
  ProfilePage,
  SearchPage,
  ResetPassword,
  SettingPage,
  NewPostPage,
  NotFoundPage,
  ProtectedRoute,
} from "./pages";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./redux/store";
import { MantineProvider } from "@mantine/core";
const queryClient = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ChakraProvider>
    <MantineProvider>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<App />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="404" element={<NotFoundPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Route>
              <Route path="profile" element={<Layout />}>
                {/* <Route index element={<App />} /> */}
                <Route
                  path="settings"
                  element={
                    <ProtectedRoute>
                      <SettingPage />
                    </ProtectedRoute>
                  }
                />
                <Route path=":username" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Route>
              <Route path="post" element={<Layout />}>
                {/* <Route index element={<App />} /> */}
                <Route
                  path="new"
                  element={
                    <ProtectedRoute>
                      <NewPostPage />
                    </ProtectedRoute>
                  }
                />
                <Route path=":postSlug" element={<PostPage />} />
                <Route path="*" element={<Navigate to="/404" />} />
              </Route>
              <Route
                path="auth"
                element={
                  <Layout>
                    <ProtectedRoute authPage={true} />
                  </Layout>
                }
              >
                <Route index element={<Register />} />
                <Route path="join" element={<Register />} />
                <Route path="login" element={<Login />} />
                <Route path="forget-password" element={<ForgetPassword />} />
                <Route
                  path="reset-password/:resetToken"
                  element={<ResetPassword />}
                />
                <Route path="*" element={<Navigate to="/404" />} />
              </Route>
              <Route path="*" element={<Navigate to="/404" />} />
            </Routes>
          </BrowserRouter>
        </QueryClientProvider>
      </Provider>
    </MantineProvider>
  </ChakraProvider>
);
