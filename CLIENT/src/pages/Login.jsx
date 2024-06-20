import { useState } from "react";

export default function Login() {



    const [username , setUsername] = useState('')
    const [password , setPassword] = useState('')


    const loginHandler = (e)=>{
e.preventDefault()
        // console.log(username,'user')
        localStorage.username = username
    }





  return (
    <>
      <h1>Login</h1>
      <form onSubmit={loginHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="text"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
          />
          <label className="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
