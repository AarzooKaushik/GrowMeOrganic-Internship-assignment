import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './style.css'

const Login= () => {
  const navigate = useNavigate();
 
const [enteredUserName, setEnteredUserName] = useState<string>(""); 
  const [userNameIsValid, setUserNameIsValid] = useState<boolean>(true);
  const [enteredEmail, setEnteredEmail] = useState<string>(""); 
  const [emailIsValid, setEmailIsValid] = useState<boolean>(true);
  const [numberIsValid, setNumberIsValid] = useState<boolean>(true); 
  const [enteredNumber, setEnteredNumber] = useState<string>(""); 


  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (userDetails) { 
      navigate("/homepage");
    }
  }, [navigate]);


  const userNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserNameIsValid(true);
    setEnteredUserName(event.target.value);
  };
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailIsValid(true);
    setEnteredEmail(event.target.value);
  };
  const numberChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNumberIsValid(true);
    setEnteredNumber(event.target.value);
  };

  const loginHandler = async () => {
   
    const userDetail = {
      username: enteredUserName,
      email:enteredEmail,
      number: enteredNumber,
    };
    localStorage.setItem(
      "userDetails",
      JSON.stringify({ ...userDetail })
    );
    navigate("/homepage");

    }
  
  const formSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (enteredUserName.trim() === "") {
      setUserNameIsValid(false);
    }
    if (enteredNumber.trim() === "") {
      setNumberIsValid(false);
    }
    if (enteredEmail.trim() === "") {
      setEmailIsValid(false);
    }

    if (enteredUserName.trim() === "" || enteredNumber.trim() === "" ||enteredEmail.trim() === ""){
      navigate('/')
      return
    };
   
    loginHandler();
  };

 

  return (
    <>
    <div className='loginPage'>
      <h1>Login Form</h1>
      <form onSubmit={formSubmitHandler} className='form'>
        <input
          type="text"
          placeholder="Enter Username"
          onChange={userNameChangeHandler}
        />
         <p className="errorText">{!userNameIsValid && 
         ' Please enter a valid Username .'
        }</p>
        <input
          type="number"
          placeholder="Enter Number"
          onChange={numberChangeHandler}
        />
    
         <p className="errorText">{!numberIsValid && 
         ' Please enter a valid Number .'
        }</p>
          <input
          type="email"
          placeholder="Enter Email"
          onChange={emailChangeHandler}
        />
       
         <p className="errorText">{!emailIsValid && 
         ' Please enter a valid email.'
        }</p>
          <button>Login</button>
          
      
      </form>
      </div>
    </>
  );
};

export default Login;