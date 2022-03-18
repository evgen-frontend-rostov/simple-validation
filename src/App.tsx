import React, { useEffect, useState } from "react";

function App() {
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");
  const [selectVal, setSelectVal] = useState("");
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [selectDirty, setSelectDirty] = useState(false);
  const [emailError, setEmailError] = useState("Обязательное поле");
  const [passwordError, setPasswordError] = useState("Обязательное поле");
  const [selectError, setSelectError] = useState("Обязательное поле");
  const [isValid, setIsValid] = useState(false);

  const blurHandler = (e: any) => {
    switch (e.target.name) {
      case "email":
        setEmailDirty(true);
        break;
      case "password":
        setPasswordDirty(true);
        break;
      case "select":
        setSelectDirty(true);
        break;
    }
  };

  const inputHandler = (e: any) => {
    switch (e.target.name) {
      case "email":
        setEmailVal(e.target.value);
        const re =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (!re.test(String(e.target.value).toLowerCase()))
          setEmailError("Некорректный email");
        else setEmailError("");
        break;
      case "password":
        if (e.target.value.length < 6) {
          setPasswordError("Введите 6 и более символов");

          if (!e.target.value) {
            setPasswordError("Обязательное поле");
          }
        } else setPasswordError("");
        setPasswordVal(e.target.value);
        break;
      case "select":
        setSelectVal(e.target.value);
        if (e.target.value === '') {
          setSelectError("Обязательное поле");
        } else setSelectError('');
    }
  };

  useEffect(() => {
    if (emailError || passwordError || selectError) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [emailError, passwordError]);

  return (
    <div className="App">
      <form>
        <input
          value={emailVal}
          onBlur={blurHandler}
          onChange={inputHandler}
          style={{ display: "block" }}
          type="email"
          name="email"
          placeholder="Enter email..."
          autoComplete="off"
        />
        {emailDirty && emailError && (
          <p style={{ color: "red" }}>{emailError}</p>
        )}
        <input
          value={passwordVal}
          onBlur={blurHandler}
          onChange={inputHandler}
          style={{ display: "block" }}
          type="password"
          name="password"
          placeholder="Enter password..."
          autoComplete="off"
        />
        {passwordDirty && passwordError && (
          <p style={{ color: "red" }}>{passwordError}</p>
        )}
        <select
          onBlur={blurHandler}
          style={{ display: "block" }}
          name="select"
          onChange={inputHandler}
          value={selectVal}
        >
          <option value=""></option>
          <option value="1">Value 1</option>
          <option value="2">Value 2</option>
          <option value="3">Value 3</option>
        </select>
        {selectDirty && selectError && (
          <p style={{ color: "red" }}>{selectError}</p>
        )}
        <button disabled={!isValid} type="submit">
          Registration
        </button>
      </form>
    </div>
  );
}

export default App;
