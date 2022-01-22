import {
  Modal,
  TextInput,
  Select,
  SelectItem,
  Button,
} from "carbon-components-react";
import { useState } from "react";
import apiCall from "../../common/api/ApiCall";
import { MedicationType } from "../../types/medication";
import { Container } from "../WoundCard";

async function updateMedication(medication: MedicationType) {
  const response = await apiCall("/api/medication", "PUT", {
    medication,
  });
  return response;
}

export default function EditModal({
  current,
  setOpen,
}: {
  current: MedicationType;
  setOpen: (open: boolean) => void;
}) {
  const [currentData, setCurrentData] = useState<MedicationType>(current);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentData({
      ...currentData,
      [e.target.id]: e.target.value,
    });
  };

  return (
    <Modal
      onRequestClose={() => setOpen(false)}
      modalHeading="Update medication"
      primaryButtonText="Save"
      onRequestSubmit={() => {
        updateMedication(currentData).then(() => {
          setCurrentData(current);
          setOpen(false);
        });
      }}
      open={true}
    >
      <p style={{ marginBottom: "1rem" }}>
        Update the data for selected medication and upload it to the database.
      </p>
      <TextInput
        labelText="Name"
        id="name"
        value={currentData.name}
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
      />
      <TextInput
        labelText="Description"
        id="description"
        value={currentData.description}
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
      />
      <Select
        labelText="Type"
        id="type"
        value={currentData.type}
        onChange={handleChange}
        style={{ marginBottom: "1rem" }}
      >
        {["Ointment", "Tablet", "Capsule", "Syrup", "Inhaler", "Herbal"].map(
          (type) => (
            <SelectItem text={type} value={type} />
          )
        )}
      </Select>
    </Modal>
  );
}
