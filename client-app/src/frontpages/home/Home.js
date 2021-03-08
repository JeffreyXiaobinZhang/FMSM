import React from 'react';
import ReactDOM from 'react-dom';
import './Home.css';
import 'bootstrap/dist/css/bootstrap.css';
import { FaUserTie, FaUser, FaHardHat, FaCalendarCheck, FaFileInvoiceDollar,FaRegChartBar } from "react-icons/fa";
import { Link } from 'react-router-dom';


class HomePage extends React.Component {
    render() {
        return (
        <div className="container"> 
            <img class="navbar-brand" src="/assets/brighten.jpg" width="8%" height="auto" alt="company-logo" />
            <h1 className="home">Home</h1>
            <hr></hr>
            <div className="row">
                    <div className="col-md-4 col-sm-6 cards h-100">
                        <div className="card-body">
                        <FaUser size="2em" />
                        <a className = "href" href="#">
                            <h3 classNameName="card-title">Employee Portal</h3>
                        </a>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 cards h-100">
                        <div className="card-body">
                        <FaHardHat size="2em"/>
                            <h3 className="card-title"> <Link to='/projectmanagement'>Project Management</Link> </h3>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 cards h-100">
                        <div className="card-body">
                        <FaCalendarCheck size="2em"/>
                            <h3 className="card-title"> <Link to='/dailymanagement'>Daily Management</Link> </h3>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 cards h-100">
                        <div className="card-body">
                        <FaUserTie size="2em"/>
                        <a className = "href" href="#">
                            <h3 className="card-title"> <Link to='/hrmanagement'>HR Management</Link> </h3>
                        </a>
                        </div>
                    </div>
                    <div className="col-md-4 col-sm-6 cards h-100">
                        <div className="card-body">
                        <FaFileInvoiceDollar size="2em"/>
                        <a className = "href" href="#">
                            <h3 className="card-title">Finance Management</h3>
                        </a>
                        </div>
        
                    </div>
                    <div className="col-md-4 col-sm-6 cards h-100">
                        <div className="card-body">
                        <FaRegChartBar size="2em"/>
                        <a className = "href" href="#">
                            <h3 className="card-title">Report Analysis</h3>
                        </a>
                        </div>
                    </div>
                </div>
        </div>

        
        );
       
    }
}

export default HomePage;