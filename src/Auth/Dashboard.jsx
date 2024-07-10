import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../Common/Layout';

const Dashboard = () => {

    const name = localStorage.getItem("name");
    const userid = localStorage.getItem("user_id")
    const mobile = localStorage.getItem("mobile")
    const password = localStorage.getItem("password")
    const email = localStorage.getItem("email")
    const type = localStorage.getItem("type")

    return (
        <>
            <Layout>

                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="card text-center">
                        <div className="card-header">
                            <h1 style={{ fontSize: '50px' }}>Dashboard</h1>
                        </div>
                        <div className="card-body">
                            {/* <img src={dashboarddata?.image} alt="" /> */}
                            <h5 className="card-title"><b>Name : </b>{name}</h5>
                            <h5 className="card-title"><b>User ID : </b>{userid}</h5>
                            <h5 className="card-title"><b>Email : </b>{email}</h5>
                            <h5 className="card-title"><b>Password : </b>{password}</h5>
                            <h5 className="card-title"><b>Mobile : </b>{mobile}</h5>
                            <h5 className="card-title"><b>Role : </b>{type}</h5>
                            <Link to="/" className="btn btn-success">Back to Home</Link>
                        </div>
                    </div>
                </div>



            </Layout>
        </>
    )
}

export default Dashboard