document.addEventListener("DOMContentLoaded", () => {
    // Palavras e dicas do jogo
    const palavras = [
      { palavra: "Demon Slayer", dica: "Anime" },
      { palavra: "Pequeno Principe", dica: "Livro" },
      { palavra: "Game of Thrones", dica: "Série" },
      { palavra: "Anabelle", dica: "Filme" },
    ];
    const palavraSelecionada = palavras[Math.floor(Math.random() * palavras.length)];
  
    // Variáveis do jogo
    let palavra = palavraSelecionada.palavra.toUpperCase(); // Todas as letras são convertidas para maiúsculas
    let dica = palavraSelecionada.dica;
    let tentativas = 6;
    let palavraOculta = palavra.split("").map(char => (char === " " ? "&nbsp;" : "_")).join("&nbsp;");

  
    // Elementos HTML
    const clueElement = document.querySelector("h3"); // O título que contém a dica
    const wordElement = document.getElementById("palavra-oculta"); // Agora usando o ID
    const buttons = document.querySelectorAll(".btn-secondary"); // Todos os botões com letras
    const gallowsElement = document.querySelector("svg"); // O SVG da forca
    const messageElement = document.querySelector(".message"); // O local onde a mensagem será exibida
  
    // Atualizar a dica e a palavra oculta no início do jogo
    clueElement.textContent = dica;
    wordElement.innerHTML = palavraOculta;
  
    // Função para atualizar a palavra oculta
    function atualizarPalavraOculta(letra) {
      let novaPalavraOculta = "";
      for (let i = 0; i < palavra.length; i++) {
        if (palavra[i] === " ") {
          novaPalavraOculta += "&nbsp;&nbsp;";
        } else if (palavra[i] === letra.toUpperCase()) {
          novaPalavraOculta += letra + "&nbsp;"; // Adiciona a letra e um espaço
        } else {
          novaPalavraOculta += palavraOculta[i * 6] + "&nbsp;"; // Mantém o espaço entre as letras
        }
      }
      
      palavraOculta = novaPalavraOculta.trim();
      wordElement.innerHTML = palavraOculta; // Atualiza a exibição
    }
  
    // Função para verificar se o jogador ganhou
    const verificarVitoria = () => {
      if (!palavraOculta.includes("_")) {
        // Exibe a mensagem de vitória no DOM
        messageElement.textContent = "Parabéns! Você venceu!";
        messageElement.classList.add("win");
        desativarTodosOsBotoes();
      }
    };
  
    // Função para verificar se o jogador perdeu
    const verificarDerrota = () => {
      if (tentativas <= 0) {
        messageElement.textContent = `Você perdeu! A palavra era "${palavra}".`;
        messageElement.classList.add("lose");
        desativarTodosOsBotoes();
      }
    };
  
    // Função para desativar um botão após ser clicado
    const desativarBotao = (botao) => {
      botao.disabled = true;
      botao.classList.add("disabled");
    };
  
    // Função para desativar todos os botões após o jogo acabar
    const desativarTodosOsBotoes = () => {
      buttons.forEach((botao) => {
        botao.disabled = true;
        botao.classList.add("disabled");
      });
    };
  
    // Adicionar evento de clique para os botões das letras
    buttons.forEach((botao) => {
      botao.addEventListener("click", (event) => {
        const letra = event.target.textContent;
  
        if (palavra.toUpperCase().includes(letra)) {
          atualizarPalavraOculta(letra);
  
          // Aguarda a renderização da atualização do DOM antes de verificar a vitória
          requestAnimationFrame(() => {
            verificarVitoria();
          });
        } else {
          tentativas--;
          atualizarGallows();
          verificarDerrota();
        }
  
        desativarBotao(event.target);
      });
    });
  
    // Função para atualizar a forca
    const atualizarGallows = () => {
      const parts = gallowsElement.querySelectorAll("path");
      if (tentativas < parts.length) {
        parts[tentativas].style.display = "block";
      }
    };
  });
  