import { Button, Loading, Tile } from "carbon-components-react";
import React from "react";
import useSWR from "swr";
import ListDoctors from "../../../components/ListDoctors";
import LayoutBase from "../../../components/ui/navigation/layout";
import { useDoctors } from "../../../hooks/user";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Contact() {
  const doctors = useDoctors();

  console.log(doctors);
  return (
    <LayoutBase title="Contact" breadcrumbs={["Dashboard", "Contact"]}>
      <ListDoctors doctors={doctors} onDoctorClick={() => null} />
    </LayoutBase>
  );
}
