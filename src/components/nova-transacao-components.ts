import { TipoTransacao } from "./../types/TipoTransacao.js";
import { Transacao } from "../types/Transacao.js";
import Conta from "../types/Conta.js";
import SaldoComponent from "./saldo-components.js";
import ExtratoComponent from "./extrato-components.js";

const elementoFormulario = document.querySelector(
	".block-nova-transacao form"
) as HTMLFormElement;

elementoFormulario.addEventListener("submit", function (event) {
	try {
		event.preventDefault();

		if (!elementoFormulario.checkValidity()) {
			alert("Por favor, preencha todos os campos da transação.");
			return;
		}

		const inputTipoTransacao = elementoFormulario.querySelector(
			"#tipoTransacao"
		) as HTMLInputElement;
		const inputValor = elementoFormulario.querySelector(
			"#valor"
		) as HTMLInputElement;
		const inputData = elementoFormulario.querySelector(
			"#data"
		) as HTMLInputElement;

		let tipoTransacao: TipoTransacao =
			inputTipoTransacao.value as TipoTransacao;
		let valor: number = inputValor.valueAsNumber;
		let data: Date = new Date(inputData.value + " 00:00:00");

		const novaTransacao: Transacao = {
			tipoTransacao: tipoTransacao,
			valor: valor,
			data: data,
		};

		Conta.registrarTransacao(novaTransacao);
		SaldoComponent.atualizar();
		ExtratoComponent.atualizar();
		elementoFormulario.reset();
	} catch (erro) {
		alert(erro.message);
	}
});
