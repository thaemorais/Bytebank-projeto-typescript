import { Armazenador } from "../utils/Armazenador.js";
import { ValidaDebito, ValidaDeposito } from "./Decorators.js";
import { GrupoTransacao } from "./GrupoTransacao.js";
import ResumoTransacoes from "./ResumoTransacoes.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

export class Conta {
	protected nome: string;
	protected saldo: number = Armazenador.obter<number>("saldo") || 0;
	protected transacoes: Transacao[] =
		Armazenador.obter<Transacao[]>("transacoes", (key: string, value: any) => {
			if (key === "data") {
				return new Date(value);
			}
			return value;
		}) || [];

	constructor(nome: string) {
		this.nome = nome;
	}

	public getTitular() {
		return this.nome;
	}

	public getSaldo(): number {
		return this.saldo;
	}

	public getDataAcesso(): Date {
		return new Date();
	}

	public getResumoTransacoes(): ResumoTransacoes {
		const resumoTransacoes: ResumoTransacoes = {
			totalDepositos: 0,
			totalTransferencias: 0,
			totalPagamentosBoleto: 0,
		};
		const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
		for (let transacao of listaTransacoes) {
			switch (transacao.tipoTransacao) {
				case TipoTransacao.DEPOSITO:
					resumoTransacoes.totalDepositos += transacao.valor;
					break;

				case TipoTransacao.TRANSFERENCIA:
					resumoTransacoes.totalTransferencias += transacao.valor;
					break;

				case TipoTransacao.PAGAMENTO_BOLETO:
					resumoTransacoes.totalPagamentosBoleto += transacao.valor;
					break;
			}
		}
		console.log(resumoTransacoes);
		return resumoTransacoes;
	}

	public getGruposTransacoes(): GrupoTransacao[] {
		const gruposTransacoes: GrupoTransacao[] = [];
		const listaTransacoes: Transacao[] = structuredClone(this.transacoes);
		const transacoesOrdenadas: Transacao[] = listaTransacoes.sort(
			(t1, t2) => t2.data.getTime() - t1.data.getTime()
		);
		let labelAtualGrupoTransacao: string = "";

		for (let transacao of transacoesOrdenadas) {
			let labelGrupoTransacao: string = transacao.data.toLocaleDateString(
				"pt-br",
				{ month: "long", year: "numeric" }
			);
			if (labelAtualGrupoTransacao !== labelGrupoTransacao) {
				labelAtualGrupoTransacao = labelGrupoTransacao;
				gruposTransacoes.push({
					label: labelGrupoTransacao,
					transacoes: [],
				});
			}
			gruposTransacoes.at(-1).transacoes.push(transacao);
		}

		return gruposTransacoes;
	}

	public registrarTransacao(novaTransacao: Transacao) {
		if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
			this.depositar(novaTransacao.valor);
		} else if (
			novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
			novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
		) {
			this.debitar(novaTransacao.valor);
			novaTransacao.valor *= -1;
		} else {
			throw new Error("Tipo de transação inválida.");
		}
		this.transacoes.push(novaTransacao);
		console.log(this.getGruposTransacoes());
		Armazenador.salvar("transacoes", this.transacoes);
	}

	@ValidaDebito
	private debitar(valor: number): void {
		this.saldo -= valor;
		Armazenador.salvar("saldo", this.saldo.toString());
	}

	@ValidaDeposito
	private depositar(valor: number): void {
		this.saldo += valor;
		Armazenador.salvar("saldo", this.saldo);
	}
}

export class ContaPremium extends Conta {
	registrarTransacao(transacao: Transacao): void {
		if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
			console.log("Ganho um bônus de R$0,50");
			transacao.valor += 0.5;
		}
		super.registrarTransacao(transacao);
	}
}

const conta = new Conta("Joaoa da Silva Oliveira");

export default conta;
