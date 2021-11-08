import { CircularProgress } from "@material-ui/core";
import LayoutBase from "../components/ui/navigation/layout";
import { useUser } from "../hooks/user";
import AutoForm from "../components/ui/forms/AutoForm";
import ScrollingForm from "../components/ui/forms/ScrollingForm";
import Card from "../components/ui/Card";
import { GeneralFormInput } from "../data/general/general";

export default function Onboarding() {
  const user = useUser();

  return (
    <div
      style={{
        gridColumn: "span 2",
        margin: "auto",
        background: "linear-gradient(to top, #f0f0f073, #ffffff)",
      }}
    >
      <ScrollingForm multi data={GeneralFormInput} />
    </div>
  );
}
