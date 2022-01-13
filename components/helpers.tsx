import React from "react";
import {
  GiChestArmor,
  GiDeadHead,
  GiNecklaceDisplay,
  GiMuscularTorso,
  GiForearm,
  GiArm,
  GiLegArmor,
  GiLeg,
  GiBarefoot,
  GiHand,
} from "react-icons/gi";
import { RiPsychotherapyFill } from "react-icons/ri";
import { WoundLocation } from "../data/types";

export const WoundLocationIcon: Record<WoundLocation, React.ReactNode> = {
  Head: <GiDeadHead />,
  Neck: <GiNecklaceDisplay />,
  Chest: <GiChestArmor />,
  Abdomen: <GiMuscularTorso />,
  "Lower Arm": <GiForearm />,
  "Upper Arm": <GiArm />,
  "Lower Leg": <GiLegArmor />,
  "Upper Leg": <GiLeg />,
  Foot: <GiBarefoot />,
  Hand: <GiHand />,
  Other: <RiPsychotherapyFill />,
};
