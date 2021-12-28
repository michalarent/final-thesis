import { ClickableTile, Loading } from "carbon-components-react";
import router from "next/router";
import React, { useEffect, useState } from "react";
import { getAppointment, getDoctor, getWound } from "../../../../common/api";
import apiCall from "../../../../common/api/ApiCall";
import LayoutBase from "../../../../components/ui/navigation/layout";
import { ArentFlex } from "../../../../components/ui/navigation/layout/ArentGrid";
import { useAppointments, useDoctors, useUser } from "../../../../hooks/user";

import dynamic from "next/dynamic";

const ReactImageAnnotate = dynamic(() => import("react-image-annotate"), {
  ssr: false,
});

export default function EditAppointment() {
  const user = useUser();
  const [appointment, setAppointment] = useState(null);
  const { appointmentId } = router.isReady && router.query;
  console.log(appointmentId);

  async function assignAppointment() {
    if (!appointmentId) return null;
    else {
      const _appointment = await apiCall(
        `/api/appointment/${appointmentId}`,
        "GET"
      );
      if (_appointment) {
        setAppointment(_appointment);
      }
    }
  }

  useEffect(() => {
    if (!appointmentId) return null;
    else {
      assignAppointment();
    }
  }, [appointmentId]);

  if (!appointmentId || !appointment) {
    return <Loading />;
  }

  console.log(appointment);

  return (
    <LayoutBase
      title="Your Appointments"
      breadcrumbs={["Dashboard", "Appointments"]}
    >
      <ArentFlex width="100%" align="center" justify="center">
        <ReactImageAnnotate
          regionClsList={["Alpha", "Beta", "Charlie", "Delta"]}
          regionTagList={["tag1", "tag2", "tag3"]}
          images={appointment.info.images.map((img, index) => ({
            src: img,
            name: "Image " + index + 1,
          }))}
        />
      </ArentFlex>
    </LayoutBase>
  );
}

//{
//   src: "https://placekitten.com/408/287",
//   name: "Image 1",
//   regions: []
// }
