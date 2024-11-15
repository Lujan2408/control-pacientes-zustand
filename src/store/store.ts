/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { create } from "zustand";
import { DraftPatient, Patient } from "../types";
import {v4 as uuidv4} from 'uuid'

//Creamos el type de los pacientes
type PatientStore = {
  patients: Patient[];
  addPatient: (data: DraftPatient) => void; // Toma data, que son los datos extraídos por el usuario del formulario
  deletePatient: (id : Patient['id']) => void 
}

const createPatient = (patient : DraftPatient) : Patient => {
  return {...patient, id: uuidv4()}
}

// Creación del store con "create"
export const usePatientStore = create<PatientStore>((set) => ({
  patients: [], // State
  addPatient: (data) => {
    // Función para pasarle el paciente
    const newPatient = createPatient(data);
    set((state) => ({
      patients: [...state.patients, newPatient],
    }));
  },
  deletePatient: (id) => {
    set((state) => ({
      patients: state.patients.filter( patient => patient.id !== id)
    }))
  }
}));