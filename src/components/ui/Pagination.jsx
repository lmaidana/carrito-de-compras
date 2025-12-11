
import styled from "styled-components";
import clsx from "clsx";

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`;

const List = styled.ul`
  display: inline-flex;
  gap: .25rem;
  list-style: none;
  padding: 0;
  margin: 0;
`;

const Item = styled.li``;

const Btn = styled.button`
  min-width: 2.25rem;
  height: 2.25rem;
  padding: 0 .5rem;
  border-radius: 6px;
  border: 1px solid #ced4da;
  background: #fff;
  color: #212529;
  cursor: pointer;
  transition: background-color .15s ease, border-color .15s ease;

  &:hover { background: #f8f9fa; }
  &:disabled {
    cursor: not-allowed;
    opacity: .6;
  }

  &.is-active {
    background: #0d6efd;
    border-color: #0d6efd;
    color: #fff;
    font-weight: 600;
  }
`;

export default function Pagination({
  page,
  totalPages,
  onChange,
  maxNumbers = 5,
}) {
  if (totalPages <= 1) return null;

  const half = Math.floor(maxNumbers / 2);
  let start = Math.max(1, page - half);
  let end   = Math.min(totalPages, start + maxNumbers - 1);
  start = Math.max(1, end - maxNumbers + 1);

  const goFirst = () => onChange(1);
  const goPrev  = () => onChange(Math.max(1, page - 1));
  const goNext  = () => onChange(Math.min(totalPages, page + 1));
  const goLast  = () => onChange(totalPages);

  const numbers = [];
  for (let p = start; p <= end; p++) numbers.push(p);

  return (
    <Nav role="navigation" aria-label="Paginación">
      <List>
        <Item>
          <Btn type="button" onClick={goFirst} disabled={page === 1} aria-label="Primera página">«</Btn>
        </Item>
        <Item>
          <Btn type="button" onClick={goPrev} disabled={page === 1} aria-label="Página anterior">‹</Btn>
        </Item>

        {numbers.map((p) => (
          <Item key={p}>
            <Btn
              type="button"                       
              onClick={() => onChange(p)}
              className={clsx({ "is-active": p === page })}
              aria-label={`Ir a página ${p}`}
              aria-current={p === page ? "page" : undefined}
            >
              {p}
            </Btn>
          </Item>
        ))}

        <Item>
          <Btn type="button" onClick={goNext} disabled={page === totalPages} aria-label="Página siguiente">›</Btn>
        </Item>
        <Item>
          <Btn type="button" onClick={goLast} disabled={page === totalPages} aria-label="Última página">»</Btn>
        </Item>
      </List>
    </Nav>
  );
}
