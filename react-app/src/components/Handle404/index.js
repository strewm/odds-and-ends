import { NavLink } from "react-router-dom";
import "./Handle404.css";

function Handle404() {
  return (
      <div className="handle404">
          <div>Oops!</div>
          <NavLink to="/">No odds or ends here. Return to home.</NavLink>
      </div>
  );
}

export default Handle404;
