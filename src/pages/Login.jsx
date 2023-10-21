import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useContext, useEffect, useState } from "react";
import PageNav from "../components/PageNav";
import { AuthContext } from "../contexts/FakeAuthContext";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");

  const { login, isLoggedIn } = useContext(AuthContext);

  //   navigate("/app")
  const navigate = useNavigate();

  useEffect(() => {
    
    if (isLoggedIn) {
      navigate('/app' , {replace : true});
    }
  }, [isLoggedIn, navigate]);

  return (
    <main className={styles.login}>
      <PageNav />
      <form className={styles.form}>
        <div className={styles.row}>
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div className={styles.row}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>

        <div>
          <Link 
            className="cta"
            onClick={() => {
              login(email, password);
            }}
          >
            Login
          </Link>
        </div>
      </form>
    </main>
  );
}
