import React, { useState, useEffect, useCallback, useMemo } from 'react';
import styles from './css/Forca.module.css';
import Teclado from './Teclado';
import ThemesDropdownButton from './ThemesDropdownButton';

function Forca() {
    const [palavraOculta, setPalavraOculta] = useState("");
    const [carregando, setCarregando] = useState(true);
    const [temaSelecionado, setTemaSelecionado] = useState("Filmes"); // Estado para o tema selecionado

    // Definindo os temas
    const temas = useMemo(() => ({
        'Animes': ["Demon Slayer", "Jujutsu Kaizen", "One Punch Man", "Chainsaw Man"],
        'Séries': ["Game of Thrones", "Invincible", "Arqueiro", "Ahsoka"],
        'Livros': ["Pequeno Príncipe", "Dom Casmurro"],
        'Filmes': ["Anabelle", "Divertida Mente", "Homem Aranha"],
    }), []);

    // Função para iniciar o jogo
    const iniciarJogo = useCallback((palavraEscolhida, temaSelecionado) => {
        setCarregando(true);
        setPalavraOculta("");

        const palavraOcultaArray = palavraEscolhida.split("").map(char => (char === " " ? "\u00A0" : "_"));
        setPalavraOculta(palavraOcultaArray.join(" "));
        setCarregando(false);

        // Armazena o tema selecionado no localStorage
        localStorage.setItem('temaSelecionado', temaSelecionado);
        setTemaSelecionado(temaSelecionado); // Atualiza o tema selecionado
    }, []);

    // Seleciona uma palavra aleatória do tema
    const gerarNovaPalavra = useCallback((tema) => {
        return temas[tema][Math.floor(Math.random() * temas[tema].length)].toUpperCase();
    }, [temas]);

    // Carregar o tema e a palavra ao montar o componente
    useEffect(() => {
        const temaPadrao = localStorage.getItem('temaSelecionado') || 'Filmes';
        const palavraSelecionada = gerarNovaPalavra(temaPadrao);
        iniciarJogo(palavraSelecionada, temaPadrao);
        console.log(temaPadrao, palavraSelecionada);
        
    }, [gerarNovaPalavra, iniciarJogo]);

    return (
        <div className={styles.myContainer}>
            <nav className="navbar navbar-expand-md bg-light">
                <div className="container d-flex justify-content-between align-items-center">
                    <h1 className="mb-0">Jogo da Forca</h1>
                    <div>
                        <ThemesDropdownButton
                            iniciarJogo={iniciarJogo}
                            gerarNovaPalavra={gerarNovaPalavra}
                            temas={temas}
                            temaSelecionado={temaSelecionado}
                        />
                    </div>
                </div>
            </nav>

            <div className={`container ${styles.secretWord}`}>
                <span>{carregando ? (
                    <p>Buscando Palavra...</p>
                ) : (
                    palavraOculta
                )}</span>
            </div>

            <div className={`text-center ${styles.myKeyboard}`}>
                <div id="message"></div>
                <Teclado />
                <div className="text-center mt-3">
                    <button 
                        className={styles.btn}
                        onClick={() => {
                            const novaPalavra = gerarNovaPalavra(temaSelecionado);
                            iniciarJogo(novaPalavra, temaSelecionado);
                        }}
                    >
                        Nova Palavra
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Forca;
