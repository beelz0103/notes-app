export function createFormData({ title, content, images, labels }) {
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
    formData.append("file", images[i].file);
  }
  formData.append("title", title);
  formData.append("content", content);
  formData.append("labels", JSON.stringify(labels));

  return formData;
}
