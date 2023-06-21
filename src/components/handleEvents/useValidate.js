import { useEffect, useState } from "react";
import { useCheckSku } from "../../api/productApi";

const useValidate = () => {
  const [isValid, setValid] = useState(false);
  useEffect(function onTyping() {
    const eventHandler = (e) => {};
  });
  const valid = useCheckSku(sku);
  return [valid];
};

export default useValidate;
