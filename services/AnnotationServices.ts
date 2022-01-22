import failwith from "../common/util/failwith";
import { getOrm } from "../db";
import { Annotations } from "../db/Annotations";
import Image from "../db/Image";

export async function getAnnotations(imageId: any) {
  const orm = await getOrm();
  const image = await orm.em.findOne(Image, {
    id: imageId,
  });
  if (!image) {
    failwith("Image not found");
  }
  const annotations = await orm.em.findOne(Annotations, {
    image,
  });
  return annotations;
}

export async function removeAnnotationsFromImage(imageId: any) {
  const orm = await getOrm();
  const image = await orm.em.findOne(Image, {
    id: imageId,
  });
  if (!image) {
    failwith("Image not found");
  }
  const annotations = await orm.em.find(Annotations, {
    image,
  });
  if (annotations.length > 0) {
    await orm.em.remove(annotations);
  }
  return annotations;
}

export async function addAnnotationsToImage(imageId: any, annotations: any) {
  const orm = await getOrm();

  const image = await orm.em.findOne(Image, {
    id: imageId,
  });

  if (!image) {
    failwith("Image not found");
  }

  const oldAnnotations = await orm.em.findOne(Annotations, {
    image,
  });

  if (oldAnnotations) {
    await orm.em.removeAndFlush(oldAnnotations);
  }

  const _annotations = await orm.em.create(Annotations, {
    image,
    data: annotations,
  });

  await orm.em.persistAndFlush(_annotations);

  return _annotations;
}
