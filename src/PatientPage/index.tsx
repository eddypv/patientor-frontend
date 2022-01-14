import React  from "react";
import { Container } from "semantic-ui-react";
import { useParams } from "react-router-dom";
const PatientPage = () =>{
    
    const {patientId} = useParams<{patientId:string}>();
    console.log("entro"); 
    return(
        <Container>
            <h2>Patient {patientId}</h2>
            <p>ssn:</p>
            <p>occupation:</p>
        </Container>
    ) ;
};

export default PatientPage;