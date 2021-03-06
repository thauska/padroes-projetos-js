export class Negociacao {
    // atributos da classe
    constructor(data, quantidade, valor) {
        // declarando parâmetros no constructor
        this._data = new Date(data.getTime())
        this._quantidade = quantidade
        this._valor = valor
        Object.freeze(this)
    }

    // métodos da classe
    get volume() {
        return this._quantidade * this._valor
    }

    // métodos acessadores: GET. Acessam os atributos privados da classe
    get data() {
        return new Date(this._data.getTime())
    }

    get quantidade() {
        return this._quantidade
    }
    
    get valor() {
        return this._valor
    }

    isEquals(outraNegociacao) {
        //JSON.stringify se baseia em todos os atributos
        return JSON.stringify(this) == JSON.stringify(outraNegociacao)

        //negociação deve ser igual a outra quando apenas a data e o valor são iguais
        //return this._data.getTime() == outraNegociacao.data.getTime() && this._valor == outraNegociacao.valor;
    }
}