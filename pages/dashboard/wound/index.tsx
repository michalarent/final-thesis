import { Button, Loading, Tile, Modal } from "carbon-components-react";
import router from "next/router";
import React from "react";
import ListDoctors from "../../../components/ListDoctors";
import LayoutBase from "../../../components/ui/navigation/layout";
import { ArentGrid } from "../../../components/ui/navigation/layout/ArentGrid";
import { useDoctors, useUser, useWounds } from "../../../hooks/user";

export default function Wounds() {
  const user = useUser();
  const wounds = useWounds(user.authId);
  const doctors = useDoctors();
  const [openModal, setOpenModal] = React.useState(false);
  const [currentWound, setCurrentWound] = React.useState(null);

  if (!user || !wounds) {
    return <Loading />;
  }

  console.log(wounds);
  const handleModal = (woundId?: any) => {
    setCurrentWound(woundId);
    setOpenModal((val) => !val);
  };

  return (
    <LayoutBase title="Wounds" breadcrumbs={["Dashboard", "Wounds"]}>
      {wounds.map((wound) => (
        <Tile>
          <small>Pain Level: {wound.woundFormData.painLevel}</small>
          <h4>{wound.woundFormData.woundType.label}</h4>
          <p>{wound.woundFormData.odor}</p>
          <p>Length: {wound.woundFormData.woundLength}</p>
          <br />
          <ArentGrid gap={20} columns="auto 1fr" justify="start">
            <Button onClick={() => handleModal(wound.id)}>
              Request an Appointment for wound {wound.id}
            </Button>
            <Button>Delete </Button>
          </ArentGrid>
        </Tile>
      ))}
      <Modal
        primaryButtonDisabled
        open={openModal}
        onRequestClose={() => handleModal()}
      >
        <small>Doctors</small>
        <h3>Pick a Doctor</h3>
        <ListDoctors
          action={"Setup Appointment for wound #" + currentWound}
          doctors={doctors}
          href={`/dashboard/appointments/${currentWound}`}
        />
      </Modal>
    </LayoutBase>
  );
}
