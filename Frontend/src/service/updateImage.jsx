export const updateImage = async (e, setIsLoading) => {
  try {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("images", file);
    setIsLoading(true);
    const response = await fetch("http://localhost:8080/upload", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    setIsLoading(false)
    return data[0] || null
  } catch (error) {
    console.error("Tải ảnh không thành công", error);
  }
};
