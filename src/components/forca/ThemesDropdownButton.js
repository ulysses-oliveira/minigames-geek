import React, { useState, useEffect } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './css/Forca.module.css';

function ThemesDropdownButton({ iniciarJogo, gerarNovaPalavra, temas, temaSelecionado }) {
  const [selectedOption, setSelectedOption] = useState(temaSelecionado);

  // Quando o dropdown é selecionado
  const handleSelect = (eventKey) => {
    setSelectedOption(eventKey);
    const novaPalavra = gerarNovaPalavra(eventKey);
    iniciarJogo(novaPalavra, eventKey);
  };

  // Atualiza o tema selecionado quando a prop temaSelecionado muda
  useEffect(() => {
    setSelectedOption(temaSelecionado);
  }, [temaSelecionado]);

  return (
    <DropdownButton
      title={selectedOption}
      onSelect={handleSelect}
      className={styles.dropdownButton}
    >
      {Object.keys(temas).map((item) => (
        <Dropdown.Item
          key={item}
          eventKey={item}
          className={`${styles.dropdownItem} ${selectedOption === item ? styles.dropdownItemActive : ''}`}
        >
          {item}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
}

export default ThemesDropdownButton;
