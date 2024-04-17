import { formatarData } from "../utils/formatters.js";
import { FormatoData } from "./FormatoData.js";
import Conta from "./Conta.js";
export function renderizarData(elementoData) {
    if (elementoData != null) {
        elementoData.textContent = formatarData(Conta.getDataAcesso(), FormatoData.DIA_SEMANA_DD_MM_AAA);
    }
}
