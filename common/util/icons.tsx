import {
  WoundLocation,
  WoundSeverity,
  WoundSource,
  WoundType,
} from "../../data/types";
import {
  FcApprove,
  FcAssistant,
  FcDisapprove,
  FcDisclaimer,
  FcDislike,
  FcDoNotInhale,
  FcFlashOn,
  FcHighPriority,
  FcIdea,
  FcInfo,
  FcKindle,
  FcOk,
  FcPlus,
  FcStackOfPhotos,
  FcVideoCall,
} from "react-icons/fc";
import TimelineEvent from "../../db/TimelineEvent";
import { colors } from "../../theme/colors";

export const WoundSeverityIcon: Record<WoundSeverity, any> = {
  Mild: <FcOk />,
  Moderate: <FcPlus />,
  Severe: <FcHighPriority />,
  Other: <FcInfo />,
};

export const WoundLocationIcon: Record<WoundLocation, any> = {
  Head: <FcDisapprove />,
  Neck: <FcApprove />,
  Chest: <FcApprove />,
  Abdomen: <FcApprove />,
  "Upper Arm": <FcApprove />,
  "Lower Arm": <FcDisclaimer />,
  Hand: <FcDisclaimer />,
  "Upper Leg": <FcApprove />,
  "Lower Leg": <FcDisclaimer />,
  Foot: <FcDisclaimer />,
  Other: <FcDisclaimer />,
};

export const WoundSourceIcon: Record<WoundSource, any> = {
  Infection: <FcDoNotInhale />,
  Burn: <FcDislike />,
  Other: <FcFlashOn />,
};

export const WoundTypeIcon: Record<WoundType, any> = {
  Fracture: <FcApprove />,
  Laceration: <FcApprove />,
  Infection: <FcDoNotInhale />,
  Other: <FcFlashOn />,
};

type EventType =
  | "video"
  | "request"
  | "chat"
  | "checkup"
  | "appointment"
  | "start"
  | "treatment";

export const HandleDotColor: Record<EventType, string> = {
  video: colors.lightmint,
  request: colors.orange,
  chat: colors.mint,
  checkup: colors.pink,
  appointment: colors.limette,
  start: colors.blue,
  treatment: "red",
};

export const HandleEventTypeString: Record<EventType, string> = {
  video: "Video Meeting",
  request: "Request photos",
  chat: "Chat with patient",
  checkup: "Check-up Meeting",
  appointment: "Appointment",
  start: "Start Date",
  treatment: "Treatment!",
};

export const HandleEventTypeIcon: Record<EventType, any> = {
  video: <FcVideoCall />,
  request: <FcStackOfPhotos />,
  appointment: <FcAssistant />,
  chat: <FcKindle />,
  checkup: <FcIdea />,
  start: <FcDisclaimer />,
  treatment: <FcDisclaimer />,
};
