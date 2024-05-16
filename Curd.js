import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; 

function MobileDetails() {
  const navigate=useNavigate()
  const [mobiles, setMobiles] = useState([]);
  const [newMobile, setNewMobile] = useState({
    id: '',
    name: '',
    color: '',
    memory: '',
    battery: '',
    gender: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editMobileId, setEditMobileId] = useState(null);

  useEffect(() => {
    const storedMobiles = JSON.parse(localStorage.getItem('mobiles')) || [];
    setMobiles(storedMobiles);
  }, []);

  useEffect(() => {
    localStorage.setItem('mobiles', JSON.stringify(mobiles));
  }, [mobiles]);

  const addMobile = (e) => {
    e.preventDefault();
    if (newMobile.name && newMobile.color && newMobile.memory && newMobile.battery && newMobile.gender) {
      if (isEditing) {
        
        const updatedMobiles = mobiles.map((mobile) =>
          mobile.id === editMobileId ? { ...newMobile, id: editMobileId } : mobile
        );
        setMobiles(updatedMobiles);
        setIsEditing(false);
        setEditMobileId(null);
      } else {
  
        setMobiles([...mobiles, { ...newMobile, id: Date.now() }]);
      }

  
      setNewMobile({
        id: '',
        name: '',
        color: '',
        memory: '',
        battery: '',
        gender:  '',
      });
    }
  };

  const editMobile = (mobileToEdit) => {
    setNewMobile(mobileToEdit);
    setIsEditing(true);
    setEditMobileId(mobileToEdit.id);
  };

  const deleteMobile = (mobileId) => {
    const updatedMobiles = mobiles.filter((mobile) => mobile.id !== mobileId);
    setMobiles(updatedMobiles);
  };
  const handleLogout = () =>{
  navigate('/')
  }

  return (
    <div className="container mt-5 bg-light">
      <h4 className="text-center text-black-50 fw-bold">Employee List</h4>
      <form onSubmit={addMobile} className="mobile-details-form">
        <div className="form-group mb-3 fw-bold">
        <label>Name : </label>
          <input
            type="text"
            className=" form-control m-2"
            placeholder="Name"
            value={newMobile.name}
            onChange={(e) => setNewMobile({ ...newMobile, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3 fw-bold">
        <label>Email : </label>
          <input
            type="email"
            className=" form-control m-2"
            placeholder="Email"
            value={newMobile.color}
            onChange={(e) => setNewMobile({ ...newMobile, color: e.target.value })}
            required
          />
        </div>
        <div className="form-group mb-3 fw-bold">
        <label> Mobile No : </label>
          <input
            type="phoneno"
            className= " form-control m-2"
            placeholder="Phone no"
            value={newMobile.memory}
            onChange={(e) => setNewMobile({ ...newMobile, memory: e.target.value })}
            required
          />
        </div>
        <div className="form-group fw-bold">
          <label>Designation : </label>
          <input
            type="text"
            className=" form-control m-2 "
            placeholder=""
            value={newMobile.battery}
            onChange={(e) => setNewMobile({ ...newMobile, battery: e.target.value })}
            required
          />
        </div>
        <div className=" fw-bold">
          <label>  Gender :
            <br/>
          <label><input type='radio' name="favourite_food" value={newMobile.gender}
            onChange={(e) => setNewMobile({ ...newMobile, gender: e.target.value })}>
              </input>Male</label>
          <label><input type='radio' name="favourite_food" value={newMobile.gender}
            onChange={(e) => setNewMobile({ ...newMobile, gender: e.target.value })}>
              </input>Female</label>
         </label>
        </div>
        <div className="form-group fw-bold">
          <label>Course : </label>
          <input
            type="text"
            className=" form-control m-2 "
            placeholder=""
            value={newMobile.battery}
            onChange={(e) => setNewMobile({ ...newMobile, battery: e.target.value })}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          {isEditing ? 'Update Employee' : 'Add Employee '}
        </button>
       
      </form>
      <table className="table mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {mobiles.map((mobile) => (
            <tr key={mobile.id}>
              <td>{mobile.name}</td>
              <td>{mobile.color}</td>
              <td>{mobile.memory}</td>
              <td>{mobile.battery}</td>
              <td>{mobile.gender}</td>
              <td>
                <button onClick={() => editMobile(mobile)} className="btn btn-success btn-sm mx-2">Edit</button>
                <button onClick={() => deleteMobile(mobile.id)} className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type='btn' className='btn btn-light m-1'
      onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default MobileDetails;


