import React from "react";
import NavbarFoodbank from "./NavbarFoodbank";
import "./FoodBankDashboard.css";

function FoodBankDashboard(){
    return(
        <>
        <NavbarFoodbank/>
        <div className="d-flex justify-content-center align-items-center page_styling">
        <table className="table_styling">
            <thead className="fs-4">
                <tr>
                    <th className="p-2">Order no.</th>
                    <th className="p-2">Name</th>
                    <th className="p-2">Plates</th>
                    <th className="p-2">Pickup-Complete</th>
                </tr>
            </thead>
            <tbody className="fs-6 mt-3 fst-italic">
                <tr>
                <td className="fw-bold">#101</td>
                <td>Ajeet Kumar</td>
                <td>2</td>
                <td><input type="checkbox"/></td>
                </tr>

                <tr>
                <td className="fw-bold">#102</td>
                <td>Rajat Sharma</td>
                <td>1</td>
                <td><input type="checkbox"/></td>
                </tr>

                <tr>
                <td className="fw-bold">#103</td>
                <td>Ravi Sen</td>
                <td>1</td>
                <td><input type="checkbox"/></td>
                </tr>

                <tr>
                <td className="fw-bold">#104</td>
                <td>Vikram S</td>
                <td>2</td>
                <td><input type="checkbox"/></td>
                </tr>

                <tr>
                <td className="fw-bold">#105</td>
                <td>Shantilal</td>
                <td>3</td>
                <td><input type="checkbox"/></td>
                </tr>

                <tr>
                <td className="fw-bold">#106</td>
                <td>Rohini K</td>
                <td>2</td>
                <td><input type="checkbox"/></td>
                </tr>

                <tr>
                <td className="fw-bold">#107</td>
                <td>Ramgopal V</td>
                <td>2</td>
                <td><input type="checkbox"/></td>
                </tr>

                <tr>
                <td className="fw-bold">#108</td>
                <td>Sushma R</td>
                <td>1</td>
                <td><input type="checkbox"/></td>
                </tr>
            </tbody>
        </table>
        </div>
        </>
    )
}

export default FoodBankDashboard;