import React from "react";
import { DiagnosisListProps, EntryListProps} from '../types';
import { Container, List} from 'semantic-ui-react';
import { useStateValue } from "../state";
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
const EntryList= ({entries}:EntryListProps) =>{
    return(
        <Container>
            <h3>Entries</h3>
            {entries?.map((entry)=> {
                return(
                    <Container key={entry.id}>
                        <p>{entry.date} {entry.description}</p>
                        <DiagnosisList  diagnoses={entry.diagnosisCodes} />
                    </Container>
                ) ;
            })}
        </Container>
    );
};
export default EntryList;