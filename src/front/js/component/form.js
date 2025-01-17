import React, { useState } from "react";
import { Cloudinary } from "@cloudinary/url-gen";
import apiClient from "../api/index.jsx";

const Formulario = ({ titulo, mensaje, fields }) => {
  const [image, setImage] = useState();

  // Cloudinary setup
  const cld = new Cloudinary({
    cloud: {
      cloudName: `${process.env.CLOUDINARY_CLOUD_NAME}`,
      apiKey: `${process.env.CLOUDINARY_API_KEY}`,
      apiSecret: `${process.env.CLOUDINARY_API_SECRET}`,
    },
  });

  // Handle file upload to Cloudinary
  const handleFileUpload = async (file) => {
    setImage(file);
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Extract form data at the beginning
    const formData = {};
    const fileInputs = {};
    fields.forEach((field) => {
      if (field.type === "file") {
        fileInputs[field.name] = event.target[field.name].files[0];
      } else {
        formData[field.name] = event.target[field.name].value;
      }
    });

    // Proceed with the asynchronous operations
    if (fileInputs["comprobanteImg_url"]) {
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", fileInputs["comprobanteImg_url"]);
      cloudinaryFormData.append("upload_preset", "proyectos_images");

      try {
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: cloudinaryFormData,
          }
        );
        const result = await response.json();

        if (result.secure_url) {
          formData["comprobante_image_url"] = result.secure_url;

          const carritoJSON = localStorage.getItem("carrito");
          const carrito = JSON.parse(carritoJSON);
          const data = {
            ...formData,
            carrito,
          };

          try {
            const response = await apiClient.post("/orden", data);
            console.log("Datos enviados exitosamente:", response.data);
            localStorage.removeItem("carrito");
            window.location.href = "/";
          } catch (error) {
            console.error("Error al enviar los datos:", error);
          }
        } else {
          console.error("Error al subir imagen:", result.error.message);
        }
      } catch (error) {
        console.error("Error subiendo imagen a Cloudinary:", error);
      }
    }
  };

  return (
    <div className="form-page">
      <div className="container py-5">
        <h1 className="text-center mb-5">{titulo}</h1>
        <p className="text-center mb-4">{mensaje}</p>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="form-group mb-3">
              <label htmlFor={field.name}>{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                id={field.name}
                className="form-control"
                placeholder={field.placeholder}
                required={field.required}
                accept={field.accept} // For file input
                onChange={
                  field.type === "file"
                    ? (e) => handleFileUpload(e.target.files[0])
                    : null
                }
              />
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Formulario;
