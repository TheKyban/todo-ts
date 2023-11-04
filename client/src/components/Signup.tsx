import React from 'react'

const Signup = () => {
  return (
    <div className="login">
        <h3>Signup</h3>
        <form>

            <input type="text" placeholder="Enter Name" />
            <input type="email" placeholder="Enter Email" />
            <input type="password" placeholder="Enter Password" />
            <button>Submit</button>
        </form>
    </div>
);
}

export default Signup