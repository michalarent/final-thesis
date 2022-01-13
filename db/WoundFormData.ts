import {
  Entity,
  IdentifiedReference,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import {
  WoundLocation,
  WoundSeverity,
  WoundSize,
  WoundSource,
  WoundStage,
  WoundStatus,
  WoundType,
} from "../data/types";
import { Wound } from "./Wound";

@Entity()
export default class WoundFormData {
  @PrimaryKey()
  id!: number;

  @OneToOne({ entity: () => Wound }, (wound) => wound.woundData, {
    wrappedReference: true,
  })
  wound!: IdentifiedReference<Wound>;

  @Property({ type: "string" })
  woundType: WoundType;

  @Property({ type: "string" })
  woundLocation: WoundLocation;

  @Property({ type: "string" })
  woundSize: WoundSize;

  @Property({ type: "string" })
  woundStage: WoundStage;

  @Property({ type: "string" })
  woundStatus: WoundStatus;

  @Property({ type: "string" })
  woundSeverity: WoundSeverity;

  @Property({ type: "string" })
  woundSource: WoundSource;
}
