import React, { useState } from "react";
import './Appointment.css';

const Appointment = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [nic, setNic] = useState("");
    const [gender, setGender] = useState("");
    const [appointmentDate, setAppointmentDate] = useState("");
    const [department, setDepartment] = useState("");
    const [doctor, setDoctor] = useState("");
    const [address, setAddress] = useState("");
    

    const departmentsArray = [
        "pediatrics",
        "Orthopedics",
        "Cardiology",
        "Neurology",
        "Oncology",
        "Radiology",
        "Physical Therapy",
        "Dermatology",
        "ENT",
    ];

    const clearForm = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
        setNic("");
        setGender("");
        setAppointmentDate("");
        setDepartment("");
        setDoctor("");
        setAddress("");
    }
    return (
        <>
            <div className="container form-component appointment-form" style={{ marginLeft: "25vw", marginTop: "10vh", marginBottom: "10vh" }}>
                <h2>Appointment</h2>
                <div>
                    <input
                        style={{ padding: "10px" }}
                        type="text"
                        placeholder="FirstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                    <input
                        style={{ padding: "10px", margin: "5px" }}
                        type="text"
                        placeholder="LastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        style={{ padding: "10px" }}
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        style={{ padding: "10px", margin: "5px" }}
                        type="tel"
                        placeholder="Mobile Number"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <input
                    style={{ padding: "20px", margin: "5px" }}
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <div>
                    <input
                        style={{ padding: "10px", margin: "5px" }}
                        type="number"
                        placeholder="NIC"
                        value={nic}
                        onChange={(e) => setNic(e.target.value)}
                    />
                </div>
                <div>
                    <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ padding: "10px", margin: "5px" }}>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                    <input
                        style={{ padding: "10px", margin: "5px" }}
                        type="date"
                        placeholder="Appointment Date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                </div>
                <div>
                    <select
                        style={{ padding: "10px", margin: "5px" }}
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                    >
                        <option value="">Select Department</option>
                        {departmentsArray.map(dept => {
                           return  <option key={dept} value={dept}>{dept}</option>
})}
                    </select>
                    <select
                        style={{ padding: "10px", margin: "5px" }}
                        value={doctor}
                        onChange={(e) => setDoctor(e.target.value)}
                    >
                        <option value="">Select Doctor</option>
                        <option value="kiran">Dr Kiran</option>
                        <option value="Lakshmi">Dr Lakshmi</option>
                    </select>
                </div>
                <button style={{ padding: "10px", margin: "5px" }} onClick={clearForm}>Get Appointment</button>
            </div>
        </>
    );
}

export default Appointment;
