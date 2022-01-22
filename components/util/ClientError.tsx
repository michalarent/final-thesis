import { CodeSnippet } from "carbon-components-react";
import { Container } from "../ui/Container";
import LayoutBase from "../ui/navigation/layout";
import { ArentFlex } from "../ui/navigation/layout/ArentGrid";

export default function ClientError({ children }) {
  return (
    <LayoutBase title="Error" breadcrumbs={["Error"]}>
      <Container>
        <ArentFlex width="100%" justify="center">
          <CodeSnippet style={{ width: "100%" }} title="Error">
            {children}
          </CodeSnippet>
        </ArentFlex>
      </Container>
    </LayoutBase>
  );
}
