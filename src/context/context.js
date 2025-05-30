import axios from "axios";
import { createContext, useReducer } from "react";
import toast from "react-hot-toast";
import axiosInstance from "../utils/axiosConfig";

export const AppContext = createContext();
const Context = (props) => {
  const initialState = {
    userProfile: {},
    GetAllTask: {},
  };
  const reducer = (state, action) => {
    return { ...state, [action.type]: action.payload };
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  const apiPOSTMethod = async (urlpath, apiData, action) => {
    console.log(urlpath, apiData);

    const config = {
      url: urlpath,
      data: apiData,
      method: "POST",
    };

    try {
      let data = await axiosInstance(config);
      data = data.data;
      dispatch({ type: action, payload: data });
      if (data.code === 200) {
        if (data?.msg) {
          toast.success(data?.msg);
        }
      } else {
        console.log(data);
        toast.error(data?.msg);
      }
      return data;
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  const apiGETMethod = async (urlpath, action) => {
    try {
      const config = {
        url: urlpath,
        method: "GET",
      };

      let data = await axiosInstance(config);

      dispatch({ type: action, payload: data.data });
      data = data.data;
      if (data.code === 200) {
        if (data?.msg) {
          toast.success(data?.msg);
        }
      } else {
        console.log(data);
        toast.error(data?.msg);
      }
      return data;
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  return (
    <AppContext.Provider value={{ apiPOSTMethod, state, apiGETMethod }}>
      {props.children}
    </AppContext.Provider>
  );
};
export default Context;
