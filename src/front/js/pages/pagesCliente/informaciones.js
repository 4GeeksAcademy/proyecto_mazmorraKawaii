import React from 'react';
import '../../../styles/informaciones.css';

const Informaciones = () => {
  return (
    <div className="informaciones-page">
      <div className="container py-5">
        <h1 className="text-center mb-5">Informaciones</h1>

        <div className="row mb-4">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Quiénes somos</h2>
                <p className="card-text">
                  En Mazmorra Kawaii, creemos que los juegos tienen el poder de unir a las personas, despertar la creatividad y, sobre todo, hacer la vida más feliz. Somos una tienda online en crecimiento especializada en juegos de mesa clásicos, manuales de rol y kits de inicio para cartas TCG.
                  <br />
                  <br />
                  Nuestro objetivo es ofrecerte una selección cuidadosamente curada de productos que despierten la nostalgia y abran la puerta a nuevas aventuras. Ya sea para compartir risas en familia, sumergirte en épicas historias de rol o dar tus primeros pasos en el mundo de los juegos de cartas, estamos aquí para acompañarte.
                  <br />
                  <br />
                  Porque jugar no es solo un pasatiempo, es una forma de conectarnos y celebrar la alegría de estar juntos. Bienvenido a nuestra comunidad de apasionados por los juegos. ¡Juguemos juntos! ✨
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Preguntas Frecuentes</h2>
                <div className="accordion">
                  {/* Pregunta 1 */}
                  <div className="accordion-item">
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#pregunta1"
                      >
                        ¿Cómo funciona nuestra modalidad de compra?
                      </button>
                    </h3>
                    <div id="pregunta1" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        Sigue estos sencillos pasos:
                        <br /><br />
                        <b>Explora y selecciona:</b> Navega por nuestra colección de juegos de mesa, manuales de rol y kits de cartas TCG. Encuentra los productos que te encantan y agrégalos a tu carrito de compras.
                        <br /><br />
                        <b>Revisa tu carrito:</b> Una vez que tengas todo lo que necesitas, dirígete al carrito para confirmar tu selección.
                        <br /><br />
                        <b>Realiza el pago, manda tu comprobante y completa tus datos:</b> Por ahora trabajamos mediante transferencias bancarias, una vez realices tu pago deberás guardar tu comprobante y enviárnoslo, además deberás poner tus datos para el envío, por nuestro lado revisaremos si está todo en orden lo antes que podamos y una vez confirmemos todo realizaremos el envío!
                        <br /><br />
                        
                        Nuestro sistema es tan fácil como pagarle a un amigo! y como nos importas, nos encargaremos de gestionar tu pedido lo antes posible para que empieces a disfrutar!
                        <br /><br />
                        ¡Gracias por elegirnos para llevar la diversión a tu hogar! 🎲✨
                      </div>
                    </div>
                  </div>
                  {/* Pregunta 2 */}
                  <div className="accordion-item">
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#pregunta2"
                      >
                        ¿Cómo funcionan los envíos?
                      </button>
                    </h3>
                    <div id="pregunta2" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        En Mazmorra Kawaii, trabajamos con una empresa de envíos externa para asegurarnos de que tu pedido llegue de manera segura y a tiempo. Esto es lo que necesitas saber:
                        <br /><br />
                        <b>Envíos por pagar:</b> El costo del envío dependerá de tu ubicación y se pagará al momento de recibir el paquete.
                        <br /><br />
                        <b>Procesamiento del pedido:</b> Una vez que hayas completado tu compra y el pago esté confirmado, procesaremos tu pedido.
                        <br /><br />
                        <b>Plazo de despacho:</b> Contamos con un máximo de 3 días hábiles para llevar tu paquete a la sucursal de envíos.
                        <br /><br />
                        <b>Entrega en tu puerta:</b> El tiempo de entrega dependerá de la empresa de envíos y la distancia hasta tu domicilio.
                        <br /><br />
                        Queremos que disfrutes tus juegos lo antes posible, por lo que hacemos todo lo posible para agilizar el proceso.
                      </div>
                    </div>
                  </div>
                  {/* Pregunta 3 */}
                  <div className="accordion-item">
                    <h3 className="accordion-header">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#pregunta3"
                      >
                        Cambios y devoluciones
                      </button>
                    </h3>
                    <div id="pregunta3" className="accordion-collapse collapse">
                      <div className="accordion-body">
                        En Mazmorra Kawaii, no realizamos cambios ni devoluciones. Sin embargo, estamos comprometidos con tu satisfacción y siempre buscamos soluciones.
                        <br /><br />
                        Si tienes algún problema con tu pedido, ¡no te preocupes! Contáctanos con confianza y evaluaremos tu caso para encontrar la mejor manera de ayudarte. Estamos aquí para asegurarnos de que disfrutes al máximo tu experiencia con nuestros productos.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row text-center mt-4">
          <div className="col">
            <p className="fst-italic">
              Recuerda: Si tienes dudas o algún problema, puedes contactarnos mediante contacto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Informaciones;
