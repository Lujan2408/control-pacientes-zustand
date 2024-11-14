/* eslint-disable @typescript-eslint/consistent-type-definitions */
export type Patient = {
  id: string 
  name: string 
  caretaker: string 
  email: string
  date: Date
  symptoms: string 
}

// Este es el type del paciente que aún no tiene el id
export type DraftPatient = Omit<Patient, 'id'>