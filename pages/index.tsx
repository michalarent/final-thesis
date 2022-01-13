import { ClickableTile, Loading } from "carbon-components-react";
import { Container } from "../components/ui/Container";
import LayoutBase from "../components/ui/navigation/layout";
import {
  ArentFlex,
  ArentGrid,
} from "../components/ui/navigation/layout/ArentGrid";
import { Loader, ReadyLoader } from "../hooks/useLoaderSWR";
import Await from "../hooks/user/Await";

import useUserInfo from "../hooks/user/usePatientInfo";
import { IDoctor, IPatient, IUser } from "../types/user";
import { ArrowRight16 } from "@carbon/icons-react/";
import Link from "next/link";
import router from "next/router";
export type ReadyData =
  | {
      isReady: boolean;
      data: Record<string, ReadyLoader<any>>;
    }
  | {
      isReady: boolean;
      data: null;
    };

const everythingReady = (data: Record<string, Loader<any>>): ReadyData => {
  const isReady = Object.values(data).every(
    (loader) => loader.status === "ready"
  );

  const readyData = Object.entries(data).reduce((acc, [key, loader]) => {
    if (loader.status === "ready") {
      acc[key] = loader;
    }
    return acc;
  }, {});

  if (isReady) {
    return {
      isReady: true,
      data: readyData,
    };
  } else {
    return {
      isReady: false,
      data: null,
    };
  }
};

export default function Home() {
  const { basics, patientData, doctorData } = useUserInfo();

  const basicsReady = basics.status === "ready";
  const patientDataReady = basicsReady && patientData.status === "ready";
  const doctorDataReady = basicsReady && doctorData.status === "ready";

  const ready = basicsReady && patientDataReady && doctorDataReady;

  if (!ready) {
    return <Loading />;
  }

  if (ready && patientData.value.isPatient) {
    router.push("/dashboard");
  }

  if (ready) {
    return (
      <LayoutBase title="Home" breadcrumbs={[]}>
        <Await data={{ basics, patientData, doctorData }}>
          <Container>
            <ArentFlex justify="center" width="100%">
              <ArentGrid gap={20} width="100%" columns="1fr 1fr">
                <ClickableTile
                  onClick={() => router.push("/dashboard/onboarding/new")}
                  disabled={patientData.value.isPatient}
                >
                  <small>Medical History</small>
                  <h4>Register as a Patient</h4>
                  <br />
                  <br />
                  <br />
                  <p>
                    You will be guided to a page where you can fill out your
                    medical history.
                  </p>
                  <br />
                  <ArentFlex align="center" gap={10} width="100%">
                    <strong>Go to appointments</strong>
                    <ArrowRight16 />
                  </ArentFlex>
                </ClickableTile>

                <ClickableTile disabled={true}>
                  <small>Medical Professional Onboarding</small>
                  <h4>Register as a Doctor</h4>
                  <br />
                  <br />
                  <br />
                  <p>
                    You will be guided to a page where you can fill out your
                    medical history.
                  </p>
                  <br />
                  <ArentFlex align="center" gap={10} width="100%">
                    <strong>Go to appointments</strong>
                    <ArrowRight16 />
                  </ArentFlex>
                </ClickableTile>
              </ArentGrid>
            </ArentFlex>
          </Container>
        </Await>
      </LayoutBase>
    );
  }
}
