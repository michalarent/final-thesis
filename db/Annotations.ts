import {
  Entity,
  IdentifiedReference,
  OneToOne,
  PrimaryKey,
} from "@mikro-orm/core";
import Image from "./Image";

@Entity()
export class Annotations {
  @PrimaryKey()
  id!: number;

  @OneToOne({ entity: () => Image }, (image) => image.annotations, {
    wrappedReference: true,
  })
  patient!: IdentifiedReference<Image>;
}
