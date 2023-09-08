import React,{useEffect,useState} from "react";
import { Link } from "react-router-dom"
import axios from 'axios'
import Loading from "../components/Loading";

function Student(){

    
    const [loading, setLoading] = useState(true);
    const [inputErrorList, setInputErrorList] = useState({})
    const [students, setStudents] = useState([]);
    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/students`).then(res=>{
            console.log( res)
            setStudents(res.data.students);
            setLoading(false);
        });
    }, [])

    const deleteStudent = (e,id) => {
        e.preventDefault();
        const thisClicked = e.currentTarget;
        thisClicked.innerText = "Deleting...";

        axios.delete(`http://127.0.0.1:8000/api/students/${id}/delete`)
        .then(res=>{
            alert(res.data.message);
            thisClicked.closest("tr").remove();
        })
        .catch(function (error){
            if(error.response){
                if(error.response.status === 404){
                    alert(error.response.message)
                    setLoading(false);
                    thisClicked.innerText = "Delete";

                }
                if(error.response.status === 500){
                    alert(error.response.data)
                }
            }
        });

    }

    if(loading){
        return(
            <div className="center">
                <Loading/>
            </div>
        )
    }
    var studentDetails = "";
    studentDetails = students.map((item, index)=> {
        return(
            <tbody>
            <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.course_id}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                    <Link to={`/students/${item.id}/edit`} className="btn btn-success mx-2">Edit</Link>
                
                    <button type="button" onClick={(e)=> deleteStudent(e,item.id)} className="btn btn-danger">Delete</button>
                </td>
            </tr>
            </tbody>
            
        )
    })

    return (
        <div className="container mt-5">
            <div className="row"> 
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header"> 
                            <h4>Student List
                                <Link to="/students/create" className="btn btn-primary float-end">
                                    Add Student
                                </Link>
                            </h4>
                        </div>
                        <div className="card-body"> 
                            <table class="table table-hover">
                                <thead>
                                    <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Course</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Actions</th>
                                    </tr>
                                </thead>
                                {studentDetails}
                                {/* <tbody>
                                    <tr>
                                    <th scope="row">1</th>
                                    <td>Mark</td>
                                    <td>Otto</td>
                                    <td>@mdo</td>
                                    </tr>
                                </tbody> */}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Student;