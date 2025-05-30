import { useNavigate } from "react-router-dom";
import Logo from "../../assets/navbar/lemon_logo.png";
import "./login.css";

import eye_open from "../../assets/eye_open.png";
import eye_close from "../../assets/eye_close.png";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/context";
import { validateEmail, validatePassword } from "../../utils/Regex";
import { apiList } from "../../context/apiList";
import { action } from "../../context/action";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loginLoading, setLoginLoading] = useState(false);
  const { apiPOSTMethod, apiGETMethod } = useContext(AppContext);
  const [err, setErr] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setErr({});
    setFormData({ ...formData, [name]: value });
  };
  useEffect(() => {
    if (localStorage.getItem("lemonpaytoken")) {
      apiGETMethod(apiList?.userProfile, action.userProfile).then((res) => {
        if (res?.code === 200) {
          navigate(`/task`);
        }
      });
    }
  }, []);

  const checkInputs = (formData) => {
    let err = {};
    let formDataKeys = Object.keys(formData);

    if (!formDataKeys.length) {
      err.email = "Invalid Email Id";
      err.password = "Invalid Password!";
    }

    for (let index = 0; index < formDataKeys.length; index++) {
      const curentElem = formDataKeys[index];
      if (!formData[curentElem]) {
        err[curentElem] = `Please Fill ${curentElem}`;
      }
      switch (curentElem) {
        case "email":
          const checkInp = validateEmail(formData?.email);
          if (!checkInp) {
            err[curentElem] = "Name should contain letters and spaces only.";
          }

          break;

        case "password":
          const checkPassword = validatePassword(formData?.password);
          if (!checkPassword) {
            err[curentElem] =
              "Password must be at least 8 characters, include uppercase, lowercase, number, special character.";
          }

          break;

        default:
          break;
      }
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    const formErr = checkInputs(formData);
    console.log(formErr);
    const checkErrLength = Object.keys(formErr).length;
    if (checkErrLength) {
      console.log(formErr);
      setErr(formErr);
      setLoginLoading(false);
    } else {
      apiPOSTMethod(apiList?.loginUser, formData).then((res) => {
        setLoginLoading(false);
        if (res?.code === 200) {
          localStorage.setItem("lemonpaytoken", res.token);

          navigate(`/task`);
        }
      });
    }
  };
  return (
    <div className="login_container">
      <div className="shade_1"></div>
      <div className="login_header_logo">
        <img src={Logo} alt="Lemon Logo" />
      </div>
      <div className="login_sub_container">
        <div className="login_text_container">
          <p className="login_text">
            Join 1000<span className="add_icon">+</span> Businesses{" "}
            <span className="login_yellow_text"> with Powering Growth</span>{" "}
            Lemonpay!
          </p>
        </div>
        <div className="login_form_container">
          <p className="login_form_header">Welcome Login System </p>
          <div className="login_description_form">
            <p className="login_description_form_text">
              Your gateway to seamless
            </p>
            <p className="login_description_form_text">
              {" "}
              transactions and easy payments.
            </p>
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="login_form_inp_container">
              <label>Email</label>
              <input
                className="login_form_inp"
                style={{
                  border: err?.email ? "1px solid red" : "1px solid #ccc",
                }}
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Enter You Email"
              />
              {err?.email && (
                <span className="register_err_text">{err?.email}</span>
              )}
            </div>
            <div className="login_form_inp_container">
              <label>Password</label>
              <input
                className="login_form_inp"
                type={showPassword ? "text" : "password"}
                style={{
                  border: err?.password ? "1px solid red" : "1px solid #ccc",
                }}
                name="password"
                onChange={handleChange}
                placeholder="Enter You Password 8 digit"
              />
              <img
                src={showPassword ? eye_open : eye_close}
                className="register_toggle_password"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide Password" : "Show Password"}
              />
            </div>
            {err?.password && (
              <span className="register_err_text">{err?.password}</span>
            )}
            <div className="login_remember_me">
              <p></p>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/register");
                }}
              >
                Sign Up
              </p>
            </div>
            <button type="submit" className="form_submit_btn">
              {loginLoading ? "Loading..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
      <div className="shade_2"></div>
      <div className="shade_3"></div>
    </div>
  );
};

export default Login;
