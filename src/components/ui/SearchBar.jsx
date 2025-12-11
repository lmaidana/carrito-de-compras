
import styled from "styled-components";

const SearchWrapper = styled.form`
  display: grid;
  grid-template-columns: 1fr 220px;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;

  @media (max-width: 576px) {
    grid-template-columns: 1fr;
  }
`;

const Input = styled.input`
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #ced4da;
  font-size: 1rem;
  &:focus { outline: none; border-color: #0d6efd; box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, .25); }
`;

const Select = styled.select`
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid #ced4da;
  font-size: 1rem;
  &:focus { outline: none; border-color: #0d6efd; box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, .25); }
`;

export default function SearchBar({
  query,
  category,
  categories = [],
  onQueryChange,
  onCategoryChange,
}) {
  return (
    <SearchWrapper
      role="search"
      aria-label="Buscar productos"
      onSubmit={(e) => e.preventDefault()}  
    >
      <div>
        <label htmlFor="searchQuery" className="visually-hidden">Buscar por nombre</label>
        <Input
          id="searchQuery"
          type="search"
          placeholder="Buscar por nombre…"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          aria-label="Buscar por nombre"
          autoComplete="off"
        />
      </div>

      <div>
        <label htmlFor="searchCategory" className="visually-hidden">Filtrar por categoría</label>
        <Select
          id="searchCategory"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          aria-label="Filtrar por categoría"
        >
          <option value="">Todas las categorías</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </Select>
      </div>
    </SearchWrapper>
  );
}
