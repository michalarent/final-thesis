import { getStandardDate } from "../../common/util/dates";
import { ConsolidatedWound } from "../../hooks/user/types";
import { ArentFlex, ArentGrid } from "../ui/navigation/layout/ArentGrid";

export default function WoundDataList({ wound }: { wound: ConsolidatedWound }) {
  return (
    <ArentFlex direction="column" align="start" gap={10} width="100%">
      <h4>{wound.woundLocation} Wound</h4>
      <ArentGrid columns="1fr 1fr" gap={2} justify="start" width="100%">
        <small>Severity</small>
        <p>{wound.woundSeverity}</p>
        <small>Size</small>
        <p>{wound.woundSize}</p>
        <small>Source</small>
        <p>{wound.woundSource}</p>
        <small>Stage</small>
        <p>{wound.woundStage}</p>
        <small>Status</small>
        <p>{wound.woundStatus}</p>
        <small>Type</small>
        <p>{wound.woundType}</p>
      </ArentGrid>
    </ArentFlex>
  );
}
