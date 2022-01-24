import {
  Button,
  Loading,
  NumberInput,
  OverflowMenu,
  OverflowMenuItem,
  Select,
  SelectItem,
  SelectItemGroup,
  StructuredListBody,
  StructuredListCell,
  StructuredListHead,
  StructuredListRow,
  StructuredListWrapper,
  TextArea,
} from "carbon-components-react";
import { m } from "framer-motion";
import { useState } from "react";
import useMedications from "../../hooks/useMedications";
import ClientLoading from "../util/ClientLoading";
import Modal from "react-modal";
import { modalStyles } from "../modal_styles";
import UpdateMedicationForm from "./UpdateMedication";
import TreatmentMedication from "../../db/TreatmentMedication";
import { ArentFlex } from "../ui/navigation/layout/ArentGrid";
import apiCall from "../../common/api/ApiCall";
import ClientError from "../util/ClientError";

export default function MedicationsListWithAdd({
  medications,
  treatmentId,
  isDoctor,
}: {
  medications: TreatmentMedication[];
  treatmentId: number;
  isDoctor: boolean;
}) {
  const [stateMedications, setStateMedications] = useState<any>(medications);

  const [selection, setSelection] = useState<any>();
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [newDosage, setNewDosage] = useState<number>(0);
  const [requestLoading, setRequestLoading] = useState<boolean>(false);
  const [currentMedication, setCurrentMedication] = useState<
    TreatmentMedication
  >();

  const allMedications = useMedications();

  console.log(allMedications.value);

  if (allMedications.status === "loading") {
    return <ClientLoading />;
  }

  if (allMedications.status === "error") {
    return <ClientError>Error loading medications.</ClientError>;
  }

  console.log(allMedications.value);

  async function postMedicationToTreatment() {
    setRequestLoading(true);
    const res: any = await apiCall(`/api/treatment/medication`, "POST", {
      treatmentId,
      data: {
        medication: selection,
        dosage: newDosage,
        instructions: description,
      },
    });
    setRequestLoading(false);
    allMedications.status === "ready" &&
      setStateMedications([
        ...stateMedications,
        {
          ...res,
          medication: {
            name: allMedications.value.find((med) => med.id === res.medication)
              .name,
            description: allMedications.value.find(
              (med) => med.id === res.medication
            ).description,
            type: allMedications.value.find((med) => med.id === res.medication)
              .type,
          },
        },
      ]);
  }

  async function removeMedicationFromTreatment(id) {
    setRequestLoading(true);
    const res: any = await apiCall(`/api/treatment/medication`, "DELETE", {
      treatmentId,
      data: {
        medication: id,
      },
    });

    setRequestLoading(false);
    setCurrentMedication(null);
    setStateMedications(stateMedications.filter((med) => med.id !== id));
    return res;
  }

  return (
    <ArentFlex width="100%" height="100%" direction="column" justify="start">
      <Modal
        style={modalStyles}
        isOpen={openEditModal}
        onRequestClose={() => setOpenEditModal(false)}
      >
        <UpdateMedicationForm
          currentMedication={currentMedication}
          setRequestLoading={setRequestLoading}
          treatmentId={treatmentId}
        />
      </Modal>
      {requestLoading && <Loading />}
      <StructuredListWrapper
        style={{ width: "100%", height: "calc(100% - 180px)" }}
      >
        <StructuredListHead>
          <StructuredListRow head>
            <StructuredListCell head>Name</StructuredListCell>
            <StructuredListCell head>Description</StructuredListCell>
            <StructuredListCell head>Type</StructuredListCell>
            <StructuredListCell head>Instructions</StructuredListCell>
            <StructuredListCell head>Dosage</StructuredListCell>
            <StructuredListCell head>{""}</StructuredListCell>
          </StructuredListRow>
        </StructuredListHead>
        <StructuredListBody>
          {stateMedications.map(
            (m, index) => (
              console.log(m),
              (
                <StructuredListRow key={index}>
                  <StructuredListCell>{m.medication.name}</StructuredListCell>
                  <StructuredListCell>
                    {m.medication.description}
                  </StructuredListCell>

                  <StructuredListCell>{m.medication.type}</StructuredListCell>

                  <StructuredListCell>{m.instructions}</StructuredListCell>
                  <StructuredListCell style={{ width: 50 }}>
                    {m.dosage}
                  </StructuredListCell>

                  {isDoctor && (
                    <StructuredListCell style={{ width: 100 }}>
                      <OverflowMenu flipped>
                        <OverflowMenuItem
                          onClick={() => {
                            removeMedicationFromTreatment(m.id);
                          }}
                          itemText="Remove"
                        >
                          Hey
                        </OverflowMenuItem>
                        <OverflowMenuItem
                          onClick={() => {
                            setCurrentMedication(m);
                            setOpenEditModal(true);
                          }}
                          itemText="Edit"
                        >
                          Hey
                        </OverflowMenuItem>
                      </OverflowMenu>
                    </StructuredListCell>
                  )}
                </StructuredListRow>
              )
            )
          )}
        </StructuredListBody>
      </StructuredListWrapper>
      {isDoctor && (
        <ArentFlex
          style={{
            alignSelf: "flex-end",
            justifySelf: "flex-end",
            paddingRight: 10,
          }}
          align="flex-end"
          width="100%"
          gap={20}
        >
          <ArentFlex
            align="flex-end"
            style={{ gridColumn: "span 2" }}
            width="100%"
          >
            <Select
              onChange={(e) => setSelection(e.target.value)}
              noLabel
              style={{ width: "100%" }}
              id={""}
            >
              {[
                "Ointment",
                "Tablet",
                "Capsule",
                "Syrup",
                "Inhaler",
                "Herbal",
              ].map((type, index) => (
                <SelectItemGroup label={type}>
                  {allMedications.value
                    .filter((m) => m.type === type)
                    .map((med) => (
                      <SelectItem
                        key={med.id}
                        value={med.id}
                        label={med.name}
                        text={med.description}
                      />
                    ))}
                </SelectItemGroup>
              ))}
            </Select>
          </ArentFlex>

          <ArentFlex align="flex-end" width="100%">
            <NumberInput
              style={{ width: "100%" }}
              label="Dosage"
              onChange={(e) => setNewDosage(e.imaginaryTarget.value)}
              min={0}
              value={newDosage}
              id={""}
            />
          </ArentFlex>
          <ArentFlex align="flex-end" width="100%">
            <TextArea
              hideLabel
              onChange={(e) => setDescription(e.currentTarget.value)}
              value={description}
              labelText={""}
            ></TextArea>
          </ArentFlex>
          <ArentFlex align="flex-end" width="100%">
            <Button
              onClick={() => {
                postMedicationToTreatment();
              }}
              disabled={
                description === "" || newDosage == 0 || selection == null
              }
              size="field"
              style={{ width: "100%" }}
            >
              Add
            </Button>
          </ArentFlex>
        </ArentFlex>
      )}
    </ArentFlex>
  );
}
