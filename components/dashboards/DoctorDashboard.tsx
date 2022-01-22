import { Tile, Button, ClickableTile } from "carbon-components-react";
import router from "next/router";
import { Loader } from "../../hooks/useLoaderSWR";
import { ConsolidatedDoctorInfo } from "../../hooks/user/types";
import LastChatMessage from "../LastChatMessage";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";
import ClientError from "../util/ClientError";
import ClientLoading from "../util/ClientLoading";
import WoundSlider from "../WoundSlider";
import AppointmentCard from "./cards/AppointmentCard";
import { ArrowRight16 } from "@carbon/icons-react/";
import { colors } from "../../theme/colors";
import Link from "next/link";

export default function DoctorDashboard({
  doctorData,
}: {
  doctorData: Loader<ConsolidatedDoctorInfo>;
}) {
  if (doctorData.status === "error") {
    return <ClientError>Error loading doctor data</ClientError>;
  }

  if (doctorData.status === "loading") {
    return <ClientLoading />;
  }

  console.log(doctorData);
  return (
    <ArentFlex direction="column" height="100%" width="100%" gap={20}>
      <h3>Upcoming Appointments</h3>
      <Tile style={{ width: "100%" }}>
        <WoundSlider
          cards={doctorData.value.doctor.appointments
            .filter(
              (appointment) => new Date(appointment.date).getTime() > Date.now()
            )
            .sort(
              (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
            )
            .map((app) => {
              return (
                <div style={{ width: "100%" }}>
                  <AppointmentCard app={app} />
                </div>
              );
            })}
        />
      </Tile>
      <ArentGrid columns="1fr 1fr" gap={20}>
        <Tile style={{ width: "100%", height: 250 }}>
          <LastChatMessage
            isPatient={false}
            currentUserId={doctorData.value.doctor.authId}
            chats={doctorData.value.doctor.chats}
          />
        </Tile>
        <Link href="/dashboard/doctor/treatments">
          <Tile
            style={{
              width: "100%",
              height: 250,
              color: "white",
              background: "crimson",
            }}
          >
            <small>Treatments Panel</small>
            <h3>Start, create, cancel and manage current treatments</h3>
            <p>Start healing your patients right away!</p>
            <br />
            <br />
            <br />
            <br />
            <ArentFlex align="center" gap={10} width="100%">
              <strong>Go to patients</strong>
              <ArrowRight16 />
            </ArentFlex>
          </Tile>
        </Link>
        <Link href="/dashboard/doctor/patients">
          <Tile
            style={{
              width: "100%",
              height: 220,
              color: "black",
              background: colors.mint,
            }}
          >
            <small>Patients Panel</small>
            <h3>View your appointment history with patients</h3>
            <p>See what you've been up to!</p>
            <br />
            <br />
            <br />
            <br />
            <ArentFlex align="center" gap={10} width="100%">
              <strong>Go to patients</strong>
              <ArrowRight16 />
            </ArentFlex>
          </Tile>
        </Link>
      </ArentGrid>
    </ArentFlex>
  );
}
