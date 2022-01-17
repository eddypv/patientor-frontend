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
export enum EntryTypes{
  HealthCheck ="HealthCheck",
  Hospital= "Hospital",
  OccupationalHealthcare= "OccupationalHealthcare"
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
export interface HealthCheckEntry extends BaseEntry{
  type:EntryTypes.HealthCheck,
  healthCheckRating :HealthCheckRating
}
export interface HospitalEntry extends BaseEntry{
  type:EntryTypes.Hospital,
  discharge: Discharge
}
export interface OccupationalHealthCareEntry extends BaseEntry{
  type:EntryTypes.OccupationalHealthcare,
  sickLeave?:SickLeave,
  employerName:string
}
export type Entry = HealthCheckEntry | HospitalEntry | OccupationalHealthCareEntry;
export type NewEntry = Omit<HealthCheckEntry, "id"> | Omit<HospitalEntry, "id"> | Omit<OccupationalHealthCareEntry, "id">;
export type NewHealthCheckEntry = Omit<HealthCheckEntry, "id">;
export type NewHospital = Omit<HospitalEntry, "id">;
export type NewOccupationalHealthCare = Omit<OccupationalHealthCareEntry, "id">;

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries:Entry[]
}

export enum HealthCheckRating{
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
