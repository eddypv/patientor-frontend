export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}
export interface Diagnose{
  code:string,
  name:string,
  latin?:string
}
interface BaseEntry{
  id:string,
  description:string,
  date:string,
  specialist:string,
  diagnosisCodes?:Array<Diagnose['code']>
}
interface Discharge{
  date:string,
  criteria:string
}
interface SickLeave{
  startDate:string,
  endDate:string,
}
interface HealthCheckEntry extends BaseEntry{
  type:"HealthCheck",
  healthCheckRating :HealthCheckRating
}
interface HospitalEntry extends BaseEntry{
  type:"Hospital",
  discharge: Discharge
}
interface OccupationalHealthCareEntry extends BaseEntry{
  type:"OccupationalHealthcare",
  sickLeave?:SickLeave,
  employerName:string
}
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries:Entry[]
}

enum HealthCheckRating{
  "Healthy"=0,
  "LowRisk"=1,
  "HighRisk"=2,
  "CriticalRisk"=3
}

export interface EntryListProps {
  entries:Entry[] | undefined
}
export interface DiagnosisListProps{
  diagnoses: Diagnose["code"][] | undefined
}
