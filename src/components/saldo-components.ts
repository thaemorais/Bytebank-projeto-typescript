import { formatarData, formatarMoeda } from "../utils/formatters.js";
import { FormatoData } from "../types/FormatoData.js";
import Conta from "../types/Conta.js";

const elementoSaldo = document.querySelector(
	".saldo-valor .valor"
) as HTMLElement;

const elementoData = document.querySelector(".block-saldo time") as HTMLElement;

if (elementoData != null) {
	elementoData.textContent = formatarData(
		Conta.getDataAcesso(),
		FormatoData.DIA_SEMANA_DD_MM_AAA
	);
}

renderizarSaldo();
export function renderizarSaldo(): void {
	if (elementoSaldo != null) {
		elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
	}
}

const saldoComponent = {
	atualizar() {
		renderizarSaldo();
	},
};

export default saldoComponent;
