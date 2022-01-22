import { Link, Tile } from "carbon-components-react";
import apiCall from "../../../common/api/ApiCall";
import TreatmentCard from "../../../components/treatment/TreatmentCard";
import { Container } from "../../../components/ui/Container";
import LayoutBase from "../../../components/ui/navigation/layout";
import { ArentFlex } from "../../../components/ui/navigation/layout/ArentGrid";
import ClientError from "../../../components/util/ClientError";
import ClientLoading from "../../../components/util/ClientLoading";
import { removeTreatmentFromBackend } from "../../../hooks/user/helpers";
import {
  ConsolidatedTreatment,
  ConsolidatedWound,
} from "../../../hooks/user/types";
import useUserInfo from "../../../hooks/user/usePatientInfo";
import { MedicationType } from "../../../types/medication";

async function getMedication(id) {
  const res = await apiCall(`/api/medication?id=${id}`, "GET");
  return res;
}

export default function DoctorTreatmentsPage() {
  const { basics, patientData, doctorData } = useUserInfo();

  const basicsReady = basics.status === "ready";
  const patientDataReady = basicsReady && patientData.status === "ready";
  const doctorDataReady = basicsReady && doctorData.status === "ready";

  const ready = basicsReady && patientDataReady && doctorDataReady;
  const error =
    basics.status === "error" ||
    patientData.status === "error" ||
    doctorData.status === "error";

  if (!ready) {
    return <ClientLoading />;
  }

  if (error) {
    return <ClientError>Something went wrong</ClientError>;
  }

  if (doctorData.status === "ready") {
    const { treatments } = doctorData.value.doctor;
    // treatments[i][0]
    const finalTreatments: ConsolidatedTreatment[] = treatments.map((t) => {
      return {
        ...t[0],
      };
    });
    console.log(finalTreatments);

    return (
      <LayoutBase title="Treatments" breadcrumbs={["Dashboard"]}>
        <Container>
          <h2>Treatments</h2>
          <ArentFlex direction="column" gap={20} width="100%">
            {finalTreatments.map((t) => (
              <TreatmentCard treatment={t} />
            ))}
            <Link style={{ width: "100%" }} href="treatments/new">
              <Tile
                style={{
                  width: "100%",
                  color: "white",
                  background: "black",
                }}
              >
                <small>Add new</small>
                <h3>No treatments added</h3>
                <p>Add new treatments to your profile.</p>
                <br />
                <br />
                <br />
              </Tile>
            </Link>
          </ArentFlex>
        </Container>
      </LayoutBase>
    );
  }
}
