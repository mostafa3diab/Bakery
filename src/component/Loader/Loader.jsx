import React from "react";
import { DNA } from "react-loader-spinner";

function Loader() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <DNA
        visible={true}
        height="80"
        width="80"
        ariaLabel="dna-loading"
        wrapperStyle={{}}
        wrapperClassName="dna-wrapper"
      />
    </div>
  );
}

export default Loader;
