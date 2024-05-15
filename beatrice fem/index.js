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
  ];

  const vetorLavagens = [
    parseFloat(document.getElementById("nlavagem0").value),
    parseFloat(document.getElementById("nlavagem1").value),
    parseFloat(document.getElementById("nlavagem2").value),
    parseFloat(document.getElementById("nlavagem3").value),
    parseFloat(document.getElementById("nlavagem4").value),
    parseFloat(document.getElementById("nlavagem5").value),
    parseFloat(document.getElementById("nlavagem6").value),
  ];

  const pessoas = parseFloat(document.getElementById("pessoas").value);

  const aguaTotal = parseFloat(document.getElementById("aguaTotal").value);
  const aguaValor = parseFloat(document.getElementById("aguaValor").value);

  const luzTotal = parseFloat(document.getElementById("luzTotal").value);
  const luzValor = parseFloat(document.getElementById("luzValor").value);

  const arYasmin = parseFloat(document.getElementById("arYasmin").value) * 1.03;
  const portatil = parseFloat(document.getElementById("portatil").value) * 1.03;

  // relação reais/kWh. quando multiplica pela energia, retorna preço.
  const L = luzValor / luzTotal;

  // relação reais/kWh. quando multiplica pela energia, retorna preço.
  const A = aguaValor / aguaTotal;

  let somaDias = 0;
  for (let i = 0; i < vetorDias.length; i++) {
    somaDias += vetorDias[i];
  }
  let somaLavagens = 0;
  for (let i = 0; i < vetorLavagens.length; i++) {
    somaLavagens += vetorLavagens[i];
  }

  // valor que cada um paga por geladeira(s) que gastam 124.5 kWh/mês.
  const geladeira = (124.5 * L) / pessoas;

  // valores totais da máquina de 0.46 kWh e 0.188m3 por ciclo
  const luzMaquina = 0.46 * somaLavagens * L;
  const aguaMaquina = somaLavagens * 0.188 * A;

  //veja que são valores individuais, divididos pela quantidade de pessoas
  const luzFaxina = (4 * 0.46 * L) / pessoas;
  const aguaFaxina = (4 * 0.188 * A) / pessoas;
  const faxina = luzFaxina + aguaFaxina;

  //APARELHOS ESPECIFICOS - regra de sociedade com métrica de dias quando for compartilhado

  /*no vetor da forma somaDias[i], o i indica a posição da pessoa. o i você pode alterar. neste caso, as pessoas 1 (1), 2 (2), 3 (3) estão pagando pelo portatil.*/
  const valorPortatil =
    (portatil * L) / (vetorDias[1] + vetorDias[2] + vetorDias[3]);

  //se só um paga, multiplica pela constante de valor/kWh e coloca no respectivo total
  const valorArYasmin = arYasmin * L;

  //regra de sociedade pra luz comum (lampadas etc). quem ficou no ap, paga pelo gasto do dia
  const sociedadeLuz =
    (luzValor -
      (geladeira * pessoas +
        valorArYasmin +
        portatil * L +
        luzMaquina +
        luzFaxina * pessoas)) /
    somaDias;

  let luzColetiva = vetorDias.slice(0, pessoas);
  for (let i = 0; i < luzColetiva.length; i++) {
    luzColetiva[i] *= sociedadeLuz;
  }
  /*a função slice copia um vetor. o javascript, por ser todo degenerado assim como outras linguagens, não aceita que se mexa num vetor a partir de outra variável sem alterar o vetor original. exemplo, eu queria copiar o vetorDias pra multiplicar cada elemento (que é dias) pela constante de sociedade da energia elétrica. assim, obteria o valor justo de cada pessoa. na minha cabeça, fazia sentido usar:

  let luzColetiva = vetorDias;
  
  igualei uma nova variável a outra, então poderia fazer contas com ela sem alterar a original, certo? ERRADO!!! vetorDias vai virar luzColetiva. se eu o usasse de novo, bagunçaria toda conta. portanto, pra copiar vetor, use slice. você pode copiar quantos intervalos quiser. a forma (a,b) funciona como um intervalo que começa no a e termina no b-1.
  */

  // regra de sociedade com métrica de lavagens. no vetor da forma vetorLavagens[i], o i indica a posição da pessoa. Todas estão incluídas. se não lavou, o valor zera porque fez 0 lavagens.
  const sociedadeLavagem = aguaMaquina / somaLavagens;
  if (somaLavagens === 0) {
    sociedadeLavagem = 0;
  }

  let aguaLavagem = vetorLavagens.slice(0, pessoas);
  for (let i = 0; i < aguaLavagem.length; i++) {
    aguaLavagem[i] *= sociedadeLavagem;
  }

  let luzLavagem = vetorLavagens.slice(0, pessoas);
  for (let i = 0; i < luzLavagem.length; i++) {
    luzLavagem[i] *= luzMaquina / somaLavagens;
    if (somaLavagens === 0) {
      luzLavagem[i] = 0;
    }
  }

  const sociedadeAgua =
    (aguaValor - (aguaFaxina * pessoas + aguaMaquina)) / somaDias;

  let aguaColetiva = vetorDias.slice(0, pessoas);
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
      faxina +
      luzColetiva[i] +
      aguaColetiva[i] +
      luzLavagem[i] +
      aguaLavagem[i];
  }

  //Adicionais
  total[0] = total[0] + valorArYasmin; //yasmin é posição 0 -> total[0]

  for (let i = 1; i < 4; i++) {
    total[i] = total[i] + valorPortatil * vetorDias[i];
  } // as 3 pessoas que estão no quarto são posicao 1, 2, 3. usei a iteração igual a uma e menor que 4 pra incluir os valores.

  document.getElementById("resultado").innerHTML = `
  <p>O custo da máquina já está incluído na água e luz. O ar também já se inclui na luz. O valor separado é para relatório e análise.</p>

          <p>Yasmin: R$ ${total[0].toFixed(2)}. 
          Detalhes: 
          conta de luz ${(
            luzColetiva[0] +
            geladeira +
            luzFaxina +
            luzLavagem[0] +
            valorArYasmin
          ).toFixed(2)}; 
          conta de água ${(
            aguaColetiva[0] +
            aguaFaxina +
            aguaLavagem[0]
          ).toFixed(2)};
          conta de lavagens ${(luzLavagem[0] + aguaLavagem[0]).toFixed(2)}; 
          conta de ar-condicionado ${valorArYasmin.toFixed(2)}
          </p>
  
          <p>1: R$ ${total[1].toFixed(2)}. 
          Detalhes: 
          conta de luz ${(
            luzColetiva[1] +
            geladeira +
            luzFaxina +
            luzLavagem[1] +
            valorPortatil * vetorDias[1]
          ).toFixed(2)}; 
          conta de água ${(
            aguaColetiva[1] +
            aguaFaxina +
            aguaLavagem[1]
          ).toFixed(2)};
          conta de lavagens ${(luzLavagem[1] + aguaLavagem[1]).toFixed(2)}; 
          conta de ar-condicionado ${(valorPortatil * vetorDias[1]).toFixed(2)}
          </p>
          
          <p>2: R$ ${total[2].toFixed(2)}. 
          Detalhes: 
          conta de luz ${(
            luzColetiva[2] +
            geladeira +
            luzFaxina +
            luzLavagem[2] +
            valorPortatil * vetorDias[2]
          ).toFixed(2)}; 
          conta de água ${(
            aguaColetiva[2] +
            aguaFaxina +
            aguaLavagem[2]
          ).toFixed(2)};
          conta de lavagens ${(luzLavagem[2] + aguaLavagem[2]).toFixed(2)}; 
          conta de ar-condicionado ${(valorPortatil * vetorDias[2]).toFixed(2)}
          </p>

          <p>3: R$ ${total[3].toFixed(2)}. 
          Detalhes: 
          conta de luz ${(
            luzColetiva[3] +
            geladeira +
            luzFaxina +
            luzLavagem[3] +
            valorPortatil * vetorDias[3]
          ).toFixed(2)}; 
          conta de água ${(
            aguaColetiva[3] +
            aguaFaxina +
            aguaLavagem[3]
          ).toFixed(2)};
          conta de lavagens ${(luzLavagem[3] + aguaLavagem[3]).toFixed(2)}; 
          conta de ar-condicionado ${(valorPortatil * vetorDias[3]).toFixed(2)}
          </p>

          <p>4: R$ ${total[4].toFixed(2)}. 
          Detalhes: 
          conta de luz ${(
            luzColetiva[4] +
            geladeira +
            luzFaxina +
            luzLavagem[4]
          ).toFixed(2)}; 
          conta de água ${(
            aguaColetiva[4] +
            aguaFaxina +
            aguaLavagem[4]
          ).toFixed(2)};
          conta de lavagens ${(luzLavagem[4] + aguaLavagem[4]).toFixed(2)}
          </p>

          <p>5: R$ ${total[5].toFixed(2)}. 
          Detalhes: 
          conta de luz ${(
            luzColetiva[5] +
            geladeira +
            luzFaxina +
            luzLavagem[5]
          ).toFixed(2)}; 
          conta de água ${(
            aguaColetiva[5] +
            aguaFaxina +
            aguaLavagem[5]
          ).toFixed(2)};
          conta de lavagens ${(luzLavagem[5] + aguaLavagem[5]).toFixed(2)}
          </p>

          <p>6: R$ ${total[6].toFixed(2)}. 
          Detalhes: 
          conta de luz ${(
            luzColetiva[6] +
            geladeira +
            luzFaxina +
            luzLavagem[6]
          ).toFixed(2)}; 
          conta de água ${(
            aguaColetiva[6] +
            aguaFaxina +
            aguaLavagem[6]
          ).toFixed(2)};
          conta de lavagens ${(luzLavagem[6] + aguaLavagem[6]).toFixed(2)}
          </p>

          
          `;
}
