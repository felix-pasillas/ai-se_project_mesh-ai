import { NavLink } from "react-router-dom";
import { useFormWithValidation } from "../../hooks/useFormWithValidation";
import logo from "../../assets/logo.png";

function getTabClass({ isActive }: { isActive: boolean }) {
  return isActive ? "form__tab form__tab_active" : "form__tab";
}

export default function Login() {
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  const handleSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <>
      <header className="header">
        <img className="header__logo" alt="MeshAI logo" src={logo} />
      </header>

      <main className="form-page">
        <section className="form-card">
          <h1 className="form__title">Sign in</h1>
          <p className="form__subtitle">
            Access your organisation's secure workspace
          </p>

          <nav className="form__tabs">
            <NavLink to="/login" className={getTabClass}>
              Login
            </NavLink>
            <NavLink to="/register" className={getTabClass}>
              Register
            </NavLink>
          </nav>

          <form className="form" onSubmit={handleSubmit}>
            <label className="form__label" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              className="form__input"
              type="email"
              name="email"
              autoComplete="email"
              required
              value={values.email ?? ""}
              onChange={handleChange}
            />
            <span className="form__error">{errors.email}</span>

            <label className="form__label" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              className="form__input"
              type="password"
              name="password"
              autoComplete="current-password"
              required
              minLength={8}
              value={values.password ?? ""}
              onChange={handleChange}
            />
            <span className="form__error">{errors.password}</span>

            {/* API errors will show here once the form is connected */}
            <p className="form__status" aria-live="polite" />

            <button
              className="form__submit"
              type="submit"
              disabled={!isValid}
            >
              Login
            </button>
          </form>
        </section>
      </main>
    </>
  );
}