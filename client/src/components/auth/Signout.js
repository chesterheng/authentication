import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { signout } from "../../actions";

const Signout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(signout());
  }, [dispatch]);
  return <div>Signout</div>;
};

export default Signout;
