import React from "react";
import ReactDOM from "react-dom/client";
import "./style/style.scss";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import OrdersPage from "./pages/OrdersPage";
import RegPage from "./pages/RegPage";
import NewOrderCreate from "./pages/NewOrderCreate";

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
		path: "/orders_detail",
		element: <OrdersPage />,
	},
	{
		path: "/registration",
		element: <RegPage />,
	},
	{
		path: "/new_order_create",
		element: <NewOrderCreate></NewOrderCreate>,
	},
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
