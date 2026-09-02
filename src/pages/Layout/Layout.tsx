import { Outlet } from "react-router";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";

export default function Layout() {
  const [darkmode, setdarkmode] = useState<boolean>(
    localStorage.getItem("darkmode") === "true",
  );

  return (
    <>
      <div className={darkmode ? "dark" : ""}>
        <main>
          <Navbar darkmode={darkmode} setdarkmode={setdarkmode} />
          <Outlet />
        </main>
      </div>
    </>
  );
}
