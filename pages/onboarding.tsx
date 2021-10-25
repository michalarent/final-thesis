import { CircularProgress } from "@material-ui/core";
import LayoutBase from "../components/ui/navigation/layout";
import { useUser } from "../hooks/user";
import AutoForm from "../components/ui/forms/AutoForm";
import ScrollingForm from "../components/ui/forms/ScrollingForm";
import Card from "../components/ui/Card";

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
      {/* <div
        style={{
          position: "absolute",
          left: "calc(52% - 160px)",
          top: "10%",
        }}
      >
        <img
          src="/wrapit2.png"
          style={{
            height: "80px",
          }}
        />
        <img
          src="https://sklep.pja.edu.pl/wp-content/uploads/2017/03/PJATK_shop-1.png"
          style={{
            paddingLeft: "30px",
            height: "80px",
          }}
        />
      </div> */}

      <ScrollingForm multi />
    </div>
  );
}
