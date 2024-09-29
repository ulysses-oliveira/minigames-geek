document.addEventListener("DOMContentLoaded", () => {

  const temas = {
    'Anime': ["Demon Slayer", "Jujutsu Kaizen", "One Punch Man", "Chainsaw Man" ],
    'Séries': ["Game of Thrones", "Invicible", "Arqueiro", "Ahsoka"],
    'Livros': ["Pequeno Principe", "Dom Casmurro"],
    'Filmes': ["Anabelle", "Divertida Mente", "Homem Aranha"],
  };
  
  // Variáveis do jogo
  let tentativas = 6;
  let palavraOculta;
  let palavra;

  // Função para atualizar a palavra oculta e começar o jogo após a escolha do tema
  function iniciarJogo(palavraEscolhida, temaSelecionado) {
    palavraOculta = palavraEscolhida.split("").map(char => (char === " " ? " " : "_"));
    const wordElement = document.getElementById("palavra-oculta");
    wordElement.innerHTML = palavraOculta.join("&nbsp;");
    
    // Atualiza o link visualmente para destacar o tema selecionado
    document.querySelectorAll('#tema-escolhido .nav-link').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('data-tema') === temaSelecionado) {
        link.classList.add('active');
      }
    });

    gameReset()
  }
  
  function selecionarTemaPadrao() {
    const temaPadrao = localStorage.getItem('temaSelecionado') || 'Filme';
    const palavraSelecionada = gerarNovaPalavra(temaPadrao)
    
    iniciarJogo(palavraSelecionada, temaPadrao)
  }

  // Alterado para querySelectorAll para selecionar todos os links
  document.querySelectorAll('#tema-escolhido .nav-link').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Impede o comportamento padrão do link
      const tema = event.target.getAttribute('data-tema'); // Obtém o tema clicado

      // Armazena o tema selecionado no localStorage
      localStorage.setItem('temaSelecionado', tema)
      // Gera uma nova palavra
      const novaPalavra = gerarNovaPalavra(tema)
      iniciarJogo(novaPalavra, tema)
    });
  });

  function gerarNovaPalavra(tema) {
    palavra = temas[tema][Math.floor(Math.random() * temas[tema].length)].toUpperCase();
    return palavra
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

  const gameReset = () => {
    buttons.forEach((botao) => {
      botao.disabled = false;
      botao.classList.remove("disabled")

      botao.style.backgroundColor = ""
      botao.style.Color = ""
      messageElement.textContent = ""

      tentativas = 6;
    })
  }

  document.addEventListener("keydown", function(event) {
    const key = event.key.toUpperCase(); // Captura a tecla pressionada em maiúscula

    // Mapeia o evento ao botão correspondente no teclado virtual
    const button = document.getElementById(`key-${key}`);
    
    if (button) {
      button.click(); // Simula um clique no botão correspondente
    }
  });

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

  document.querySelector("#nova-palavra").addEventListener("click", () => {
    selecionarTemaPadrao()
  })

  const atualizarGallows = () => {
    const parts = gallowsElement.querySelectorAll("");
    // Exibe a parte correta com base no número de tentativas restantes
    const partToShow = parts.length - tentativas;
    if (partToShow >= 0 && partToShow < parts.length) {
      parts[partToShow].style.display = "block";
    }
  };

  window.onload = selecionarTemaPadrao;
});
