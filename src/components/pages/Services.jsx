import { useContext } from "react";
import { Helmet } from "react-helmet";
import { ThemeContext } from "../../context/ThemeContext";

const Services = () => {
  const { theme, toogleTheme } = useContext(ThemeContext);

  return (
    <div className="container mt-4">
      <Helmet>
        <title>Servicios | Mi Tienda</title>
        <meta
          name="description"
          content="Descubre los servicios que ofrecemos en Mi Tienda para mejorar tu experiencia de compra."
        />
        <meta name="keywords" content="servicios, tienda, soporte, beneficios" />
      </Helmet>

      <h1>Servicios</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod,
        urna eu tincidunt consectetur, nisi nisl lacinia mi, nec fermentum justo
        sapien at sapien. Integer vel turpis nec justo tincidunt tincidunt.
        Curabitur ac orci vitae nulla facilisis tincidunt. Suspendisse potenti.
        Fusce ut sapien nec justo efficitur tincidunt. Pellentesque habitant
        morbi tristique senectus et netus et malesuada fames ac turpis egestas.
      </p>
      <p>
        Praesent vitae eros eget tellus tristique bibendum. Donec rutrum sed sem
        quis venenatis. Proin viverra risus a eros volutpat tempor. In quis arcu
        et eros porta lobortis sit amet at magna. Sed nec diam eu diam mattis
        viverra. Nulla fringilla, orci ac euismod semper, magna diam porttitor
        mauris, quis sollicitudin sapien justo in libero.
      </p>
    </div>
  );
};

export default Services;