import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
let saldo = 0;
const elementoSaldo = document.querySelector(".saldo-valor .valor");
const elementoData = document.querySelector(".block-saldo time");
if (elementoData != null) {
    const dataAcesso = new Date();
    elementoData.textContent = formatarData(dataAcesso, FormatoData.DIA_SEMANA_DD_MM_AAA);
}
export function getSaldo() {
    return saldo;
}
atualizarSaldo(saldo);
export function atualizarSaldo(novoSaldo) {
    saldo = novoSaldo;
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(saldo);
    }
}
