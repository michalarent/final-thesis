import failwith from "../common/util/failwith";
import { getOrm } from "../db";
import { Annotations } from "../db/Annotations";
import Image from "../db/Image";

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

export async function addImageToAppointmentImages(appointmentId, imageUrl) {
  const orm = await getOrm();

  const newImage = orm.em.create(Image, {
    url: imageUrl,
    appointment: appointmentId,
  });

  await orm.em.persistAndFlush(newImage);
  return newImage;
}
