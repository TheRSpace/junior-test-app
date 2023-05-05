import "../assets/FormInput.scss";
import ValidationMessage from "./ValidationMessage";
const FormInput = (props) => {
  const { label, patternErrorMessage, errorMessage, onChange, id, ...inputProps } = props;
  // return (
  //   <div className="form-input">
  //     <label>{label}</label>
  //     <input {...inputProps} onChange={onChange}></input>
  //     <span>{errorMessage}</span>
  //     {/* <input ref={props.refer} placeholder={props.placeholder} /> */}
  //   </div>
  // );
  return (
    <>
      <label>{label}</label>
      <div className="form-input">
        <input id={inputProps.name} {...inputProps} onChange={onChange} />
        <ValidationMessage errorMessage={errorMessage[inputProps.name]} />
        {/* <span>{errorMessage[inputProps.name]}</span> */}
        {/* <span>{patternErrorMessage}</span> */}
      </div>
    </>
  );
};
export default FormInput;
