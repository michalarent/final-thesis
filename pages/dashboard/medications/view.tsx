import {
  Button,
  DataTableHeader,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHeader,
  TableRow,
  TextInput,
} from "carbon-components-react";
import { useEffect, useState } from "react";
import apiCall from "../../../common/api/ApiCall";
import { Container } from "../../../components/ui/Container";
import LayoutBase from "../../../components/ui/navigation/layout";
import ClientError from "../../../components/util/ClientError";
import ClientLoading from "../../../components/util/ClientLoading";
import useMedications from "../../../hooks/useMedications";
import { MedicationType } from "../../../types/medication";

const headers: DataTableHeader[] = [
  {
    key: "id",
    header: "ID",
  },
  {
    key: "name",
    header: "Name",
  },
  { key: "type", header: "Type" },
  { key: "description", header: "Description" },
];

export async function submitMedication(
  addedMedication: Partial<MedicationType>
) {
  const response = await apiCall("/api/medication", "POST", {
    addedMedication,
  });
  // hey
  return response;
}

export async function removeMedication(id: number) {
  console.log(id);
  const response = await apiCall("/api/medication", "DELETE", {
    id,
  });
  return response;
}
//
export default function ViewMedicationsPage() {
  const allMedications = useMedications();
  const [addedMedication, setAddedMedication] = useState<
    Partial<MedicationType>
  >(null);

  // hey

  if (allMedications.status === "error") {
    return <ClientError>Error loading medications from backend.</ClientError>;
  }

  if (allMedications.status === "loading") {
    return <ClientLoading />;
  }
  //hey
  return (
    <LayoutBase title={"Medications"} breadcrumbs={["Medications"]}>
      <Container>
        <TableContainer
          title="All Medications"
          description="List of all medications available in the app"
        >
          <Table>
            <TableRow>
              {headers.map((header) => (
                <TableHeader>{header.header}</TableHeader>
              ))}
              <TableHeader>Actions</TableHeader>
            </TableRow>
            <TableBody>
              {allMedications.value.map(
                (row) => (
                  console.log(row),
                  (
                    <TableRow>
                      <>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.type}</TableCell>
                        <TableCell>{row.description}</TableCell>
                      </>

                      <TableCell key="remove">
                        <a onClick={() => removeMedication(row.id)}>
                          Remove Medication
                        </a>
                      </TableCell>
                    </TableRow>
                  )
                )
              )}
              <TableRow>
                <TableCell key={"id"}>
                  <Button
                    disabled={
                      addedMedication &&
                      (addedMedication.description == null ||
                        addedMedication.name == null ||
                        addedMedication.type == null)
                    }
                    onClick={() => {
                      submitMedication(addedMedication).then(() => {
                        setAddedMedication(null);
                      });
                    }}
                    size="small"
                  >
                    Add +
                  </Button>
                </TableCell>
                <TableCell key="name">
                  <TextInput
                    onChange={(e) => {
                      setAddedMedication({
                        ...addedMedication,
                        name: e.target.value,
                      });
                    }}
                    style={{ margin: 0 }}
                    hideLabel
                    id="name"
                    labelText="Name"
                  />
                </TableCell>
                <TableCell key="type">
                  <Select
                    defaultChecked={false}
                    defaultValue="Ointment"
                    onChange={(e) =>
                      setAddedMedication({
                        ...addedMedication,
                        type: e.target.value as any,
                      })
                    }
                    hideLabel
                    id="type"
                    labelText="Name"
                  >
                    {[
                      "Ointment",
                      "Tablet",
                      "Capsule",
                      "Syrup",
                      "Inhaler",
                      "Herbal",
                    ].map((type) => (
                      <SelectItem text={type} value={type} />
                    ))}
                  </Select>
                </TableCell>
                <TableCell key="add_description">
                  <TextInput
                    maxLength={255}
                    onChange={(e) =>
                      setAddedMedication({
                        ...addedMedication,
                        description: e.target.value,
                      })
                    }
                    hideLabel
                    id="description"
                    labelText="Description"
                  />
                </TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </LayoutBase>
  );
}
