import { formatarMoeda } from "../utils/formatters.js";
import Conta from "../types/Conta.js";

const elementoSaldo = document.querySelector(
	".saldo-valor .valor"
) as HTMLElement;

renderizarSaldo();
function renderizarSaldo(): void {
	if (elementoSaldo !== null) {
		elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
	}
}

const SaldoComponent = {
	atualizar: function () {
		renderizarSaldo();
	},
};

export default SaldoComponent;
