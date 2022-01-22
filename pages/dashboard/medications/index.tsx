import {
  Button,
  DataTableHeader,
  Modal,
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
import { useState } from "react";
import EditModal from "../../../components/medication/EditModal";
import { Container } from "../../../components/ui/Container";
import LayoutBase from "../../../components/ui/navigation/layout";
import ClientError from "../../../components/util/ClientError";
import ClientLoading from "../../../components/util/ClientLoading";
import useMedications from "../../../hooks/useMedications";
import { MedicationType } from "../../../types/medication";
import { removeMedication, submitMedication } from "./view";

export default function MedicationPage() {
  const allMedications = useMedications();
  const [editModal, setEditModal] = useState<boolean>(false);
  const [currentMedication, setCurrentMedication] = useState<
    Partial<MedicationType>
  >(null);

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

  const [addedMedication, setAddedMedication] = useState<
    Partial<MedicationType>
  >(null);

  // hey there what'sup

  if (allMedications.status === "error") {
    return <ClientError>Error loading medications from backend.</ClientError>;
  }

  if (allMedications.status === "loading") {
    return <ClientLoading />;
  }

  return (
    <LayoutBase title="Medications" breadcrumbs={["Dashboard", "Medications"]}>
      {editModal && (
        <EditModal setOpen={setEditModal} current={currentMedication} />
      )}
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
              <TableHeader colSpan={2}>Actions</TableHeader>
            </TableRow>
            <TableBody>
              {allMedications.value
                .sort((a, b) => a.id - b.id)
                .map(
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

                        <TableCell key="remove-button">
                          <a onClick={() => removeMedication(row.id)}>Remove</a>
                        </TableCell>
                        <TableCell key="edit-button">
                          <a
                            onClick={() => {
                              setCurrentMedication(row);
                              setEditModal(true);
                            }}
                          >
                            Edit
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
                      (addedMedication.description == "" ||
                        addedMedication.name == "" ||
                        addedMedication.type == "")
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
                <TableCell colSpan={2} key="add_description">
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
        <div>hey there what'sup</div>
      </Container>
    </LayoutBase>
  );
}
