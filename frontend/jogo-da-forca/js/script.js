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
  let palavra = palavraSelecionada.palavra.toUpperCase(); // Convertendo para maiúsculas
  let dica = palavraSelecionada.dica;
  let tentativas = 6;
  let palavraOculta = palavra.split("").map(char => (char === " " ? " " : "_"));

  // Elementos HTML
  const clueElement = document.querySelector("h3");
  const wordElement = document.getElementById("palavra-oculta");
  const buttons = document.querySelectorAll(".btn-secondary");
  const gallowsElement = document.querySelector("svg");
  const messageElement = document.querySelector(".message");

  // Atualizar a dica e a palavra oculta no início do jogo
  clueElement.textContent = dica;
  wordElement.innerHTML = palavraOculta.join("&nbsp;");

  // Função para atualizar a palavra oculta
  function atualizarPalavraOculta(letra) {
    let algumaLetraEncontrada = false;
    for (let i = 0; i < palavra.length; i++) {
      if (palavra[i] === letra.toUpperCase()) {
        palavraOculta[i] = letra.toUpperCase();
        algumaLetraEncontrada = true;
      }
    }

    wordElement.innerHTML = palavraOculta.join("&nbsp;");

    return algumaLetraEncontrada;
  }

  // Função para verificar se o jogador ganhou
  const verificarVitoria = () => {
    if (!palavraOculta.includes("_")) {
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

  // Função para desativar um botão e adicionar a classe "incorreto" se a letra estiver errada
  const desativarBotao = (botao, letraCorreta) => {
    botao.disabled = true; // Desativando o botão
    if (!letraCorreta) {
      botao.style.backgroundColor = "red"; // Muda a cor de fundo para vermelho
      botao.style.color = "white"; // Muda a cor do texto para branco
    }
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
      const letraCorreta = palavra.toUpperCase().includes(letra);

      if (letraCorreta) {
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

      // Desativar o botão e mudar a cor se a letra estiver errada
      desativarBotao(event.target, letraCorreta);
    });
  });


  const atualizarGallows = () => {
    const parts = gallowsElement.querySelectorAll("path");
    // Exibe a parte correta com base no número de tentativas restantes
    const partToShow = parts.length - tentativas;
    if (partToShow >= 0 && partToShow < parts.length) {
      parts[partToShow].style.display = "block";
    }
  };

});
