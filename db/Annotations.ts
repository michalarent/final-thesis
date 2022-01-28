import {
  Entity,
  IdentifiedReference,
  OneToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import Image from "./Image";

@Entity()
export class Annotations {
  @PrimaryKey()
  id!: number;

  @Property({ type: "jsonb" })
  data!: Record<string, any>;

  @OneToOne({ entity: () => Image }, (image) => image.annotations, {
    wrappedReference: true,
  })
  image!: IdentifiedReference<Image>;
}
