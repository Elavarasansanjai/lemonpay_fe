import { useNavigate } from "react-router-dom";
import Logo from "../../assets/navbar/lemon_logo.png";
import { AppContext } from "../../context/context";
import { useContext, useEffect, useState } from "react";
import { apiList } from "../../context/apiList";
import { action } from "../../context/action";
import { validateEmail, validatePassword } from "../../utils/Regex";
import eye_open from "../../assets/eye_open.png";
import eye_close from "../../assets/eye_close.png";
const Register = () => {
  const navigate = useNavigate();
  const {
    apiPOSTMethod,
    state: { userProfile },
    dispatch,
    apiGETMethod,
  } = useContext(AppContext);
  const [formData, setFormData] = useState({
    email: "",

    password: "",
    passCheck: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [err, setErr] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  let profileSts = userProfile?.code === 200;
  useEffect(() => {
    if (localStorage.getItem("lemonpaytoken")) {
      apiGETMethod(apiList?.userProfile, action.userProfile).then((res) => {
        if (res?.code === 200) {
          navigate(`/task`);
        }
      });
    }
  }, []);
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setErr({});
    if (name === "profilePic") {
      setFormData({ ...formData, profilePic: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  const checkInputs = (formData) => {
    let err = {};
    let formDataKeys = Object.keys(formData);

    if (!formDataKeys.length) {
      err.name = "Name should contain letters and spaces only.";
      err.email = "Invalid Email Id";
      err.password = "Invalid Password!";
      err.profilePic = "Please Select Profile!";
      err.userType = "Invalid User Type!";
    }

    for (let index = 0; index < formDataKeys.length; index++) {
      const curentElem = formDataKeys[index];
      if (!formData[curentElem]) {
        err[curentElem] = `Please Fill ${curentElem}`;
      }
      switch (curentElem) {
        case "email":
          const checkEmail = validateEmail(formData?.email);
          if (!checkEmail) {
            err[curentElem] = "Please enter a valid email address.";
          }

          break;
        case "password":
          const checkPassword = validatePassword(formData?.password);
          if (!checkPassword) {
            err[curentElem] =
              "Password must be at least 8 characters long, include uppercase, lowercase, number, and special character.";
          }

          break;
        case "passCheck":
          if (formData?.passCheck !== formData?.password) {
            err[curentElem] = "password not match!";
          }

          break;

        default:
          break;
      }
    }
    return err;
  };

  const handleSubmit = (e) => {
    setFormLoading(true);
    e.preventDefault();
    const formErr = checkInputs(formData);
    console.log(formErr);
    const checkErrLength = Object.keys(formErr).length;
    if (checkErrLength) {
      console.log(formErr);
      setFormLoading(false);
      setErr(formErr);
    } else {
      // start upload form

      apiPOSTMethod(apiList?.register, formData).then((res) => {
        setFormLoading(false);
        if (res?.code === 200) {
          localStorage.setItem("lemonpaytoken", res?.token);
          navigate("/task");
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
        <div
          className="login_form_container"
          style={{ transform: "translateY(-50px)" }}
        >
          <p className="login_form_header">Welcome Sign Up System </p>
          <div className="login_description_form">
            <p className="login_description_form_text">
              Your gateway to seamless
            </p>
            <p className="login_description_form_text">
              {" "}
              transactions and easy payments.
            </p>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="login_form_inp_container">
              <label>Email</label>
              <input
                className="login_form_inp"
                type="email"
                style={{
                  border: err?.email ? "1px solid red" : "1px solid #ccc",
                }}
                name="email"
                placeholder="Enter You Email"
                onChange={handleChange}
              />
            </div>
            {err?.email && (
              <span className="register_err_text">{err?.email}</span>
            )}
            <div className="login_form_inp_container">
              <label>Password</label>
              <input
                type={showPassword ? "text" : "password"}
                style={{
                  border: err?.password ? "1px solid red" : "1px solid #ccc",
                }}
                name="password"
                className="login_form_inp"
                placeholder="Enter You Password 8 digit"
                onChange={handleChange}
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
            <div className="login_form_inp_container">
              <label>Confirm Password</label>
              <input
                className="login_form_inp"
                type="password"
                placeholder="Enter You Password 8 digit"
                name="passCheck"
                onChange={handleChange}
              />
            </div>
            {err?.passCheck && (
              <span className="register_err_text">{err?.passCheck}</span>
            )}
            <div className="login_remember_me">
              <p></p>
              <p
                style={{ cursor: "pointer" }}
                onClick={() => {
                  navigate("/login");
                }}
              >
                Sign In
              </p>
            </div>
            <button type="submit" className="form_submit_btn">
              {formLoading ? "Loading.." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
      <div className="shade_2"></div>
      <div className="shade_3"></div>
    </div>
  );
};

export default Register;
