import React from "react";
import loadingImg from "../../src/images/loading.gif";
const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loadingImg} className="my-3" alt="loading" />
    </div>
  );
};

export default Spinner;
