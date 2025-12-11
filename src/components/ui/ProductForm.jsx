import { useState } from "react";

const ProductForm = ({
  initialValues = { nombre: "", descripcion: "", precio: "", avatar: "" },
  onSubmit,
  submitLabel = "Guardar",
  error,
}) => {
  const [nombre, setNombre] = useState(initialValues.nombre);
  const [descripcion, setDescripcion] = useState(initialValues.descripcion);
  const [precio, setPrecio] = useState(initialValues.precio);
  const [avatar, setAvatar] = useState(initialValues.avatar);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      nombre,
      descripcion,
      precio: Number(precio),
      avatar: avatar || "/image.png",
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}

      <div className="mb-3">
        <label className="form-label">Nombre</label>
        <input
          type="text"
          className="form-control"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Descripción</label>
        <textarea
          className="form-control"
          rows="3"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          minLength={10}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Precio</label>
        <input
          type="number"
          className="form-control"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          min="1"
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">URL de imagen</label>
        <input
          type="text"
          className="form-control"
          value={avatar}
          onChange={(e) => setAvatar(e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">
        {submitLabel}
      </button>
    </form>
  );
};

export default ProductForm;