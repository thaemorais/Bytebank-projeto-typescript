import { FormatoData } from "../types/FormatoData.js";
export function formatarMoeda(valor) {
    return valor.toLocaleString("pt-br", { style: "currency", currency: "BRL" });
}
export function formatarData(data, formato) {
    if (formato === FormatoData.DIA_MES) {
        return data.toLocaleDateString("pt-br", {
            day: "2-digit",
            month: "2-digit",
        });
    }
    else if (formato === FormatoData.DIA_SEMANA_DD_MM_AAA) {
        return data.toLocaleDateString("pt-br", {
            weekday: "long",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
        });
    }
    return data.toLocaleDateString("pt-br", {
        day: "2-digit",
    });
}
