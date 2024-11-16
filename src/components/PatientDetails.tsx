/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { usePatientStore } from "../store/store"
import { Patient } from "../types"
import PatientDetailItem from "./PatientDetailItem"

type PatientDetailsProps = {
  patient: Patient
}

export default function PatientDetails({patient} : PatientDetailsProps) {

  const { deletePatient, getPatientById} = usePatientStore()

  return (
    <div className="mx-5 my-10 px-5 py-10 bg-white shadow-xl rounded-xl">
      <PatientDetailItem label="ID" data={patient.id} />
      <PatientDetailItem label="Nombre" data={patient.name} />
      <PatientDetailItem label="Propietario" data={patient.caretaker} />
      <PatientDetailItem label="Correo" data={patient.email} />
      <PatientDetailItem label="Fecha de Ingreso" data={patient.date.toString()} />
      <PatientDetailItem label="Síntomas" data={patient.symptoms} />

      <div className=" flex justify-between mt-10">
        <button
          type="button"
          className=" py-2 px-10 bg-indigo-600 hover:bg-indigo-700 text-white font-bold uppercase rounded-lg"
          onClick={() => getPatientById(patient.id)}
        >Editar</button>
        
        <button
          type="button"
          className=" py-2 px-10 bg-red-600 hover:bg-red-700 text-white font-bold uppercase rounded-lg"
          onClick={() => deletePatient(patient.id)} 
        >Eliminar</button>
      </div>
    </div>
  );
}
