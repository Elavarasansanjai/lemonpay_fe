import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiList } from "../../context/apiList";
import { action } from "../../context/action";
import { AppContext } from "../../context/context";
import toast from "react-hot-toast";

const Auth = ({ Component }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const {
    apiGETMethod,
    state: { userProfile },
  } = useContext(AppContext);
  let profileSts = userProfile?.code === 200;
  useEffect(() => {
    setLoading(true);
    if (localStorage.getItem("lemonpaytoken")) {
      apiGETMethod(apiList?.userProfile, action.userProfile).then((res) => {
        setLoading(false);
        if (res.code !== 200) {
          navigate("/login");
        }
      });
    } else {
      navigate("/login");
      toast.error("Please Login");
    }
  }, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {!loading && profileSts ? (
        <Component />
      ) : (
        <>Something Went Wrong! Please Come Again!</>
      )}
    </div>
  );
};

export default Auth;
