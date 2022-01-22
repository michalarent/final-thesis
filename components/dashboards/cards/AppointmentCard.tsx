import { Button, Loading, Tile } from "carbon-components-react";
import Link from "next/link";
import router from "next/router";
import { getStandardDate } from "../../../common/util/dates";
import { ConsolidatedAppointment } from "../../../helpers/doctor/types";
import { colors } from "../../../theme/colors";
import MedicalHistoryTable from "../../patient/MedicalHIstoryTable";
import { ArentFlex } from "../../ui/navigation/layout/ArentGrid";
import { Scrollable } from "../../ui/Scrollable";

export default function AppointmentCard({
  app,
}: {
  app: ConsolidatedAppointment;
}) {
  console.log(app);
  return (
    <Tile style={{ background: colors.white }}>
      <ArentFlex direction="column" gap={10} width="100%" align="center">
        <h5 style={{ width: "90%", color: "black" }}>
          {getStandardDate(new Date(app.date).getTime())}
        </h5>

        <Scrollable height="180px" style={{ width: "100%", borderRadius: 10 }}>
          <ArentFlex direction="column" gap={10} width="100%">
            {app.wound.patient.medicalHistory ? (
              <MedicalHistoryTable
                size="short"
                medicalHistory={app.wound.patient.medicalHistory}
              />
            ) : (
              <Loading />
            )}
          </ArentFlex>
        </Scrollable>
        <Link href={`/dashboard/appointments/edit/${app.id}`}>
          <Button style={{ color: "black", background: "white" }}>
            Go to appointment {app.id} details
          </Button>
        </Link>
      </ArentFlex>
    </Tile>
  );
}
