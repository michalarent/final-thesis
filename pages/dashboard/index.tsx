import { ClickableTile, Link, Loading } from "carbon-components-react";
import React from "react";
import LayoutBase from "../../components/ui/navigation/layout";
import { ArrowRight16 } from "@carbon/icons-react/";
import {
  ArentFlex,
  ArentGrid,
} from "../../components/ui/navigation/layout/ArentGrid";
import { usePatient, useDoctor, useUser, useWounds } from "../../hooks/user";
import router from "next/router";

export default function Home() {
  const user = useUser();
  const patient = usePatient(user?.authId);
  const doctor = useDoctor(user?.authId);
  const wounds = useWounds(user?.authId);

  console.log("Patient:", wounds);

  if (!user || !patient) {
    return <Loading />;
  }

  return (
    <LayoutBase title="Dashboard" breadcrumbs={["Dashboard"]}>
      <ArentFlex align="center" width="100%" height="100%" justify="center">
        <ArentFlex
          direction="column"
          align="center"
          justify="center"
          width="800px"
          height="100%"
          gap={20}
        >
          <ArentFlex direction="column" align="start" width="100%">
            <small style={{ alignSelf: "start" }}>
              You are logged in as a {patient ? "patient" : "new user"}
            </small>
            <h2 style={{ alignSelf: "start", margin: 0, marginBlock: 0 }}>
              Welcome, <strong>{user.name}</strong>
            </h2>
          </ArentFlex>
          <ArentGrid columns="1fr 1fr" width="100%" gap={20}>
            <ClickableTile
              onClick={() =>
                router.push(
                  `/dashboard/onboarding/${
                    patient?.medicalFormData ? "edit" : "new"
                  }`
                )
              }
              style={{ padding: 0, width: "100%", height: "auto" }}
            >
              <ArentFlex direction="column" padding="0px" width="100%">
                <ArentFlex direction="column" padding={"16px"} width="100%">
                  <small>Medical History</small>
                  <h4>
                    {patient?.medicalFormData
                      ? "Edit Your Medical History"
                      : "Fill Out Your Medical History"}
                  </h4>
                  <br />
                  <br />
                  <ArentFlex align="center" gap={10} width="100%">
                    <strong>Go to form</strong>
                    <ArrowRight16 />
                  </ArentFlex>
                </ArentFlex>
              </ArentFlex>
            </ClickableTile>
            <ClickableTile
              style={{ padding: 0, width: "100%", height: "auto" }}
              onClick={() => router.push(`/dashboard/account/`)}
            >
              <ArentFlex direction="column" padding="0px" width="100%">
                <ArentFlex direction="column" padding={"16px"} width="100%">
                  <small>Your Data</small>
                  <h4>Edit Your Personal Data</h4>
                  <br />
                  <br />
                  <ArentFlex align="center" gap={10} width="100%">
                    <strong>Go to edit panel</strong>
                    <ArrowRight16 />
                  </ArentFlex>
                </ArentFlex>
              </ArentFlex>
            </ClickableTile>
          </ArentGrid>
          <ArentGrid gap={20} columns="1fr 1fr" width="100%">
            <ClickableTile
              style={{
                padding: 0,
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              onClick={() => router.push(`/dashboard/wound/new`)}
            >
              <ArentFlex direction="column" padding="0px" width="100%">
                <ArentFlex direction="column" padding={"16px"} width="100%">
                  <small>Get Help</small>
                  <h4>Register New Injury</h4>
                  <br />
                  <br />
                  <ArentFlex align="center" gap={10} width="100%">
                    <strong>Go to injury panel</strong>
                    <ArrowRight16 />
                  </ArentFlex>
                </ArentFlex>
              </ArentFlex>
            </ClickableTile>
            <ClickableTile
              style={{
                padding: 0,
                width: "100%",
                height: "auto",
                objectFit: "cover",
              }}
              onClick={() => router.push(`/dashboard/wound`)}
            >
              <ArentFlex direction="column" padding="0px" width="100%">
                <ArentFlex direction="column" padding={"16px"} width="100%">
                  <small>Review Your Wounds</small>
                  <h4>Review Wounds</h4>
                  <br />
                  <br />
                  <ArentFlex align="center" gap={10} width="100%">
                    <strong>Go to injury panel</strong>
                    <ArrowRight16 />
                  </ArentFlex>
                </ArentFlex>
              </ArentFlex>
            </ClickableTile>
          </ArentGrid>
          <ClickableTile
            style={{
              padding: 0,
              width: "800px",
              height: "auto",
              objectFit: "cover",
            }}
            onClick={() => router.push(`/dashboard/doctor/contact/`)}
          >
            <ArentFlex direction="column" padding="0px" width="100%">
              <ArentFlex direction="column" padding={"16px"} width="100%">
                <small>Get Help</small>
                <h4>Contact Your Doctor</h4>
                <br />
                <br />
                <ArentFlex align="center" gap={10} width="100%">
                  <strong>Go to contact panel</strong>
                  <ArrowRight16 />
                </ArentFlex>
              </ArentFlex>
            </ArentFlex>
          </ClickableTile>
          <ArentFlex direction="column" style={{ alignSelf: "start" }}>
            {doctor ? (
              <>
                <small style={{ alignSelf: "start" }}>Doctor Panel</small>
                <h4 style={{ alignSelf: "start" }}>
                  Looks like you're not only a patient but also a doctor!
                </h4>
              </>
            ) : (
              <>
                <small style={{ alignSelf: "start" }}>Wanna be a doc?</small>
                <h4 style={{ alignSelf: "start" }}>
                  Become a doc in one easy step!
                </h4>
              </>
            )}
          </ArentFlex>
          <ClickableTile
            onClick={() =>
              router.push(
                doctor ? `/dashboard/doctor/edit` : `/dashboard/doctor/new`
              )
            }
            style={{
              padding: 0,
              width: "800px",
              height: "auto",
              objectFit: "cover",
            }}
          >
            <ArentFlex direction="column" padding="0px" width="100%">
              <ArentFlex direction="column" padding={"16px"} width="100%">
                <small>
                  {doctor ? "Update Your Doctor Data" : "Become a Doctor"}
                </small>
                <h4>{doctor ? "Update Data" : "Register as a Doctor"}</h4>
                <br />
                <br />
                <ArentFlex align="center" gap={10} width="100%">
                  <strong>Go to submission panel</strong>
                  <ArrowRight16 />
                </ArentFlex>
              </ArentFlex>
            </ArentFlex>
          </ClickableTile>
        </ArentFlex>
      </ArentFlex>
    </LayoutBase>
  );
}
