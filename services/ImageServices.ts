import failwith from "../common/util/failwith";
import { getOrm } from "../db";
import { Annotations } from "../db/Annotations";
import Image from "../db/Image";
import { Treatment } from "../db/Treatment";

export async function removeImageFromAppointmentImages(
  appointmentId,
  imageUrl
) {
  const orm = await getOrm();

  const id = appointmentId.appointmentId;
  const url = id.imageUrl;

  const image = await orm.em.findOne(Image, {
    url: appointmentId.imageUrl,
  });

  if (!image) {
    failwith("Image not found");
  }

  const annotations = await orm.em.find(Annotations, {
    image,
  });

  await orm.em.removeAndFlush(annotations);
  await orm.em.remove(image);

  return image;
}

export async function addManyImages(woundId: number, imageUrls: string[]) {
  const orm = await getOrm();

  const images = imageUrls.map((url) => {
    const img = orm.em.create(Image, {
      url: url,
      wound: woundId,
    });
    return img;
  });

  const dbImages = await orm.em.persistAndFlush(images);

  return dbImages;
}

export async function getImagesForTreatment(treatmentId) {
  const orm = await getOrm();

  const treatment = await orm.em.findOne(Treatment, {
    id: treatmentId,
  });

  if (!treatment) {
    failwith("Treatment not found");
  }

  // get images with annotations

  const images = await orm.em.find(Image, {
    wound: treatment.wound,
  });

  // join annotations

  const qb = orm.em.createQueryBuilder(Image, "image");

  const imagesWithAnnotations = await qb
    .select("*")
    .where({ id: images.map((i) => i.id) })
    .leftJoinAndSelect("image.annotations", "annotations")
    .getResult();

  return imagesWithAnnotations;
  return images;
}

export async function addImageToWoundImages(woundId, imageUrl) {
  const orm = await getOrm();

  const newImage = orm.em.create(Image, {
    url: imageUrl,
    wound: woundId,
  });

  await orm.em.persistAndFlush(newImage);
  return newImage;
}
