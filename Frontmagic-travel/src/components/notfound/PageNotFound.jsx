import React from "react";
import { useNavigate } from "react-router-dom";

import "./pag.css";
const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bodys">
      <div id="error-page">
        <div className="content">
          <h2 className="headers" data-text="404">
            404
          </h2>
          <h4 data-text="Opps! Page not found">Opps! Page not found</h4>
          <p>
            Sorry, the page you're looking for doesn't exist. If you think
            something is broken, report a problem.
          </p>
          <div class="btns">
            <button
              className="btn btn-lg btn-info"
              onClick={() => {
                navigate(-1);
              }}
            >
              return
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
