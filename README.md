# Despesas do Beatrice
Calculadora de despesas de faxina, água e luz em sociedade.

## Variáveis
A parcela da conta de luz é compreendida pelo gasto da máquina (individual e faxina), geladeira (coletivo fixo) e demais aparelhos usados ao longo do mês (sociedade).

A conta de água leva em consideração a máquina (individual e faxina) e demais gastos como chuveiro, torneira (sociedade - uso proporcional aos dias passados na moradia). 


## Proporção de Sociedade
Retirando os gastos da geladeira e da máquina na conta de luz e dividindo pela soma de dias, é feita a constante de proporção de sociedade. Esta, multiplicada por quantos dias a pessoa ficou no local, retorna o valor justo a se pagar. Semelhante ocorre com conta de água. 

As lavagens individuais usam a soma das lavagens de cada pra fazer a proporção. Pode haver o caso de n pessoas compartilharem uma lavagem, daí esta equivale ao de acréscimo de 1/n no saldo de cada pessoa.
