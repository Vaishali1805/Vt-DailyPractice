import React from 'react'

const otp = () => {
    console.log("here");
    const handleSubmit = ()  => {
        console.log("am in handleSubmit");
        // const {value: otp} = e.target;
        // console.log("value: ",otp);
    }
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="d-flex flex-column gap-4">
        <input
          type="number"
          placeholder="Enter OTP here"
        //   onChange={}
        //   value={}
          className="form-control"
        />
        <button className="btn btn-secondary" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}

export default otp