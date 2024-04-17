import { formatarMoeda } from "../utils/formatters.js";
import Conta from "./Conta.js";
export function renderizarSaldo(elementoSaldo) {
    if (elementoSaldo != null) {
        elementoSaldo.textContent = formatarMoeda(Conta.getSaldo());
    }
}
