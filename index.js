function calcularLucro() {
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
  const aguaProp = aguaValor / aguaTotal;

  const la = parseInt(document.getElementById("la").value);
  const lb = parseInt(document.getElementById("lb").value);
  const lc = parseInt(document.getElementById("lc").value);
  const le = parseInt(document.getElementById("le").value);
  const lf = parseInt(document.getElementById("lf").value);
  const lg = parseInt(document.getElementById("lg").value);
  const lh = parseInt(document.getElementById("lh").value);

  //consumo em metro cubico da maquina por ciclo: 0.188
  //litro consumido por pessoa

  let vetorLavagens = [la, lb, lc, le, lf, lg, lh];
  for (let i = 0; i < vetorLavagens.length; i++) {
    vetorLavagens[i] *= 0.188;
  }

  //valor em reais das lavagens

  let lavagemIndividual = vetorLavagens;
  for (let i = 0; i < lavagemIndividual.length; i++) {
    lavagemIndividual[i] *= aguaProp;
  }

  //valor em reais das lavagens da Angelica + água coletiva

  const lavagemColetiva =
    (aguaProp * (aguaTotal - (0.188 * (la + lb + lc + le + lf + lg + lh)))) / 7;

  const diasProp =
    investA + investB + investC + investE + investF + investG + investH;
  const geladeira = 124.5;
  const luzFixo = (geladeira * (luzValor / luzTotal)) / 7;
  const luzProp = (luzValor - luzFixo * 7) / diasProp;

  const lucroPorSocioA = luzFixo + lavagemColetiva + lavagemIndividual[0] + (luzProp * investA);
  const lucroPorSocioB = luzFixo + lavagemColetiva + lavagemIndividual[1] + (luzProp * investB);
  const lucroPorSocioC = luzFixo + lavagemColetiva + lavagemIndividual[2] + (luzProp * investC);
  const lucroPorSocioE = luzFixo + lavagemColetiva + lavagemIndividual[3] + (luzProp * investE);
  const lucroPorSocioF = luzFixo + lavagemColetiva + lavagemIndividual[4] + (luzProp * investF);
  const lucroPorSocioG = luzFixo + lavagemColetiva + lavagemIndividual[5] + (luzProp * investG);
  const lucroPorSocioH = luzFixo + lavagemColetiva + lavagemIndividual[6] + (luzProp * investH);

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
