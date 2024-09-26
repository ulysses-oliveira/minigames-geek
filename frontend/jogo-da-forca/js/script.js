document.addEventListener("DOMContentLoaded", () => {

  const temas = {
    'Anime': ["Demon Slayer"],
    'Séries': ["Game of Thrones"],
    'Livros': ["Pequeno Principe", "As Crônicas de Gelo e Fogo"],
    'Filmes': ["Anabelle"],
  };

  let palavra;

  // Alterado para querySelectorAll para selecionar todos os links
  document.querySelectorAll('#tema-escolhido .nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Impede o comportamento padrão do link
      const tema = event.target.getAttribute('data-tema'); // Obtém o tema clicado

      const palavraSelecionada = temas[tema][Math.floor(Math.random() * temas[tema].length)];
      palavra = palavraSelecionada.toUpperCase();
      
      console.log(palavra); // Verifica se a palavra foi selecionada corretamente
      iniciarJogo()
    });
  });

  // Variáveis do jogo
  let tentativas = 6;
  let palavraOculta;

  // Função para atualizar a palavra oculta e começar o jogo após a escolha do tema
  function iniciarJogo() {
    palavraOculta = palavra.split("").map(char => (char === " " ? " " : "_"));
    const wordElement = document.getElementById("palavra-oculta");
    wordElement.innerHTML = palavraOculta.join("&nbsp;");
  }

  // Elementos HTML
  const buttons = document.querySelectorAll(".btn-secondary");
  const messageElement = document.querySelector(".message");

  // Função para atualizar a palavra oculta
  function atualizarPalavraOculta(letra) {
    let algumaLetraEncontrada = false;
    for (let i = 0; i < palavra.length; i++) {
      if (palavra[i] === letra.toUpperCase()) {
        palavraOculta[i] = letra.toUpperCase();
        algumaLetraEncontrada = true;
      }
    }

    const wordElement = document.getElementById("palavra-oculta");
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
    if (letraCorreta) {
      botao.style.backgroundColor = "#0c2dd1";
      botao.style.color = "white";
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
        requestAnimationFrame(() => {
          verificarVitoria();
        });
      } else {
        tentativas--;
        verificarDerrota();
      }

      desativarBotao(event.target, letraCorreta);
    });
  });

  const atualizarGallows = () => {
    const parts = gallowsElement.querySelectorAll("");
    // Exibe a parte correta com base no número de tentativas restantes
    const partToShow = parts.length - tentativas;
    if (partToShow >= 0 && partToShow < parts.length) {
      parts[partToShow].style.display = "block";
    }
  };

});
