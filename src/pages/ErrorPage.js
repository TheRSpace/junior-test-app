import { useRouteError } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../assets/ErrorPage.scss";
import Navbar from "../components/Navbar";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);
  return (
    <>
      <Navbar />
      <section className="error">
        <div id="error-page">
          <div className="errorpage-logo">
            <img src={logo} className="errorpage-logo-img" alt="logo" />
          </div>
          <div className="content">
            <p>Unexpected error has occured</p>
            <p>
              <i>{error.statusText || error.message}</i>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
