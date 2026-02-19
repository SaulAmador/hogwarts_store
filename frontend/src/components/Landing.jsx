import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

// Registramos el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Componente Landing
export default function Landing() {
  const navigate = useNavigate();
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [characters, setCharacters] = useState([]);

  // Fetch de personajes de la HP-API (Requisito 4Geeks)
  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then(res => res.json())
      .then(data => {
        // Tomamos solo los primeros 8 personajes con imagen
        const withImages = data.filter(char => char.image).slice(0, 8);
        setCharacters(withImages);
      })
      .catch(err => console.error("Error cargando personajes:", err));
  }, []);

  // Animacion del hero y features
  useEffect(() => {
    const setupAnimations = () => {
      // Navbar aparece al hacer scroll
      gsap.to(".navbar", {
        opacity: 1,
        pointerEvents: "all",
        scrollTrigger: {
          trigger: ".hero-sticky",
          start: "bottom top",
          toggleActions: "play none none reverse",
        }
      });

      // Morphing del hero 
      gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-sticky",
          start: "top top",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        }
      })
        .to(".hero-sticky", {
          height: "70px",
          backgroundColor: "rgba(15, 15, 26, 0.95)",
          backdropFilter: "blur(10px)",
          borderBottom: "1px solid rgba(255, 204, 0, 0.3)",
          ease: "none"
        })
        .to(".landing-title", { fontSize: "2rem", y: 0, ease: "none" }, 0)
        .to(".hero-subtitle, .landing-btn, .hero-video, .hero-overlay", {
          opacity: 0,
          pointerEvents: "none",
          ease: "none"
        }, 0);

      // SECCIONES HORIZONTALES
      document.querySelectorAll(".horizontal-section").forEach((section) => {
        const container = section.querySelector(".horizontal-container");
        const scrollAmount = container.scrollWidth - window.innerWidth;

        if (scrollAmount > 0) {
          gsap.to(container, {
            x: -scrollAmount,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              pin: true,
              scrub: 1,
              start: "top top",
              end: () => `+=${scrollAmount}`,
              invalidateOnRefresh: true,
            },
          });
        }
      });

      // Animación de Cards 
      gsap.from(".feature-card", {
        opacity: 0,
        y: 30,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".features",
          start: "top 85%",
          end: "bottom 40%",
          scrub: true,
        },
      });
    };

    // Inicializamos la animacion
    const timer = setTimeout(() => {
      setupAnimations();
      ScrollTrigger.refresh();
    }, 100);

    // Limpiamos la animacion al desmontar el componente
    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, []);

  // Smooth scroll para los links
  useEffect(() => {
    const handleClick = (e) => {
      const href = e.target.getAttribute("href");
      if (href?.startsWith("#")) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener("click", handleClick);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);

  const toggleMusic = () => {
    const audio = document.getElementById("bg-music");
    if (musicPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setMusicPlaying(!musicPlaying);
  };

  return (
    <main>
      {/* Audio de fondo */}
      <audio id="bg-music" loop>
        <source src="/harry-potter-theme.mp3" type="audio/mpeg" />
      </audio>

      {/* Boton de musica flotante */}
      <button
        className="music-btn-float"
        onClick={toggleMusic}
        title={musicPlaying ? "Detener música" : "Reproducir música"}
      >
        {musicPlaying ? "⏸️" : "▶️"}
      </button>

      {/* Navbar */}
      <Navbar isLanding={true} />

      {/* Hero Section */}
      <div className="hero-sticky">
        <video
          className="hero-video"
          src="/hogwartsvideo.mp4"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="hero-overlay"></div>

        <header className="hero-header">
          <h1 className="landing-title">Hogwarts Store</h1>
          <p className="hero-subtitle">Tu viaje mágico comienza aquí...</p>
          <button className="landing-btn" onClick={() => navigate("/login")}>
            Iniciar Viaje
          </button>
        </header>
      </div>

      {/* Sección horizontal de hechizos */}
      <section id="hechizos" className="horizontal-section hechizos">
        <div className="horizontal-container">
          <div className="horizontal-item intro-item">
            <div>
              <h2 className="section-title">Hechizos ✨</h2>
              <p className="section-text">
                Descubre los encantamientos más icónicos del mundo mágico
              </p>
            </div>
          </div>

          <div className="horizontal-item spell-card">
            <img src="/hechizos/alohomora.jpg" alt="Alohomora" />
            <h3>Alohomora</h3>
            <p>
              Utilizado para abrir puertas y desbloquear cerraduras,
              especialmente útil en situaciones de intrusión o exploración
            </p>
          </div>

          <div className="horizontal-item spell-card">
            <img src="/hechizos/imperio.jpg" alt="Imperio" />
            <h3>Imperio</h3>
            <p>
              El hechizo Imperio (también conocido como Maldición Imperius) es
              uno de los tres Maleficios Imperdonables
            </p>
          </div>

          <div className="horizontal-item spell-card">
            <img src="/hechizos/patronus.jpg" alt="Patronus" />
            <h3>Patronus</h3>
            <p>
              El Patronus corpóreo refleja la personalidad del mago y suele
              adoptar la forma de un animal significativo.
            </p>
          </div>
        </div>
      </section>

      {/* Sección vertical de contenido, sección de historia de los hechizos */}
      <section className="vertical-section">
        <h2 className="vertical-title">Historia de los hechizos</h2>
        <p className="vertical-text">
          En los albores del tiempo, cuando la magia aún era un susurro en el
          viento, los primeros hechizos nacieron del lenguaje secreto de las
          estrellas. Los sabios observaban el cielo y descubrían que cada
          constelación guardaba un poder: unas ofrecían luz, otras sombra, y
          algunas el misterio del cambio. Los hechizos no eran simples palabras,
          sino acuerdos con la naturaleza. El fuego respondía al llamado de
          quienes lo respetaban, el agua se dejaba guiar por corazones puros, y
          la tierra otorgaba fuerza a quienes caminaban con humildad. Con el
          paso de los siglos, los magos comenzaron a registrar estos pactos en
          pergaminos encantados. Así surgieron los grimorios, libros que no solo
          contenían fórmulas, sino también advertencias: “Un hechizo no es
          poder, sino responsabilidad”.
        </p>
      </section>

      {/* Otra seccion con imagen y texto */}
      <section className="vertical-section alternate">
        <img
          src="/hechizos/hogwarts-library.jpg"
          alt="Libreria de Hogwarts"
          className="vertical-image"
        />
        <p className="vertical-text">
          La biblioteca de Hogwarts es un lugar mágico lleno de hechizos
          fascinantes y misteriosos...
        </p>
      </section>

      {/* Sección horizontal de pociones */}
      <section id="pociones" className="horizontal-section pociones">
        <div className="horizontal-container">
          <div className="horizontal-item intro-item">
            <div>
              <h2 className="section-title">
                Pociones
                <img src="/icons/caldera.png"
                  alt="Caldera"
                  className="icon" />
              </h2>
              <p className="section-text">
                Descubre los ingredientes más icónicos del mundo mágico
              </p>
            </div>
          </div>

          <div className="horizontal-item spell-card">
            <img src="/pociones/amortentia.jpg" alt="Amortentia" />
            <h3>Amortentia</h3>
            <p>
              No crea amor real, pero produce un fuerte encaprichamiento u
              obsesión. Lo mas curioso de esta pocion es su sorprendente aroma,
              diferente para cada persona.
            </p>
          </div>

          <div className="horizontal-item spell-card">
            <img src="/pociones/crecehueso.jpg" alt="Crece huesos" />
            <h3>Crece huesos</h3>
            <p>
              La poción se utiliza para restaurar por completo los huesos.
              Es especialmente dolorosa de beber, y el proceso de regeneración de huesos enteros es lento y
              puede durar hasta un día entero.
            </p>
          </div>

          <div className="horizontal-item spell-card">
            <img src="/pociones/veritaserum.jpg" alt="Veritaserum" />
            <h3>Veritaserum</h3>
            <p>
              Obliga a quien lo bebe a responder con total sinceridad a cualquier
              pregunta, revelando sus secretos más íntimos.
              Se dice que con solo tres gotas es suficiente para lograr este efecto.
            </p>
          </div>
        </div>
      </section>

      {/* Sección horizontal de personajes (API Externa) */}
      <section id="personajes" className="horizontal-section personajes">
        <div className="horizontal-container">
          <div className="horizontal-item intro-item">
            <div>
              <h2 className="section-title">
                Personajes
                <img src="/icons/escudo.png" alt="Escudo" className="icon" />
              </h2>
              <p className="section-text">
                Conoce a las leyendas que habitan los pasillos de Hogwarts (Datos reales de HP-API)
              </p>
            </div>
          </div>

          {characters.map((char, index) => (
            <div key={index} className="horizontal-item char-card">
              <img src={char.image} alt={char.name} />
              <h3>{char.name}</h3>
              <p>Casa: {char.house || "Desconocida"}</p>
              <p>Actor: {char.actor}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sección vertical de contenido, sección de historia de las pociones */}
      <section className="vertical-section">
        <h2 className="vertical-title">Pociones</h2>
        <p className="vertical-text">
          Antes de que existieran las varitas, las pociones eran pactos líquidos
          destilados del rocío estelar y la raíz profunda. No se cocinaban, se
          negociaban con el fuego; cada burbuja era un latido de la tierra
          aceptando fundirse con el deseo del mago. Al embotellar un brebaje,
          el sabio no solo guardaba líquido, sino un fragmento de naturaleza
          viva que, al ser bebido, transformaba la sangre en magia pura,
          recordándonos que el verdadero poder no se grita, se bebe con
          respeto.
        </p>
      </section>

      {/* Otra seccion con imagen y texto */}
      <section className="vertical-section alternate">
        <img
          src="/pociones/pocionesmueble.jpg"
          alt="Estantería de Pociones"
          className="vertical-image"
        />
        <p className="vertical-text">
          Cada frasco en la estantería es un universo embotellado:
          una gota puede reconstruir el cuerpo desde el olvido o desnudar el alma con la claridad del cristal.
          En este arte, el error no es un fallo, es una sentencia, pues quien domina el caldero no solo altera la materia, sino que gobierna el flujo mismo de la vida y la muerte.
        </p>
      </section>

      {/* Sección horizontal de objetos */}
      <section id="objetos" className="horizontal-section hechizos">
        <div className="horizontal-container">
          <div className="horizontal-item intro-item">
            <div>
              <h2 className="section-title">
                Objetos
                <img src="/icons/libro.png"
                  alt="Libro"
                  className="icon" />
              </h2>
              <p className="section-text">
                "Desde las sombras del Bosque Prohibido hasta tu baúl: objetos que desafían la lógica."
              </p>
            </div>
          </div>

          <div className="horizontal-item spell-card">
            <img src="/objetos/varitadesauco.jpg" alt="Varita de Saúco" />
            <h3>Varita de Saúco</h3>
            <p>
              Es la varita más poderosa jamás fabricada.
              Está hecha de madera de saúco y su núcleo es un pelo de cola de
              Thestral, una sustancia que solo pueden ver aquellos que han
              presenciado la muerte.
            </p>
          </div>

          <div className="horizontal-item spell-card">
            <img src="/objetos/ninbus.jpg" alt="Ninbus" />
            <h3>Ninbus</h3>
            <p>
              Aunque luego fue superada por la Nimbus 2001 y la Saeta de Fuego, sigue siendo un ícono de fiabilidad y prestigio en el campo
            </p>
          </div>

          <div className="horizontal-item spell-card">
            <img src="/objetos/giratiempos.jpg" alt="Gira-Tiempo" />
            <h3>Gira-Tiempo</h3>
            <p>
              "Domina tus horas, no tus errores.
              El tiempo es un regalo, úsalo con precisión."
            </p>
          </div>
        </div>
      </section>

      {/* Sección vertical de contenido, sección de historia de las pociones */}
      <section className="vertical-section">
        <h2 className="vertical-title">Objetos</h2>
        <p className="vertical-text">
          Al portar un artefacto, no llevas un accesorio, sino un pacto físico que respira contigo;
          un amuleto que guarda el tiempo o una vara que canaliza el rayo.
          Son extensiones del alma que nos recuerdan que la magia no solo reside en la sangre,
          sino en la capacidad de otorgar propósito a la materia,
          entendiendo que un objeto no es poder, sino una alianza eterna entre la intención y la forma.
        </p>
      </section>

      {/* Otra seccion con imagen y texto */}
      <section className="vertical-section alternate">
        <img
          src="/objetos/tienda.jpg"
          alt="Tienda de objetos mágicos"
          className="vertical-image"
        />
        <p className="vertical-text">
          Cada objeto en nuestro inventario es un destino esperando a ser reclamado:
          una varita puede canalizar la tormenta definitiva,
          o un Gira-tiempos puede reescribir un fracaso en una victoria.
        </p>
      </section>

      {/* Footer */}
      <footer id="perfil">
        <div className="footer-content">
          {/* Logo o título */}
          <img src="/icons/escudo.png" alt="Hogwarts Store Logo" className="footer-logo" />

          {/* Links rápidos */}
          <nav className="footer-links">
            <a href="/hechizos" target="_blank" rel="noopener noreferrer">Hechizos ✨</a>
            <a href="/pociones" target="_blank" rel="noopener noreferrer">Pociones 🧪</a>
            <a href="/objetos" target="_blank" rel="noopener noreferrer">Objetos Mágicos 📜</a>
            <a href="/carrito" target="_blank" rel="noopener noreferrer">Mi Carrito 🛒</a>
            <a href="/perfil" target="_blank" rel="noopener noreferrer">Perfil de Mago/Bruja</a>
          </nav>

          {/* Derechos reservados */}
          <p className="footer-copy">
            © 2026 Hogwarts Store. Todos los derechos reservados. ⚡
          </p>
        </div>
      </footer>
    </main>
  );
};