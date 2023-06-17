import React, {useState} from "react";
import {Formik, Form, Field}  from 'formik';
import { useForm } from "react-hook-form";

function App () {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');

  const [isNameValid, setIsNameValid] = useState(false);
  const [isLoginlValid, setIsLoginlValid] = useState(false);
  const [isAgeValid, setIsAgeValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  const [wasNameTouched, setWasNameTouched] = useState(false);
  const [wasLoginTouched, setWasLoginTouched] = useState(false);
  const [wasAgeTouched, setWasAgeTouched] = useState(false);
  const [wasEmailTouched, setWasEmailTouched] = useState(false);

  const nameLostFocus = () => {
    setWasNameTouched(true); 
    if(name.trim().length < 2 || /[0-9]/.test(name)){
      setIsNameValid(false);
      return
    }
    setIsNameValid(true);
  }

  const loginLostFocus = () => { 
    setWasLoginTouched(true);
    if (login.trim().length < 5){
      setIsLoginlValid(false);
      return
    }
    setIsLoginlValid(true);
  }

  const ageLostFocus = () => { 
    setWasAgeTouched(true);
    if (age.trim() < 18){
      setIsAgeValid(false);
      return
    }
    setIsAgeValid(true);
  }

  const emailLostFocus = () => { 
    setWasEmailTouched(true);
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
    setIsEmailValid(false);
    return
    }
    setIsEmailValid(true);
  }


  const submit = (e) => {
    e.preventDefault();

    
    if(name.trim().length < 2 || /[0-9]/.test(name)){
      setIsNameValid(false);
      return
    }
    
    
    setIsNameValid(true);

    if (login.trim().length < 5){
      setIsLoginlValid(false);
      return
    }
    
    setIsLoginlValid(true);

    if (age.trim() < 18){
      setIsAgeValid(false);
      return
    }
    
    setIsAgeValid(true);

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)){
    setIsEmailValid(false);
    return
    }
    
    setIsEmailValid(true);


    console.log({name, login, age, email});
  }

  const nameChange = e => {
    setName(e.target.value);
    if (wasNameTouched){
      e.target.value.trim().length < 2 || /[0-9]/.test(e.target.value) ? setIsNameValid(false) : setIsNameValid(true)
    }
  }
  const loginChange = e => {
    setLogin(e.target.value);
    if (wasLoginTouched){
      e.target.value.trim().length < 5 ? setIsLoginlValid(false) : setIsLoginlValid(true)
    }
  }
  const ageChange = e => {
    setAge(e.target.value);
    if (wasAgeTouched){
      e.target.value.trim() < 18 ? setIsAgeValid(false) : setIsAgeValid(true)
    }
  }
  const emailChange = e => {
    setEmail(e.target.value);
    if (wasEmailTouched){
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(e.target.value) ? setIsEmailValid(false) : setIsEmailValid(true)
    }
  }

  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> FORMIK
  
  const validateName = (value) =>{
    if(!value){
      return 'Required'
    } else if (value.trim().length < 2 || /[0-9]/.test(value)){
      return 'Enter correct login'
    }
  }
  
  const validateLogin = (value) =>{
    if(!value){
      return 'Required'
    } else if (value.trim().length < 5){
      return 'Enter correct login'
    }
  }

  const validateAge = (value) =>{
    if(!value){
      return 'Required'
    } else if (value < 18){
      return 'Enter correct age'
    }
  }
  
  const validateEmail = (value) =>{
    if(!value){
      return 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)){
      return 'Enter correct email'
    }
  }
  
  // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>> REACT HOOK

  const {
    register, 
    formState: {errors},
    handleSubmit,
    reset
  } = useForm({mode: "onTouched"})

  const submitReactForm = (value) => {
    console.log(value)
    reset();
  }

  return (
    <div className="wrapper">
    <h1 style={{textAlign: "center", backgroundColor: "white", fontSize: 32}}>REGULAR FORM</h1>
      <form onSubmit={submit}>
        <label>Name</label>
        <input onInput={nameChange} className={!isNameValid && wasNameTouched ? "invalid" : ""} onBlur={nameLostFocus}/>
        {!isNameValid && wasNameTouched && <p>Enter correct name</p>}
        <label>Login</label>
        <input onInput={loginChange} className={!isLoginlValid && wasLoginTouched ? "invalid" : ""} onBlur={loginLostFocus}/>
        {!isLoginlValid && wasLoginTouched && <p>Enter correct login</p>}
        <label>Age</label>
        <input type="number" onInput={ageChange} className={!isAgeValid && wasAgeTouched ? "invalid" : ""} onBlur={ageLostFocus}/>
        {!isAgeValid && wasAgeTouched && <p>Enter correct age</p>}
        <label>Email</label>
        <input onInput={emailChange} className={!isEmailValid && wasEmailTouched ? "invalid" : ""} onBlur={emailLostFocus}/>
        {!isEmailValid && wasEmailTouched && <p>Enter correct email</p>}
        <button type="submit">Sign in</button>
      </form>


      <h1 style={{textAlign: "center", backgroundColor: "white", fontSize: 32}}>FORMIK</h1>
      <Formik
      initialValues={{
        name: '', 
        login: '', 
        age: '', 
        email: ''
      }}
      onSubmit={(values, {resetForm}) => {console.log(values), resetForm()}}>
        {({errors, touched}) => (
          <Form>
            <label>Name</label>
            <Field name="name" validate={validateName} className={errors.name && touched.name ? "invalid" : ""}/>
            {errors.name && touched.name && <p>{errors.name}</p>}
            
            <label>Login</label>
            <Field name="login" validate={validateLogin} className={errors.login && touched.login ? "invalid" : ""}/>
            {errors.login && touched.login && <p>{errors.login}</p>}
            
            <label>Age</label>
            <Field type="number" name="age" validate={validateAge} className={errors.age && touched.age ? "invalid" : ""}/>
            {errors.age && touched.age && <p>{errors.age}</p>}

            <label>Email</label>
            <Field name="email" validate={validateEmail} className={errors.email && touched.email ? "invalid" : ""}/>
            {errors.email && touched.email && <p>{errors.email}</p>}

            <button type="submit">Sign in</button>
          </Form>
        )}
      </Formik>


      <h1 style={{textAlign: "center", backgroundColor: "white", fontSize: 32}}>REACT HOOK</h1>
      <form onSubmit={handleSubmit(submitReactForm)}>

        <label>Name</label>
        <input {...register('name',{
          required: "Required",
          minLength: {
          value: 2,
          message: "Enter correct name (length should be more than one character)"
          },
          pattern: {
          value: /^[^0-9]+$/,
          message: "Enter correct name (must not contain figures)"
          },
        })} 
        className={errors.name ? "invalid" : ""}/>
        {errors.name && <p>{errors.name.message}</p>}

        <label>Login</label>
        <input {...register('login',{
          required: "Required",
          minLength: {
          value: 5,
          message: "Enter correct login (length should be at least five characters)"}
        })}
        className={errors.login ? "invalid" : ""}/>
        {errors.login && <p>{errors.login.message}</p>}

        <label>Age</label>
        <input type="number" {...register('age',{
          required: "Required",
          validate: {
            noLessThan18: (value) => {
              const parsedValue = parseInt(value, 10);
              return parsedValue >= 18 || "Enter correct age (greater or equal to 18)";
            },
          },
        })}
        className={errors.age ? "invalid" : ""}/>
        {errors.age && <p>{errors.age.message}</p>}

        <label>Email</label>
        <input {...register('email',{
          required: "Required",
          pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
          message: "Enter correct email"
          }
        })}
        className={errors.email ? "invalid" : ""}/>
        {errors.email && <p>{errors.email.message}</p>}
        <button type="submitReactForm">Sign in</button>
      </form>

    </div>
  );
} 

export default App;