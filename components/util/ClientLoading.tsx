import { CodeSnippet, Loading } from "carbon-components-react";
import { Container } from "../ui/Container";
import LayoutBase from "../ui/navigation/layout";
import { ArentFlex } from "../ui/navigation/layout/ArentGrid";

export default function ClientLoading() {
  return (
    <LayoutBase loading={true} title="Loading" breadcrumbs={["Loading..."]}>
      <Container>
        <ArentFlex width="100%" justify="center">
          <Loading />
        </ArentFlex>
      </Container>
    </LayoutBase>
  );
}
