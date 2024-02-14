function calcularLucro() {
  const aguaTotal = parseFloat(document.getElementById("aguaTotal").value);
  const aguaValor = parseFloat(document.getElementById("aguaValor").value);
  const luzTotal = parseFloat(document.getElementById("luzTotal").value);
  const luzValor = parseFloat(document.getElementById("luzValor").value);
  const vetorDias = [
    30 - parseInt(document.getElementById("invest-a").value),
    30 - parseInt(document.getElementById("invest-b").value),
    30 - parseInt(document.getElementById("invest-c").value),
    30 - parseInt(document.getElementById("invest-e").value),
    30 - parseInt(document.getElementById("invest-f").value),
    30 - parseInt(document.getElementById("invest-g").value),
  ];
  const vetorLavagens = [
    parseFloat(document.getElementById("la").value),
    parseFloat(document.getElementById("lb").value),
    parseFloat(document.getElementById("lc").value),
    parseFloat(document.getElementById("le").value),
    parseFloat(document.getElementById("lf").value),
    parseFloat(document.getElementById("lg").value),
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

  const geladeira = (124.5 * L) / 6; 
  const luzFaxina = (4 * 0.46 * L) / 6; 
  const aguaFaxina = (4 * 0.188 * A) / 6;
  const faxina = luzFaxina + aguaFaxina;

  const luzMaquina = 0.46 * somaLavagens * L;
  const sociedadeLuz =
    (luzValor - (geladeira * 6 + luzMaquina + luzFaxina * 6)) / somaDias;

  let luzColetiva = vetorDias.slice(0,6);
  for (let i = 0; i < luzColetiva.length; i++) {
    luzColetiva[i] *= sociedadeLuz;
  }

  const aguaMaquina = somaLavagens * 0.188 * A;
  const sociedadeLavagem = aguaMaquina / somaLavagens;

  let aguaLavagem = vetorLavagens.slice(0,6);
  for (let i = 0; i < aguaLavagem.length; i++) {
    aguaLavagem[i] *= sociedadeLavagem;
  }

  let luzLavagem = vetorLavagens.slice(0,6);
  for (let i = 0; i < luzLavagem.length; i++) {
    luzLavagem[i] *= luzMaquina / somaLavagens;
  }

  const sociedadeAgua = (aguaValor - (aguaFaxina * 8 + aguaMaquina)) / somaDias;

  let aguaColetiva = vetorDias.slice(0,6);
  for (let i = 0; i < aguaColetiva.length; i++) {
    aguaColetiva[i] *= sociedadeAgua;
  }

  let total = [0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < total.length; i++) {
    total[i] +=
      geladeira +
      faxina +
      luzLavagem[i] +
      aguaLavagem[i] +
      luzColetiva[i] +
      aguaColetiva[i];
  }

  document.getElementById("resultado").innerHTML = `
          <p>A: R$ ${total[0].toFixed(2)}</p>
          <p>B: R$ ${total[1].toFixed(2)}</p>
          <p>C: R$ ${total[2].toFixed(2)}</p>
          <p>D: R$ ${total[3].toFixed(2)}</p>
          <p>F: R$ ${total[4].toFixed(2)}</p>
          <p>G: R$ ${total[5].toFixed(2)}</p>
      `;
}
