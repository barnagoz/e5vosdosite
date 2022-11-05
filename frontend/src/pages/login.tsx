import LoginForm from "components/Login";
import refreshCSRF from "lib/csrf";
import { useSelector } from "lib/store";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const LoginPage = () => {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const params = useParams();
  useEffect(() => {
    if (token !== "") {
      refreshCSRF().then(() => {
        navigate(params.next ?? "/dashboard", { replace: true });
      });
    }
  }, [navigate, token, params.next]);

  return token !== "" ? <>Már bejelentkezve</> : <LoginForm />;
};

export default LoginPage;
