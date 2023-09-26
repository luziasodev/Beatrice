function calcularLucro() {
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
  let somaDias = 0;
  for (let i = 0; i < vetorDias.length; i++) {
    somaDias += vetorDias[i];
  }

  const vetorLavagens = [
    parseInt(document.getElementById("la").value),
    parseInt(document.getElementById("lb").value),
    parseInt(document.getElementById("lc").value),
    parseInt(document.getElementById("le").value),
    parseInt(document.getElementById("lf").value),
    parseInt(document.getElementById("lg").value),
    parseInt(document.getElementById("lh").value),
  ];
  let somaLavagens = 0;
  for (let i = 0; i < vetorLavagens.length; i++) {
    somaLavagens += vetorLavagens[i];
  }

  const L = luzValor / luzTotal;
  const A = aguaValor / aguaTotal;

  //gastos fixos

  const geladeira = (124.5 * L) / 7;
  const luzFaxina = (4 * 0.46 * L) / 7;
  const aguaFaxina = (4 * 0.188 * A) / 7;
  const faxina = luzFaxina + aguaFaxina;

  //gastos da luz

  const luzMaquina = 0.46 * lavagens * L;
  const sociedadeLuz =
    (luzValor - (geladeira * 7 + luzMaquina + luzFaxina * 7)) / somaDias;

  let luzColetiva = vetorDias;
  for (let i = 0; i < luzColetiva.length; i++) {
    luzColetiva[i] *= sociedadeLuz;
  }

  //gastos da água

  const aguaMaquina = lavagens * 0.188 * A;
  const sociedadeLavagem = aguaMaquina / somaLavagens;

  let aguaLavagem = vetorLavagens;
  for (let i = 0; i < aguaLavagem.length; i++) {
    aguaLavagem[i] *= sociedadeLavagem;
  }

  //energia da maquina

  let luzLavagem = vetorLavagens;
  for (let i = 0; i < luzLavagem.length; i++) {
    luzLavagem[i] *= luzMaquina / somaLavagens;
  }

  //agua limpeza + coletiva

  const sociedadeAgua = (aguaValor - (aguaFaxina * 7 + aguaMaquina)) / somaDias;

  let aguaColetiva = vetorDias;
  for (let i = 0; i < aguaColetiva.length; i++) {
    aguaColetiva[i] *= sociedadeAgua;
  }

  //soma das despesas

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
