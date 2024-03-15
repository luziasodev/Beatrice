function calcularLucro() {

  /* o javascript pega o dado armazenado no id="pessoaX" do html. pra esse dado de dias entrar na conta, ele precisa entrar nesse vetor. pra adicionar/remover, mexa no:

  30 - parseInt(document.getElementById("pessoa0").value),
  
  */
  const vetorDias = [
    30 - parseInt(document.getElementById("pessoa0").value),
    30 - parseInt(document.getElementById("pessoa1").value),
    30 - parseInt(document.getElementById("pessoa2").value),
    30 - parseInt(document.getElementById("pessoa3").value),
    30 - parseInt(document.getElementById("pessoa4").value),
    30 - parseInt(document.getElementById("pessoa5").value),
    30 - parseInt(document.getElementById("pessoa6").value),
    30 - parseInt(document.getElementById("pessoa7").value),
    30 - parseInt(document.getElementById("pessoa8").value),
  ];

  const pessoas = parseFloat(document.getElementById("pessoas").value);

  const aguaTotal = parseFloat(document.getElementById("aguaTotal").value);
  const aguaValor = parseFloat(document.getElementById("aguaValor").value);

  const luzTotal = parseFloat(document.getElementById("luzTotal").value);
  const luzValor = parseFloat(document.getElementById("luzValor").value);

  const chuvGui = parseFloat(document.getElementById("chuvGui").value) * 1.03;
  const arGui = parseFloat(document.getElementById("arGui").value) * 1.03;
  const portatil = parseFloat(document.getElementById("portatil").value) * 1.03;

  let somaDias = 0;
  for (let i = 0; i < vetorDias.length; i++) {
    somaDias += vetorDias[i];
  }

  // relação reais/kWh. quando multiplica pela energia, retorna preço.
  const L = luzValor / luzTotal; 

  // relação reais/kWh. quando multiplica pela energia, retorna preço.
  const A = aguaValor / aguaTotal; 

  // valor que cada um paga por geladeira(s) que gastam 124.5 kWh/mês.
  const geladeira = (124.5 * L) / pessoas; 
  const valorChuvGui = (chuvGui * L);
  const valorArGui = (arGui * L);

  // regra de sociedade com métrica de dias. no vetor da forma somaDias[i], o i indica a posição da pessoa. o i você pode alterar. neste caso, as pessoas 1 (1) e 2 (2) estão pagando pelo portatil.
  const valorPortatil = (portatil * L) / (vetorDias[1] + vetorDias[2]); 

  // regra de sociedade pra luz comum (lampadas etc). quem ficou no ap, paga pelo gasto do dia
  const sociedadeLuz =
    (luzValor - (
      geladeira * pessoas +
      valorArGui +
      valorChuvGui +
      portatil * L)) /
    somaDias; 

  let luzColetiva = vetorDias.slice(0,pessoas); 
  for (let i = 0; i < luzColetiva.length; i++) {
    luzColetiva[i] *= sociedadeLuz;
  }
  /*a função slice copia um vetor. o javascript, por ser todo degenerado assim como outras linguagens, não aceita que se mexa num vetor a partir de outra variável sem alterar o vetor original. exemplo, eu queria copiar o vetorDias pra multiplicar cada elemento (que é dias) pela constante de sociedade da energia elétrica. assim, obteria o valor justo de cada pessoa. na minha cabeça, fazia sentido usar:

  let luzColetiva = vetorDias;
  
  igualei uma nova variável a outra, então poderia fazer contas com ela sem alterar a original, certo? ERRADO!!! vetorDias vai virar luzColetiva. se eu o usasse de novo, bagunçaria toda conta. portanto, pra copiar vetor, use slice. você pode copiar quantos intervalos quiser. a forma (a,b) funciona como um intervalo que começa no a e termina no b-1.
  */ 

  const sociedadeAgua = (aguaValor) / somaDias;

  let aguaColetiva = vetorDias.slice(0,pessoas);
  for (let i = 0; i < aguaColetiva.length; i++) {
    aguaColetiva[i] *= sociedadeAgua;
  }

  //Criação do vetor total pelo numero de pessoas
  const zero = 0;
  let total = new Array(pessoas).fill(zero);

  //Atribuindo valores
  for (let i = 0; i < total.length; i++) {
    total[i] +=
      geladeira +
      luzColetiva[i] +
      aguaColetiva[i];
  }

  //Adicionais
  total[0] = total[0] + valorArGui + valorChuvGui;

  for (let i = 1; i < 3; i++) {
    total[i] = total[i] + (valorPortatil * vetorDias[i]);
  }

  document.getElementById("resultado").innerHTML = `
  <p>O ar e aparelhos próprios já se incluem na luz. O valor separado é para relatório e análise.</p>

  <p>Guilherme: R$ ${total[0].toFixed(2)}. 
  Detalhes: 
  conta de luz ${(
    luzColetiva[0] +
    geladeira +
    valorArGui +
    valorChuvGui
    ).toFixed(2)
  }; 
  conta de água ${(
    aguaColetiva[0]
    ).toFixed(2)
  };
  conta de chuveiro ${(
    valorChuvGui
    ).toFixed(2)
  }; 
  conta de ar-condicionado ${
    valorArGui.toFixed(2)
  }
  </p>

  <p>1: R$ ${total[1].toFixed(2)}. 
  Detalhes: 
  conta de luz ${(
    luzColetiva[1] +
    geladeira +
    valorPortatil * vetorDias[1]
    ).toFixed(2)
  }; 
  conta de água ${(
    aguaColetiva[1]
    ).toFixed(2)
  };
  conta de ar-condicionado ${(
    valorPortatil * vetorDias[1]
    ).toFixed(2)
  }
  </p>
  
  <p>2: R$ ${total[2].toFixed(2)}. 
  Detalhes: 
  conta de luz ${(
    luzColetiva[2] +
    geladeira +
    valorPortatil * vetorDias[2]
    ).toFixed(2)
  }; 
  conta de água ${(
    aguaColetiva[2]
    ).toFixed(2)
  };
  conta de ar-condicionado ${(
    valorPortatil * vetorDias[2]
    ).toFixed(2)
  }
  </p>

  <p>3: R$ ${total[3].toFixed(2)}. 
  Detalhes: 
  conta de luz ${(
    luzColetiva[3]
    ).toFixed(2)
  }; 
  conta de água ${(
    aguaColetiva[3]
    ).toFixed(2)
  };
  </p>

  <p>4: R$ ${total[4].toFixed(2)}. 
  Detalhes: 
  conta de luz ${(
    luzColetiva[4]
    ).toFixed(2)
  }; 
  conta de água ${(
    aguaColetiva[4]
    ).toFixed(2)
  }
  </p>

  <p>5: R$ ${total[5].toFixed(2)}. 
  Detalhes: 
  conta de luz ${(
    luzColetiva[5] +
    geladeira
    ).toFixed(2)
  }; 
  conta de água ${(
    aguaColetiva[5]
    ).toFixed(2)
  }
  </p>

  <p>6: R$ ${total[6].toFixed(2)}. 
  Detalhes: 
  conta de luz ${(
    luzColetiva[6] +
    geladeira
    ).toFixed(2)
  }; 
  conta de água ${(
    aguaColetiva[6] 
    ).toFixed(2)
  }
  </p>

  <p>7: R$ ${total[7].toFixed(2)}. 
  Detalhes: 
  conta de luz ${(
    luzColetiva[7] +
    geladeira
    ).toFixed(2)
  }; 
  conta de água ${(
    aguaColetiva[7] 
    ).toFixed(2)
  }
  </p>

  <p>8: R$ ${total[8].toFixed(2)}. 
  Detalhes: 
  conta de luz ${(
    luzColetiva[8] +
    geladeira
    ).toFixed(2)
  }; 
  conta de água ${(
    aguaColetiva[8] 
    ).toFixed(2)
  }
  </p>

  
  `;
}
