import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/FakeAuthContext";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isLoggedIn) navigate("/");
    },
    [isLoggedIn, navigate],
  );

  return isLoggedIn ? children : null;
}

export default ProtectedRoute;
