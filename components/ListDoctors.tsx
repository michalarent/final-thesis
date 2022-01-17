import { Button, ClickableTile, Tile } from "carbon-components-react";
import router from "next/router";
import React from "react";

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function pListDoctors({ doctors, href, action }) {
  console.log(doctors);
  return (
    <>
      {doctors?.map((doctor) => (
        <Tile
          onClick={() =>
            router.push({
              pathname: href,
              query: { doctor: doctor.doctorData.pesel },
            })
          }
        >
          <small>
            <strong>
              {capitalizeFirstLetter(doctor.doctorData.specialization.value) +
                " "}
            </strong>
            | {doctor.doctorData.country}
          </small>
          <h4>
            {doctor.doctorData.firstName + " " + doctor.doctorData.lastName}
          </h4>
          <p>{doctor.email}</p>
          <br />

          <Button>{action}</Button>
        </Tile>
      ))}
    </>
  );
}
