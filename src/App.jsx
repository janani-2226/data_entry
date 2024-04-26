import axios, { Axios } from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Formik, useFormik } from 'formik';
import { useEffect, useState } from 'react';


function App() {
  const [userData, setUserData] = useState([])
  async function getData() {
    try {
      const store = await axios.get("http://localhost:3003/data");
      console.log(store.data);
      setUserData([...store.data])

    } catch (error) {
      console.log(error)
      alert("Something went Wrong")
    }
  }
  let formik = useFormik({
    initialValues: {
      date : "",
      employeeId: "",
      employeeName: "",
      loginTime: "",
    },
    validate: (values) => {
      let errors = {}
      if (values.employeeId === "") {
        errors.employeeId = "required"
      }
      return errors;

    },

    onSubmit: async (values) => {
      try {
        await axios.post("http://localhost:3003/data", values);
        alert("Data Entered")
        getData()
      } catch (error) {
        console.log(error);
        alert("Data not Entered")
      }


    }
  })


  return (
    <>
      <div className='container '>
        <div className='row mt-5 '>
          <div className='col-lg-6 mt-2'>
            <div className='row  '>
              <div className='col-lg-12 bg mt-4 '>
                <h3 className='head'>Attendance Entry</h3>
              </div>
            </div>
            <div className='row bg ml-5'>
              <form onSubmit={formik.handleSubmit}>
              <div class="mb-3">
                  <label class="form-label">Date</label>
                  <input type="date" class="form-control" name="date" onChange={formik.handleChange} value={formik.values.date} />
                </div>
                <div class="mb-3">
                  <label class="form-label">Employee Id</label>
                  <input type="number" class="form-control" name="employeeId" onChange={formik.handleChange} value={formik.values.employeeId} />
                  <span className="er">{formik.errors.employeeId}</span>
                </div>
                <div class="mb-3">
                  <label class="form-label">Employee Name</label>
                  <input type="name" class="form-control" name="employeeName" onChange={formik.handleChange} value={formik.values.employeeName} />
                </div>
                <div class="mb-3">
                  <label class="form-label">Login time</label>
                  <input type="time" class="form-control" name="loginTime" onChange={formik.handleChange} value={formik.values.loginTime} />
                </div>
                <button type="submit" class="btn btn-primary mb-4">Submit</button>
              </form>
            </div>
          </div>
          <div className='col-lg-6 mt-5'>
            <table className="table">
              <thead>
                <tr className='ritab'>
                  <th className="col">Date</th>
                  <th className="col">Employee Id</th>
                  <th className="col">Employee Name</th>
                  <th className="col">Login time</th>
                </tr>
              </thead>
              {
                userData.map((ele) => {
                  return <tbody>
                    <tr>
                      <td>{ ele.date}</td>
                      <td>{ ele.employeeId}</td>
                      <td>{ele.employeeName}</td>
                      <td>{ele.loginTime}</td>
                    </tr>
                    </tbody>
                })
              }
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
