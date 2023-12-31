function calcularDespesa() {
  const lavagens = parseInt(document.getElementById("lavagens").value);
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
  const luzFaxina = (4 * 0.46 * L) / 7; 
  const aguaFaxina = (4 * 0.188 * A) / 7;
  const faxina = luzFaxina + aguaFaxina;

  const luzMaquina = 0.46 * lavagens * L;
  const sociedadeLuz =
    (luzValor - (geladeira * 7 + luzMaquina + luzFaxina * 7)) / somaDias;

  let luzColetiva = vetorDias.slice(0,7);
  for (let i = 0; i < luzColetiva.length; i++) {
    luzColetiva[i] *= sociedadeLuz;
  }

  const aguaMaquina = lavagens * 0.188 * A;
  const sociedadeLavagem = aguaMaquina / somaLavagens;

  let aguaLavagem = vetorLavagens.slice(0,7);
  for (let i = 0; i < aguaLavagem.length; i++) {
    aguaLavagem[i] *= sociedadeLavagem;
  }

  let luzLavagem = vetorLavagens.slice(0,7);
  for (let i = 0; i < luzLavagem.length; i++) {
    luzLavagem[i] *= luzMaquina / somaLavagens;
  }

  const sociedadeAgua = (aguaValor - (aguaFaxina * 7 + aguaMaquina)) / somaDias;

  let aguaColetiva = vetorDias.slice(0,7);
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

  document.getElementById("resultado").innerHTML = `
          <p>Ana Luiza: R$ ${total[0].toFixed(2)}</p>
          <p>Emilly: R$ ${total[1].toFixed(2)}</p>
          <p>Helena: R$ ${total[2].toFixed(2)}</p>
          <p>Maria Clara: R$ ${total[3].toFixed(2)}</p>
          <p>Maria Luiza: R$ ${total[4].toFixed(2)}</p>
          <p>Maria Luzia: R$ ${total[5].toFixed(2)}</p>
          <p>Sarah: R$ ${total[6].toFixed(2)}</p>
      `;
}
