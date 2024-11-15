import { usePatientStore } from "../store/store"

export default function PatientList() {

  const patients = usePatientStore(state => state.patients)
  console.log(patients)

  return (
    <div>PatientList</div>
  )
}
