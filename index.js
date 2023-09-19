function calcularLucro() {
  const lavagens = parseInt(document.getElementById("lavagens").value);
  const investA = 30 - parseInt(document.getElementById("invest-a").value);
  const investB = 30 - parseInt(document.getElementById("invest-b").value);
  const investC = 30 - parseInt(document.getElementById("invest-c").value);
  const investE = 30 - parseInt(document.getElementById("invest-e").value);
  const investF = 30 - parseInt(document.getElementById("invest-f").value);
  const investG = 30 - parseInt(document.getElementById("invest-g").value);
  const investH = 30 - parseInt(document.getElementById("invest-h").value);
  const aguaTotal = parseFloat(document.getElementById("aguaTotal").value);
  const aguaValor = parseFloat(document.getElementById("aguaValor").value);
  const luzTotal = parseFloat(document.getElementById("luzTotal").value);
  const luzValor = parseFloat(document.getElementById("luzValor").value);

  const la = parseInt(document.getElementById("la").value);
  const lb = parseInt(document.getElementById("lb").value);
  const lc = parseInt(document.getElementById("lc").value);
  const le = parseInt(document.getElementById("le").value);
  const lf = parseInt(document.getElementById("lf").value);
  const lg = parseInt(document.getElementById("lg").value);
  const lh = parseInt(document.getElementById("lh").value);

  //gastos da luz

  const geladeira = 124.5;
  const luzFixo = (geladeira * (luzValor / luzTotal)) / 7;
  const diasProp =
    investA + investB + investC + investE + investF + investG + investH;
  const luzProp = (luzValor - luzFixo * 7) / diasProp;

  //gastos da água

  const aguaProp = aguaValor / aguaTotal;
  const lavProp =
    (lavagens * 0.188 * aguaProp) / (la + lb + lc + le + lf + lg + lh);

  let lavagemIndividual = [la, lb, lc, le, lf, lg, lh];
  for (let i = 0; i < lavagemIndividual.length; i++) {
    lavagemIndividual[i] *= lavProp;
  }

  const Angelica = (aguaProp * 0.188 * 4) / 7;

  const aguaColetiva =
    (aguaValor - (Angelica * 7 + lavagens * 0.188 * aguaProp)) / diasProp;

  const vetorColetivo = [
    investA,
    investB,
    investC,
    investE,
    investF,
    investG,
    investH,
  ];
  for (let i = 0; i < vetorColetivo.length; i++) {
    vetorColetivo[i] *= aguaColetiva;
  }

  const lucroPorSocioA =
    luzFixo +
    Angelica +
    vetorColetivo[0] +
    lavagemIndividual[0] +
    luzProp * investA;
  const lucroPorSocioB =
    luzFixo +
    Angelica +
    vetorColetivo[1] +
    lavagemIndividual[1] +
    luzProp * investB;
  const lucroPorSocioC =
    luzFixo +
    Angelica +
    vetorColetivo[2] +
    lavagemIndividual[2] +
    luzProp * investC;
  const lucroPorSocioE =
    luzFixo +
    Angelica +
    vetorColetivo[3] +
    lavagemIndividual[3] +
    luzProp * investE;
  const lucroPorSocioF =
    luzFixo +
    Angelica +
    vetorColetivo[4] +
    lavagemIndividual[4] +
    luzProp * investF;
  const lucroPorSocioG =
    luzFixo +
    Angelica +
    vetorColetivo[5] +
    lavagemIndividual[5] +
    luzProp * investG;
  const lucroPorSocioH =
    luzFixo +
    Angelica +
    vetorColetivo[6] +
    lavagemIndividual[6] +
    luzProp * investH;

  document.getElementById("resultado").innerHTML = `
          <p>Ana Luiza: R$ ${lucroPorSocioA.toFixed(2)}</p>
          <p>Emilly: R$ ${lucroPorSocioB.toFixed(2)}</p>
          <p>Helena: R$ ${lucroPorSocioC.toFixed(2)}</p>
          <p>Maria Clara: R$ ${lucroPorSocioE.toFixed(2)}</p>
          <p>Maria Luiza: R$ ${lucroPorSocioF.toFixed(2)}</p>
          <p>Maria Luzia: R$ ${lucroPorSocioG.toFixed(2)}</p>
          <p>Sarah: R$ ${lucroPorSocioH.toFixed(2)}</p>
      `;
}
