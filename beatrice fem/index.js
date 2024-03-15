function calcularLucro() {
  const aguaTotal = parseFloat(document.getElementById("aguaTotal").value);
  const aguaValor = parseFloat(document.getElementById("aguaValor").value);
  const luzTotal = parseFloat(document.getElementById("luzTotal").value);
  const luzValor = parseFloat(document.getElementById("luzValor").value);
  const arYasmin = parseFloat(document.getElementById("arYasmin").value) * 1.03;
  const portatil = parseFloat(document.getElementById("portatil").value) * 1.03;
  const vetorDias = [
    30 - parseInt(document.getElementById("invest-a").value),
    30 - parseInt(document.getElementById("invest-b").value),
    30 - parseInt(document.getElementById("invest-c").value),
    30 - parseInt(document.getElementById("invest-e").value),
    30 - parseInt(document.getElementById("invest-f").value),
    30 - parseInt(document.getElementById("invest-g").value),
    30 - parseInt(document.getElementById("invest-h").value),
  ];
  const vetorLavagens = [
    parseFloat(document.getElementById("la").value),
    parseFloat(document.getElementById("lb").value),
    parseFloat(document.getElementById("lc").value),
    parseFloat(document.getElementById("le").value),
    parseFloat(document.getElementById("lf").value),
    parseFloat(document.getElementById("lg").value),
    parseFloat(document.getElementById("lh").value),
  ];

  let somaDias = 0;
  for (let i = 0; i < vetorDias.length; i++) {
    somaDias += vetorDias[i];
  }
  let somaLavagens = 0;
  for (let i = 0; i < vetorLavagens.length; i++) {
    somaLavagens += vetorLavagens[i];
  }

  const L = luzValor / luzTotal;
  const A = aguaValor / aguaTotal;

  const geladeira = (124.5 * L) / 7;
  const valorArYasmin = arYasmin * L;
  const valorPortatil = (portatil + L) / 3;
  const luzFaxina = (4 * 0.46 * L) / 7;
  const aguaFaxina = (4 * 0.188 * A) / 7;
  const faxina = luzFaxina + aguaFaxina;

  const luzMaquina = 0.46 * somaLavagens * L;
  const sociedadeLuz =
    (luzValor -
      (geladeira * 7 +
        valorArYasmin +
        valorPortatil * 3 +
        luzMaquina +
        luzFaxina * 7)) /
    somaDias;

  let luzColetiva = vetorDias.slice(0, 7);
  for (let i = 0; i < luzColetiva.length; i++) {
    luzColetiva[i] *= sociedadeLuz;
  }

  const aguaMaquina = somaLavagens * 0.188 * A;
  const sociedadeLavagem = aguaMaquina / somaLavagens;

  let aguaLavagem = vetorLavagens.slice(0, 7);
  for (let i = 0; i < aguaLavagem.length; i++) {
    aguaLavagem[i] *= sociedadeLavagem;
  }

  let luzLavagem = vetorLavagens.slice(0, 7);
  for (let i = 0; i < luzLavagem.length; i++) {
    luzLavagem[i] *= luzMaquina / somaLavagens;
  }

  const sociedadeAgua = (aguaValor - (aguaFaxina * 7 + aguaMaquina)) / somaDias;

  let aguaColetiva = vetorDias.slice(0, 7);
  for (let i = 0; i < aguaColetiva.length; i++) {
    aguaColetiva[i] *= sociedadeAgua;
  }

  let total = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < total.length; i++) {
    total[i] +=
      geladeira +
      faxina +
      luzLavagem[i] +
      aguaLavagem[i] +
      luzColetiva[i] +
      aguaColetiva[i];
  }

  total[0] = total[0] + valorArYasmin;
  for (let i = 1; i < 4; i++) {
    total[i] = total[i] + valorPortatil;
  }

  document.getElementById("resultado").innerHTML = `
          <p>Yasmin: R$ ${total[0].toFixed(2)}. Detalhes: conta de lavagens ${(
    luzLavagem[0] +
    aguaLavagem[0] +
    faxina
  ).toFixed(2)}; conta de luz ${(luzColetiva[0] + geladeira).toFixed(
    2
  )}; conta de água ${aguaColetiva[0].toFixed(
    2
  )}; conta de ar-condicionado ${valorArYasmin.toFixed(2)}</p>
  
          <p>B: R$ ${total[1].toFixed(2)}. Detalhes: conta de lavagens ${(
    luzLavagem[1] +
    aguaLavagem[1] +
    faxina
  ).toFixed(2)}; conta de luz ${(luzColetiva[1] + geladeira).toFixed(
    2
  )}; conta de água ${aguaColetiva[1].toFixed(
    2
  )}; conta de ar-condicionado ${valorPortatil.toFixed(2)}</p>

          <p>C: R$ ${total[2].toFixed(2)}. Detalhes: conta de lavagens ${(
    luzLavagem[2] +
    aguaLavagem[1] +
    faxina
  ).toFixed(2)}; conta de luz ${(luzColetiva[2] + geladeira).toFixed(
    2
  )}; conta de água ${aguaColetiva[2].toFixed(
    2
  )}; conta de ar-condicionado ${valorPortatil.toFixed(2)}</p>

          <p>D: R$ ${total[3].toFixed(2)}. Detalhes: conta de lavagens  ${(
    luzLavagem[3] +
    aguaLavagem[1] +
    faxina
  ).toFixed(2)}; conta de luz ${(luzColetiva[3] + geladeira).toFixed(
    2
  )}; conta de água ${aguaColetiva[3].toFixed(
    2
  )}; conta de ar-condicionado ${valorPortatil.toFixed(2)}</p>

          <p>E: R$ ${total[4].toFixed(2)}. Detalhes: conta de lavagens ${(
    luzLavagem[4] +
    aguaLavagem[4] +
    faxina
  ).toFixed(2)}; conta de luz ${(luzColetiva[4] + geladeira).toFixed(
    2
  )}; conta de água ${aguaColetiva[4].toFixed(2)}</p>

          <p>F: R$ ${total[5].toFixed(2)}. Detalhes: conta de lavagens ${(
    luzLavagem[5] +
    aguaLavagem[5] +
    faxina
  ).toFixed(2)}; conta de luz ${(luzColetiva[5] + geladeira).toFixed(
    2
  )}; conta de água ${aguaColetiva[5].toFixed(2)}</p>

          <p>G: R$ ${total[6].toFixed(2)}. Detalhes: conta de lavagens  ${(
    luzLavagem[6] +
    aguaLavagem[6] +
    faxina
  ).toFixed(2)}; conta de luz ${(luzColetiva[6] + geladeira).toFixed(
    2
  )}; conta de água ${aguaColetiva[6].toFixed(2)}</p>
      `;
}
