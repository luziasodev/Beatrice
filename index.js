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
  var somaDias = 0;
  for (var i = 0; i < vetorDias.length; i++) {
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
  var somaLavagens = 0;
  for (var i = 0; i < somaLavagens.length; i++) {
    somaLavagens += vetorLavagens[i];
  }

  //gastos da luz

  const geladeira = 124.5 * (luzValor / luzTotal);
  const luzFixo = geladeira / 7;
  const AngelicaLuz = (4 * 0.46 * (luzValor / luzTotal)) / 7;
  const maquina = 0.46 * lavagens * (luzValor / luzTotal);

  const luzProp =
    (luzValor - (geladeira + maquina + AngelicaLuz * 7)) / somaDias;

  //gastos da água

  const aguaProp = aguaValor / aguaTotal;
  const lavProp = (lavagens * 0.188 * aguaProp) / somaLavagens;

  let lavagemIndividual = vetorLavagens;
  for (let i = 0; i < lavagemIndividual.length; i++) {
    lavagemIndividual[i] *= lavProp;
  }

  //energia da maquina

  let maqWatt = vetorLavagens;
  for (let i = 0; i < maqWatt.length; i++) {
    maqWatt[i] *= maquina / somaLavagens;
  }

  //agua limpeza + coletiva

  const AngelicaAgua = (4 * aguaProp * 0.188) / 7;

  const aguaColetiva =
    (aguaValor - (AngelicaAgua * 7 + lavagens * 0.188 * aguaProp)) / somaDias;

  let vetorAguaColetiva = vetorDias;
  for (let i = 0; i < vetorAguaColetiva.length; i++) {
    vetorAguaColetiva[i] *= aguaColetiva;
  }

  //soma das despesas

  let total = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < total.length; i++) {
    total[i] +=
      luzFixo +
      AngelicaLuz +
      AngelicaAgua +
      vetorAguaColetiva[i] +
      maqWatt[i] +
      lavagemIndividual[i] +
      vetorDias[i] * luzProp;
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
