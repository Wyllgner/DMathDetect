import { useState, useEffect } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";

export default function Carousel({ slides, captions }) {
  const [current, setCurrent] = useState(0);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Atualiza as dimensões da imagem atual
  useEffect(() => {
    const img = new Image();
    img.src = slides[current];
    img.onload = () => {
      setDimensions({ width: img.naturalWidth, height: img.naturalHeight });
    };
  }, [current, slides]);

  const previousSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      className="overflow-hidden relative rounded-lg flex flex-col"
      style={{ width: `${dimensions.width}px`, height: `${dimensions.height + 100}px` }} // +100 para acomodar o texto/captions
    >
      <div
        className="flex transition ease-out duration-500"
        style={{
          transform: `translateX(-${current * 100}%)`,
          height: `${dimensions.height}px`,
        }}
      >
        {slides.map((s, index) => (
          <img
            key={index}
            src={s}
            alt={`Slide ${index}`}
            className="object-cover flex-none"
            style={{
              width: `${dimensions.width}px`,
              height: `${dimensions.height}px`,
            }}
          />
        ))}
      </div>

      {/* Botões de Navegação */}
      <div className="absolute top-0 h-full w-full justify-between items-center flex z-10 text-white px-2 text-3xl">
        <button onClick={previousSlide}>
          <FaArrowCircleLeft />
        </button>
        <button onClick={nextSlide}>
          <FaArrowCircleRight />
        </button>
      </div>

      {/* Indicadores */}
      <div className="absolute top-0 py-4 flex justify-center gap-2 w-full">
        {slides.map((_, i) => (
          <div
            onClick={() => setCurrent(i)}
            key={`circle${i}`}
            className={`rounded-full w-3 h-3 cursor-pointer ${
              i === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>

      {/* Texto (Captions) */}
      <div className="bottom-0 w-full bg-white py-2 justify-center items-center flex text-justify text-xs p-6">
        <p>{captions[current]}</p>
      </div>
    </div>
  );
}