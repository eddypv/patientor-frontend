import React from "react";
import { DiagnosisListProps, Entry, EntryListProps} from '../types';
import { Container, Header, Icon, List, Segment} from 'semantic-ui-react';
import { useStateValue } from "../state";
import {HealthCheckEntry, OccupationalHealthCareEntry, HospitalEntry} from '../types';
import {assertNever} from '../utils';
interface HealCheckProps{
    entry:HealthCheckEntry
}
interface OccupationHealthCareProps{
    entry:OccupationalHealthCareEntry
}
interface HospitalProps{
    entry:HospitalEntry
}
const DiagnosisList = ({diagnoses}: DiagnosisListProps) =>{
    const [{diagnoses:diagnosesState}, ] = useStateValue();
    const getDiagnoseName =(code:string):string | undefined =>{
        const diagnoseSearch = diagnosesState.find((element)=> element.code == code);
        return diagnoseSearch?.name;
    };
    return (
        <List>
            {diagnoses?.map((diagnose) => 
                <List.Item key={diagnose} >
                    <List.Icon name="circle"/>
                    <List.Content>{diagnose} {getDiagnoseName(diagnose)} </List.Content>
                </List.Item> 
                )}
        </List>
    );
};
const HealthCheck = ({entry}:HealCheckProps) =>{
    const getColorRatings = (rating:number)=>{
        if(rating == 0)
            return "green";
        else if(rating ==1 )
            return "yellow";
        else
            return "red";
        
    };
    return (
        <Segment>
            <Container >
                <Header as="h4">{entry.date} <Icon name="user md"/></Header>
                <p>{entry.description}</p>
                <DiagnosisList  diagnoses={entry.diagnosisCodes} />
                <Icon name="heart" color={getColorRatings(entry.healthCheckRating)}/>
            </Container>
            
        </Segment>
    );
};
const OccupationHealthCare = ({entry}:OccupationHealthCareProps) =>{
    return(
        <Segment>
            <Container >
                <Header as="h4">{entry.date} <Icon name="stethoscope"/></Header>
                <p>{entry.description}</p>
                {entry.sickLeave ? <p>Sick Leave:{entry.sickLeave?.startDate} - {entry.sickLeave?.endDate}</p>: null}
                <DiagnosisList  diagnoses={entry.diagnosisCodes} />
            </Container>
            
        </Segment>
    ) ;
};
const Hospital = ({entry}:HospitalProps) =>{
    return(
        <Segment>
            <Container >
                <Header as="h4">{entry.date} <Icon name="hospital"/></Header>
                <p>{entry.description}</p>
                <DiagnosisList  diagnoses={entry.diagnosisCodes} />
            </Container>
            
        </Segment>
    ) ;
};
const EntryList= ({entries}:EntryListProps) =>{
    const selectTypeEntry = (entry:Entry) =>{
        switch(entry.type){
            case "HealthCheck":
                return <HealthCheck key={entry.id} entry={entry} />;
            case "OccupationalHealthcare":
                return <OccupationHealthCare key={entry.id} entry={entry} />;
            case "Hospital":
                return <Hospital key={entry.id} entry={entry}/>;
            default:
                return assertNever(entry);
        }
    };
    return(
        <Container>
            <h3>Entries</h3>
            {entries?.map((entry) => selectTypeEntry(entry)) }            
        </Container>
    );
};
export default EntryList;