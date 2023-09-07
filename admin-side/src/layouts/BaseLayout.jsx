import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { ToastContainer } from "react-toastify";
export default function BaseLayout() {
  return (
    <>
      <Sidebar />
      <Outlet />
      <ToastContainer />
    </>
  );
}
