import api from "../api/baseApi";

export const imageService = {
  async uploadImage(file: File) {
    const formData = new FormData();
    formData.append("image", file);
    // Не указываем Content-Type, ky сам выставит multipart boundary
    return api
      .post("upload/image", {
        body: formData,
        timeout: 20000,
      })
      .json();
  },
  async getAllImages() {
    return api
      .get("upload/images", {
        timeout: 10000,
      })
      .json();
  },
  async deleteImage(id: string) {
    return api
      .delete(`upload/image/${id}`, {
        timeout: 10000,
      })
      .json();
  },
  async setBgImage({
    programName,
    imageId,
    imageNumber,
  }: {
    programName: string;
    imageId: string;
    imageNumber: number;
  }) {
    return api
      .post("travel-program/bg-image", {
        json: { programName, imageId, imageNumber },
        timeout: 10000,
      })
      .json();
  },
};
