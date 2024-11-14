/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { create } from "zustand";
import { Patient } from "../types";

//Creamos el type de los pacientes
type PatientStore = {
  patients: Patient[]
}

// Creación del store con "create"
export const usePatientStore = create<PatientStore>(() => ({
  patients: []
}))