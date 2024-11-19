/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { create } from "zustand";
import { createJSONStorage, devtools, persist} from 'zustand/middleware'
import { DraftPatient, Patient } from "../types";
import {v4 as uuidv4} from 'uuid'

//Creamos el type de los pacientes
type PatientStore = {
  patients: Patient[]; // state
  activeId: Patient['id']
  addPatient: (data: DraftPatient) => void; // Toma data, que son los datos extraídos por el usuario del formulario
  deletePatient: (id : Patient['id']) => void  
  getPatientById: (id : Patient['id']) => void
  updatePatient: (data: DraftPatient) => void 
}

const createPatient = (patient : DraftPatient) : Patient => {
  return {...patient, id: uuidv4()}
}

// Creación del store con "create"
export const usePatientStore = create<PatientStore>()(
    devtools(
    persist( (set) => ({
      patients: [], // State
      activeId: '',
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
      },
      getPatientById: (id) => {
        set(() => ({
          activeId: id
        }))
      },
      updatePatient: (data) => {
        set((state) => ({
          // Iteramos por cada paciente y actualizamos el que tenga el id igual al que le pasamos
          patients: state.patients.map( patient => patient.id === state.activeId ? {id: state.activeId, ...data} : patient), 
          activeId: '' // Limpiamos el id activo y lo seteamos a vacío
        }))
      }
    }), {
      name: 'patient-store', // Nombre del storage
      storage: createJSONStorage(() => localStorage)
    })
))