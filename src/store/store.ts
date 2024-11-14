/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { create } from "zustand";
import { DraftPatient, Patient } from "../types";

//Creamos el type de los pacientes
type PatientStore = {
  patients: Patient[]
  addPatient: (data: DraftPatient) => void // Toma data, que son los datos extraídos por el usuario del formulario 
}

// Creación del store con "create"
export const usePatientStore = create<PatientStore>(() => ({
  patients: [], // State
  addPatient: (data) => { // Función para pasarle el paciente 
    console.log(data)
  } 
}))