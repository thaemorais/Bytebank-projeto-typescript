import { Transacao } from "./Transacao.js";
import { TipoTransacao } from "./TipoTransacao.js";

let saldo: number = 0;

const Conta = {
	getSaldo(): number {
		return saldo;
	},

	getDataAcesso(): Date {
		return new Date();
	},

	registrarTransacao(novaTransacao: Transacao) {
		if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
			saldo += novaTransacao.valor;
		} else if (
			novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
			novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
		) {
			saldo -= novaTransacao.valor;
		} else {
			alert("Tipo de transação inválida.");
			return;
		}
		console.log(novaTransacao);
	},
};

export default Conta;
