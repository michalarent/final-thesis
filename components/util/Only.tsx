import ClientError from "./ClientError";

export function OnlyDoctor({ children, isDoctor }) {
  if (isDoctor) {
    return children;
  }
  return <ClientError>You are not authorized to view this page.</ClientError>;
}

export function OnlyPatient({ children, isPatient }) {
  if (isPatient) {
    return children;
  }
  return <ClientError>You are not authorized to view this page.</ClientError>;
}
