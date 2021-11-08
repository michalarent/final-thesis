import ScrollingForm from "../components/ui/forms/ScrollingForm";
import { WoundFormInput } from "../data/general/woundform";

export default function WoundForm() {
  return <ScrollingForm multi data={WoundFormInput} />;
}
