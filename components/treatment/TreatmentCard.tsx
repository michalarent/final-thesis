import { Loading, Tile } from "carbon-components-react";
import { MenuDivider } from "carbon-components-react/lib/components/Menu";
import Link from "next/link";
import styled from "styled-components";
import apiCall from "../../common/api/ApiCall";
import useLoaderSWR from "../../hooks/useLoaderSWR";
import { ConsolidatedTreatment } from "../../hooks/user/types";
import { colors } from "../../theme/colors";
import { ArentGrid } from "../ui/navigation/layout/ArentGrid";

async function getAppointmentsForTreatment(id: string) {
  const [_, woundId] = id.split("_");
  console.log(woundId);
  const response = await apiCall(
    `/api/appointment/wound?woundId=${woundId}`,
    "GET"
  );
  return response;
}

export default function TreatmentCard({
  treatment,
}: {
  treatment: ConsolidatedTreatment;
}) {
  console.log(treatment);
  const appointments = useLoaderSWR(
    `appointments_${treatment.wound.id}`,
    getAppointmentsForTreatment
  );

  if (typeof treatment.wound.woundData === "number") {
    return null;
  }

  return (
    <Link href={"/dashboard/doctor/treatments/" + treatment.id}>
      <Tile style={{ width: "100%" }}>
        <small>
          {treatment.wound.woundData.woundLocation} wound treatment,{" "}
          {treatment.wound.woundData.woundSize.toLocaleLowerCase()} size,
          inflicted by{" "}
          {treatment.wound.woundData.woundSource.toLocaleLowerCase()}
        </small>
        <h5>Patient: {treatment.wound.patient.name}</h5>
        <p>Click on this area to go to the treatment management screen</p>
      </Tile>
    </Link>
  );
}

const WoundImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 2px solid ${colors.border};
`;
