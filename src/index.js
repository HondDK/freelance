import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OrdersPage from "./pages/OrdersPage";
import RegPage from "./pages/RegPage";
import NewOrderCreate from "./pages/NewOrderCreate";
import OrderDetailPage from "./pages/OrderDetailPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import UserProfile from "./pages/UserProfile";

import "./style/style.scss";
const router = createBrowserRouter([
	{
		path: "/",
		element: <MainPage />,
	},
	{
		path: "/orders",
		element: <OrdersPage />,
	},
	{
		path: "/order_detail/:uuid",
		element: <OrderDetailPage />,
	},
	{
		path: "/registration",
		element: <RegPage />,
		isPrivate: true,
	},
	{
		path: "/login",
		element: <LoginPage />,
	},
	{
		path: "/profile",
		element: <UserPage />,
	},
	{
		path: "/user_profile/:user",
		element: <UserProfile />,
	},
	{
		path: "/new_order_create",
		element: <NewOrderCreate></NewOrderCreate>,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
