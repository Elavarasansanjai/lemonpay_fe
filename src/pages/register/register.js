import { useNavigate } from "react-router-dom";
import Logo from "../../assets/navbar/lemon_logo.png";
const Register = () => {
  const navigate = useNavigate();
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
          <form>
            <div className="login_form_inp_container">
              <label>Email</label>
              <input
                className="login_form_inp"
                type="email"
                placeholder="Enter You Email"
              />
            </div>
            <div className="login_form_inp_container">
              <label>Password</label>
              <input
                className="login_form_inp"
                type="password"
                placeholder="Enter You Password 8 digit"
              />
            </div>
            <div className="login_form_inp_container">
              <label>Confirm Password</label>
              <input
                className="login_form_inp"
                type="password"
                placeholder="Enter You Password 8 digit"
              />
            </div>
            <div className="login_remember_me">
              <p>Remember Me</p>
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
              Sign Up
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
