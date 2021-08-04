import React from "react";
import { Link } from "react-router-dom";

function GenericNotFound() {
  return (
    <div className="error404">
      <h2 className="error404__title">Error 404</h2>
      <Link to="/signin" className="error404__link">
        Go to the login page
      </Link>
    </div>
  );
}

export default GenericNotFound;
