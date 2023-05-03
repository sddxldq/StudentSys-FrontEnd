import React, {useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container, Paper } from '@mui/material';
import Button from '@mui/material/Button';


export default function BasicTextFields() {
    const paparStyle = {padding:'50px 20px', width:600, margin:'20px auto'}
    const[name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [students, setStudents] = useState([])
    // console.log("student")
    const handleSubmit=(e)=>{
        e.preventDefault()
        const student = {name, address}
        console.log(student)
        fetch("http://localhost:8080/student/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(student)
        }).then(()=>{
            console.log("New student added")
        })
        refresh()
        
    }

    const handleDelete=(e,id)=>{
        e.preventDefault()
        fetch("http://localhost:8080/student/"+id,{
            method:"DELETE",
        }).then(()=>{
            console.log("student removed")
        })
        refresh()
        
    }
    const refresh=()=>{
        setTimeout(function(){
            fetch("http://localhost:8080/student/getAll")
        .then((res)=>res.json()
        ).then(
            (result)=>{
                setStudents(result.data);
            }
        )
        }, 1000);
    }
    useEffect(() => {
        refresh()
    }, [])
    

  return (
    <Container>
        <Paper elevation={6} style={paparStyle}>
        <h1 style={{color:"blue"}}>Add Student</h1>
        <Box
        component="form"
        sx={{
            '& > :not(style)': { m: 1 },
        }}
        noValidate
        autoComplete="off"
        >
        <TextField id="outlined-basic" label="Student Name" variant="outlined" fullWidth
        value={name}
        onChange={(e)=>setName(e.target.value)}/>
        <TextField id="outlined-basic" label="Student Address" variant="outlined" fullWidth
        value={address}
        onChange={(e)=>setAddress(e.target.value)}/>
        <Button variant="contained" onClick={handleSubmit}>Submit</Button>
        </Box>
        </Paper>

        <h1>Students</h1>
        <Paper elevation={3} style={paparStyle}>
            {students.map((student)=>(
                <Paper elevation={6} style={{margin:"10px",padding:"15px",textAlign:"left"}}  key={student.id}>
                    <div>
                        <p>Id:{student.id}</p>
                        <p>Name:{student.name}</p>
                        <p>Address:{student.address}</p>
                    </div>
                    <Button variant="contained" onClick={(e)=>handleDelete(e,student.id)}>Remove</Button>
                </Paper>
            ))}
        </Paper>
    </Container>
  );
}
