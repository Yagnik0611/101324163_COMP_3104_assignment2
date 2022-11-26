
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthFail from "./AuthFail";

   

    // const LoadDetail = (id) => {
    //     const navigate = useNavigate();
    //     navigate("/employee/detail/" + id);
    // }
    // const LoadEdit = (id) => {
    //     const navigate = useNavigate();
    //     navigate("/employee/edit/" + id);
    // }
  const url1 =   `/employee/details/`
  const url2 =   `/employee/edit/`
const  ViewEmp=()=> {
    const [empdata, empdatachange] = useState(null);
    const [Authorization, setAuth] = useState(null);
    useEffect(() => {
        fetch('http://localhost:3001/api/emp/employees', {
            method: 'GET',
             headers:{
            
                "Authorization":localStorage.getItem("token")
             },
           mode:"cors"
          }).then((res) => {
           if (res.status == 403){
            setAuth(false);
           }
           else setAuth(true);
            return res.json();
        }).then((resp) => {
           console.log(resp)
            empdatachange(resp);
        }).catch((err) => {
            console.log(err);
            
        })
    }, [])
      

     const  deleteEMp =(id)=> {
        console.log(id)
       
        if (window.confirm('Do you want to remove?')) {
            fetch("http://localhost:3001/api/emp/employees?eid=" + id, {
                method: "DELETE",
                mode:"cors"
            }).then((response) => {
                if (response.ok){
                    let json =  response.json();
                    window.location.reload();
                console.info(json);
                this.setState({ "project": json});
              } else {
                console.error("Problem: " + response.status.valueOf.toString.apply);
              }
              
          
            }).catch((err) => {
                alert('Removed successfully.')
            })
        }
    }


        
    
    return (
        
        <>{
    
       
         }
          {Authorization ===false ? (
            <AuthFail/>
       
      ) : <div>
      <h1  style ={{background:"#282c34"}}className='text-center   text-white'> EMPLOYEE LIST</h1>
  
  <div className="container">
      <div className="card">
          
          <div className="card-body">
              <div>
                  <a  href="/employee/create"className="btn btn-success">Add new (+)</a>
              </div>
          
            
              <table className="table  table-bordered">
                  <thead className="bg-dark text-white">
                      <tr>
                          <td>ID</td>
                          <td>first_name</td>
                          <td>last_name</td>
                          <td>email</td>
                          <td>gender</td>
                          <td>Action</td>
                      </tr>
                  </thead>
                  <tbody>
                  {empdata &&
                          empdata.map(item => (
                              <tr key={item._id}>
                              <td>1</td>
                          <td>{item.first_name}</td>
                          <td>{item.last_name}</td>
                          <td>{item.email}</td>
                          <td>{item.gender}</td>
                          <td> <div className="d-flex justify-content-around">
                                      <a href={url2+item._id} className="btn btn-success">Edit</a>
                                      <a onClick={(e) => deleteEMp(item._id)} className="btn btn-danger">Remove</a>
                                      <a  href={url1+item._id} className="btn btn-primary">Details</a>
                                      </div>
                          </td>    

                                 
                      </tr>
                          ))
                      }

                  </tbody>

              </table>
          </div>
      </div>
  </div> </div>}
    </> 
   
                
       
        
        
         
    
    );
}
export default ViewEmp;