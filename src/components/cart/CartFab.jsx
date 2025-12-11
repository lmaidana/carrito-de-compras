import styled, { keyframes } from "styled-components";
import { useEffect, useState } from "react";

const bounce = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.3); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 0px rgba(255,255,255,0.8); }
  50% { box-shadow: 0 0 12px rgba(255,255,255,0.9); }
  100% { box-shadow: 0 0 0px rgba(255,255,255,0.8); }
`;

const Fab = styled.button`
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 999px;
  z-index: 1100;
  box-shadow: 0 6px 20px rgba(0,0,0,.2);
  padding: 0;
  border: 2px solid transparent;
  background: #0d6efd;
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  i {
    font-size: 1.3rem;
    transition: transform 0.3s ease;
    &.animate {
      animation: ${bounce} 0.4s ease;
    }
  }

  @media (min-width: 992px) {
    width: 4rem;
    height: 4rem;
    i { font-size: 1.8rem; }
  }
`;

const FabInner = styled.span`
  position: relative;   
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &.glow {
    animation: ${glow} 0.6s ease;
    border-radius: 50%;
  }
`;

export default function CartFab({ totalItems = 0 }) {
  const [animate, setAnimate] = useState(false);
  const [glowEffect, setGlowEffect] = useState(false);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      setGlowEffect(true);

      const timer1 = setTimeout(() => setAnimate(false), 400);
      const timer2 = setTimeout(() => setGlowEffect(false), 600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [totalItems]);

  return (
    <Fab
      type="button"
      id="cartFab"
      data-bs-toggle="offcanvas"
      data-bs-target="#cartOffcanvas"
      aria-controls="cartOffcanvas"
      aria-label="Abrir carrito"
    >
      <FabInner className={glowEffect ? "glow" : ""}>
        <i className={`bi bi-cart ${animate ? "animate" : ""}`} aria-hidden="true" />
        {totalItems > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {totalItems}
            <span className="visually-hidden">Ítems en el carrito</span>
          </span>
        )}
      </FabInner>
    </Fab>
  );
}