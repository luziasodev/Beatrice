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

  const diasProp =
    investA +
    investB +
    investC +
    investE +
    investF +
    investG +
    investH;
  const aguaProp = aguaValor / diasProp;
  const geladeira = 124.5;
  const luzFixo = (geladeira * (luzValor / luzTotal)) / 7;
  const luzProp = (luzValor - luzFixo * 7) / diasProp;

  const lucroPorSocioA = luzFixo + (aguaProp + luzProp) * investA;
  const lucroPorSocioB = luzFixo + (aguaProp + luzProp) * investB;
  const lucroPorSocioC = luzFixo + (aguaProp + luzProp) * investC;
  const lucroPorSocioE = luzFixo + (aguaProp + luzProp) * investE;
  const lucroPorSocioF = luzFixo + (aguaProp + luzProp) * investF;
  const lucroPorSocioG = luzFixo + (aguaProp + luzProp) * investG;
  const lucroPorSocioH = luzFixo + (aguaProp + luzProp) * investH;

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
