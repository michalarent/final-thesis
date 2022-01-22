import {
  DataTableSize,
  Table,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import PatientMedicalHistory from "../../db/PatientMedicalHistory";

export default function MedicalHistoryTable({
  medicalHistory,
  size,
}: {
  medicalHistory: PatientMedicalHistory;
  size?: DataTableSize;
}) {
  return (
    <TableContainer
      style={{ width: "100%" }}
      title={`Patient: ${medicalHistory.firstName +
        " " +
        medicalHistory.lastName}`}
      description={`Born: ${new Date(
        medicalHistory.birthDate
      ).toLocaleDateString()}`}
    >
      <Table
        style={{ width: "100%", overscrollBehavior: "contain" }}
        size={size || "normal"}
      >
        <TableRow>
          <TableHeader>Field</TableHeader>
          <TableHeader>Answer</TableHeader>
        </TableRow>
        <TableRow>
          <TableCell>First Name</TableCell>
          <TableCell>{medicalHistory.firstName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Last Name</TableCell>
          <TableCell>{medicalHistory.lastName}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Birth Date</TableCell>
          <TableCell>
            {new Date(medicalHistory.birthDate).toLocaleDateString()}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Blood Type</TableCell>
          <TableCell>
            {medicalHistory.bloodType ? medicalHistory.bloodType : "Unknown"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Country</TableCell>
          <TableCell>{medicalHistory.country}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Gender</TableCell>
          <TableCell>{medicalHistory.gender}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Is Alcoholic?</TableCell>
          <TableCell>{medicalHistory.isAlcoholic ? "True" : "False"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Is Smoker?</TableCell>
          <TableCell>{medicalHistory.isSmoker ? "True" : "False"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Is Diabetic?</TableCell>
          <TableCell>{medicalHistory.isDiabetic ? "True" : "False"}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Known Medications</TableCell>
          <TableCell>
            {medicalHistory.medications
              ? medicalHistory.medications.map((m) => <span>{m},</span>)
              : "None"}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Known Allergies</TableCell>
          <TableCell>
            {medicalHistory.allergies
              ? medicalHistory.allergies.map((m, index) => (
                  <span>
                    {m}
                    {index !== medicalHistory.allergies.length - 1 && ","}
                  </span>
                ))
              : "None"}
          </TableCell>
        </TableRow>
      </Table>
    </TableContainer>
  );
}
