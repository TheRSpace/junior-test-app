import React from "react";

const ValidationMessage = (props) => {
  if (props.errorMessage) {
    return <span>{props.errorMessage}</span>;
  } else {
    return (
      <>
        <br />
        <span>
          <br />
        </span>
      </>
    );
  }
};

export default ValidationMessage;
