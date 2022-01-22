import {
  Button,
  NumberInput,
  Select,
  SelectItem,
  TextArea,
  TextInput,
} from "carbon-components-react";
import { DateTime } from "luxon";
import { useState } from "react";
import styled from "styled-components";
import apiCall from "../../common/api/ApiCall";
import { getStandardDate } from "../../common/util/dates";
import TreatmentMedication from "../../db/TreatmentMedication";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import { Divider } from "../util/Divider";

export default function UpdateMedicationForm({
  treatmentId,
  setRequestLoading,
  currentMedication,
}: {
  currentMedication: TreatmentMedication;
  treatmentId: any;
  setRequestLoading: any;
}) {
  const [newDosage, setNewDosage] = useState<number>(+currentMedication.dosage);
  const [description, setDescription] = useState<string>(
    currentMedication.instructions || ""
  );

  async function postTreatmentMedicationUpdate(): Promise<any> {
    setRequestLoading(true);
    const res: any = await apiCall(`/api/treatment/medication`, "PUT", {
      treatmentId,
      data: {
        dosage: newDosage,
        instructions: description,
      },
    });

    setRequestLoading(false);
    return res;
  }

  return (
    <Wrapper>
      <ArentFlex direction="column" align="start" width="100%">
        <small>Update Medication Instructions</small>
        <h4 style={{ marginBottom: "0.5rem" }}>
          {currentMedication.medication.name}
        </h4>
        <small style={{ marginBottom: "1rem" }}>
          {currentMedication.medication.description}
        </small>
        <Divider />
        <TextArea
          style={{ marginBottom: "1rem" }}
          labelText="Instructions"
          onChange={(e) => setDescription(e.currentTarget.value)}
          value={description}
        ></TextArea>
        <ArentGrid
          columns="1fr 1fr"
          gap={20}
          align="end"
          style={{ marginBottom: "1rem" }}
        >
          <NumberInput
            label="Dosage"
            onChange={(e) => setNewDosage(e.imaginaryTarget.value)}
            min={0}
            value={newDosage}
            id={""}
          />
          <Button
            onClick={() => postTreatmentMedicationUpdate()}
            disabled={newDosage == 0 || description === ""}
            size="field"
            style={{ width: "100%" }}
          >
            Submit
          </Button>
        </ArentGrid>
        <img src="/graphics/edit-medication.png" width="50%" />
      </ArentFlex>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  & .bx--form-item,
  .bx--text-input-wrapper {
    width: 100%;
  }
  & img {
    align-self: flex-end;
  }
`;
