function calcularLucro() {
  const aguaTotal = parseFloat(document.getElementById("aguaTotal").value);
  const aguaValor = parseFloat(document.getElementById("aguaValor").value);
  const luzTotal = parseFloat(document.getElementById("luzTotal").value);
  const luzValor = parseFloat(document.getElementById("luzValor").value);
  const chuvGui = parseFloat(document.getElementById("chuvGui").value) * 1.03;
  const arGui = parseFloat(document.getElementById("arGui").value) * 1.03;
  const portatil = parseFloat(document.getElementById("portatil").value) * 1.03;
  const vetorDias = [
    30 - parseInt(document.getElementById("invest-a").value),
    30 - parseInt(document.getElementById("invest-b").value),
    30 - parseInt(document.getElementById("invest-c").value),
    30 - parseInt(document.getElementById("invest-e").value),
    30 - parseInt(document.getElementById("invest-f").value),
    30 - parseInt(document.getElementById("invest-g").value),
    30 - parseInt(document.getElementById("invest-h").value),
    30 - parseInt(document.getElementById("invest-j").value),
    30 - parseInt(document.getElementById("invest-k").value),
  ];

  let somaDias = 0;
  for (let i = 0; i < vetorDias.length; i++) {
    somaDias += vetorDias[i];
  }

  const L = luzValor / luzTotal;

  const geladeira = (124.5 * L) / 9;
  const valorChuvGui = (chuvGui * L);
  const valorArGui = (arGui * L);
  const valorPortatil = (portatil * L) / 2;

  const sociedadeLuz =
    (luzValor - (geladeira * 9 + valorArGui + valorChuvGui + valorPortatil * 2)) / somaDias;

  let luzColetiva = vetorDias.slice(0,9);
  for (let i = 0; i < luzColetiva.length; i++) {
    luzColetiva[i] *= sociedadeLuz;
  }

  const sociedadeAgua = (aguaValor) / somaDias;

  let aguaColetiva = vetorDias.slice(0,9);
  for (let i = 0; i < aguaColetiva.length; i++) {
    aguaColetiva[i] *= sociedadeAgua;
  }

  let total = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < total.length; i++) {
    total[i] +=
      geladeira +
      luzColetiva[i] +
      aguaColetiva[i];
  }

  total[0] = total[0] + valorArGui + valorChuvGui;
  for (let i = 1; i < 3; i++) {
    total[i] = total[i] + valorPortatil;
  }

  document.getElementById("resultado").innerHTML = `
          <p>Guilherme: R$ ${total[0].toFixed(2)}. Detalhes: conta de luz ${(luzColetiva[0] + geladeira + valorChuvGui).toFixed(
            2
          )}; conta de água ${aguaColetiva[0].toFixed(
            2
          )}; conta de ar-condicionado ${valorArGui.toFixed(2)}</p>

          <p>B: R$ ${total[1].toFixed(2)}. Detalhes: conta de luz ${(luzColetiva[1] + geladeira).toFixed(
            2
          )}; conta de água ${aguaColetiva[1].toFixed(
            2
          )}; conta de ar-condicionado ${valorPortatil.toFixed(2)}</p>

          <p>C: R$ ${total[2].toFixed(2)}. Detalhes: conta de luz ${(luzColetiva[2] + geladeira).toFixed(
            2
          )}; conta de água ${aguaColetiva[2].toFixed(
            2
          )}; conta de ar-condicionado ${valorPortatil.toFixed(2)}</p>

          <p>D: R$ ${total[3].toFixed(2)}. Detalhes: conta de luz ${(luzColetiva[3] + geladeira).toFixed(
            2
          )}; conta de água ${aguaColetiva[3].toFixed(
            2
          )}</p>

          <p>F: R$ ${total[4].toFixed(2)}. Detalhes: conta de luz ${(luzColetiva[4] + geladeira).toFixed(
            2
          )}; conta de água ${aguaColetiva[4].toFixed(
            2
          )}</p>

          <p>G: R$ ${total[5].toFixed(2)}. Detalhes: conta de luz ${(luzColetiva[5] + geladeira).toFixed(
            2
          )}; conta de água ${aguaColetiva[5].toFixed(
            2
          )}</p>

          <p>H: R$ ${total[6].toFixed(2)}. Detalhes: conta de luz ${(luzColetiva[6] + geladeira).toFixed(
            2
          )}; conta de água ${aguaColetiva[6].toFixed(
            2
          )}</p>

          <p>I: R$ ${total[7].toFixed(2)}. Detalhes: conta de luz ${(luzColetiva[7] + geladeira).toFixed(
            2
          )}; conta de água ${aguaColetiva[7].toFixed(
            2
          )}</p>

          <p>J: R$ ${total[8].toFixed(2)}. Detalhes: conta de luz ${(luzColetiva[8] + geladeira).toFixed(
            2
          )}; conta de água ${aguaColetiva[8].toFixed(
            2
          )}</p>
      `;
}
