import { toast } from 'react-toastify'
import Error from "./Error";
import { useForm } from "react-hook-form";
import { DraftPatient } from "../types";
import { usePatientStore } from "../store/store";
import { useEffect } from "react";

export default function PatientForm() {
  
  const { addPatient, activeId, patients, updatePatient } = usePatientStore() 

  useEffect(() => {
    if(activeId) {
      const activePatient = patients.filter( patient => patient.id === activeId)[0]
      setValue('name', activePatient.name)
      setValue('caretaker', activePatient.caretaker)
      setValue('email', activePatient.email)
      setValue('date', activePatient.date)
      setValue('symptoms', activePatient.symptoms)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeId, patients])

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors }, // Extraemos errors del formState con object destructuring
    reset
  } = useForm<DraftPatient>();

  const registerPatient = (data: DraftPatient) => {
    // Identificamos si en activeId hay algo disparamos la acción 
    if(activeId) {
      updatePatient(data)
    } else {
      addPatient(data)
      toast.success('Paciente Registrado')
    }

    reset()
  };

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">Seguimiento de Pacientes</h2>

      <p className="text-xl mt-5 text-center mb-10">
        Añade Pacientes y {""}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form
        className="bg-white shadow-md rounded-lg py-10 px-5 mb-10"
        onSubmit={handleSubmit(registerPatient)}
      >
        <div className="mb-5">
          <label htmlFor="name" className="text-sm uppercase font-bold">
            Paciente
          </label>
          <input
            id="name"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Paciente"
            {...register("name", {
              required: "El Nombre del Paciente es Obligatorio",
            })}
          />

          {/* Renderizamos el componente y le pasamos errors como children para hacerlo reutilizable */}
          {errors.name && <Error>{errors.name?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="caretaker" className="text-sm uppercase font-bold">
            Propietario
          </label>
          <input
            id="caretaker"
            className="w-full p-3  border border-gray-100"
            type="text"
            placeholder="Nombre del Propietario"
            {...register("caretaker", {
              required: "El Propietario es Obligatorio",
            })}
          />

          {errors.caretaker && (
            <Error>{errors.caretaker?.message}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="email" className="text-sm uppercase font-bold">
            Email
          </label>
          <input
            id="email"
            className="w-full p-3  border border-gray-100"
            type="email"
            placeholder="Email de Registro"
            {...register("email", {
              required: "El email es Obligatorio",
              pattern: {
                value:
                  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i /* Expresión regular para válidar el email con caracteres */,
                message: "Email no Válido",
              },
            })}
          />

          {errors.email && <Error>{errors.email?.message}</Error>}
        </div>

        <div className="mb-5">
          <label htmlFor="date" className="text-sm uppercase font-bold">
            Fecha Ingreso
          </label>
          <input
            id="date"
            className="w-full p-3  border border-gray-100"
            type="date"
            {...register('date', {
              required: 'La fecha de Ingreso es Obligatoria'
            })}
          />

          {errors.date && (
            <Error>{errors.date?.message}</Error>
          )}
        </div>

        <div className="mb-5">
          <label htmlFor="symptoms" className="text-sm uppercase font-bold">
            Síntomas
          </label>
          <textarea
            id="symptoms"
            className="w-full p-3  border border-gray-100"
            placeholder="Síntomas del paciente"
            {...register('symptoms', {
              required: 'Los Síntomas son Obligatorios'
            })}
          />

          {errors.symptoms && (
            <Error>{errors.symptoms?.message}</Error>
          )}
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors"
          value="Guardar Paciente"
        />
      </form>
    </div>
  );
}
