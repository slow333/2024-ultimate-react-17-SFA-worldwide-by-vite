import styles from "./module-css/Login.module.css";
import {useEffect, useState} from "react";
import PageNav from "../components/PageNav.jsx";
import {useAuth} from "../contexts/FakeAuthContext.jsx";
import {useNavigate} from "react-router-dom";
import Button from "../components/Button.jsx";

export default function Login() {
  // PRE-FILL FOR DEV PURPOSES
  const [email, setEmail] = useState("jack@example.com");
  const [password, setPassword] = useState("qwerty");
  const navigate = useNavigate();
  const {login, isAuthenticated } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, password)
    if(email && password)
      login(email, password)
  }
  useEffect(() => {
    if(isAuthenticated === true) navigate("/app/cities");
  }, [isAuthenticated, navigate, login]);

  return (
    <main className={styles.login} onSubmit={handleSubmit}>
      <PageNav/>
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
          <Button type='primary'>Login</Button>
        </div>
      </form>
    </main>
  );
}
