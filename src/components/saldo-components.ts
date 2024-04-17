import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";

let saldo: number = 0;

const elementoSaldo = document.querySelector(
	".saldo-valor .valor"
) as HTMLElement;

const elementoData = document.querySelector(".block-saldo time") as HTMLElement;

if (elementoData != null) {
	const dataAcesso: Date = new Date();
	elementoData.textContent = formatarData(
		dataAcesso,
		FormatoData.DIA_SEMANA_DD_MM_AAA
	);
}

export function getSaldo(): number {
	return saldo;
}

atualizarSaldo(saldo);
export function atualizarSaldo(novoSaldo: number): void {
	saldo = novoSaldo;
	if (elementoSaldo != null) {
		elementoSaldo.textContent = formatarMoeda(saldo);
	}
}
