class NegociacaoController {
  constructor() {
    let $ = document.querySelector.bind(document)

    this._inputData = $('#data')
    this._inputQntd = $('#quantidade')
    this._inputValor = $('#valor')

    let self = this

    this._listaNegociacoes = new Proxy(new ListaNegociacoes(), {
      get (target, prop, receiver) {
          if(['adiciona', 'esvazia'].includes(prop) && typeof(target[prop]) == typeof(Function)) {
            return function(){

              console.log(`método '${prop}' interceptado`);
              
              Reflect.apply(target[prop], target, arguments);

              self._negociacoesView.update(target);

            }
          }

          return Reflect.get(target, prop, receiver)
      }
  })
    
    this._negociacoesView = new NegociacoesView($('#negociacoesView'))

    this._mensagem = new Mensagem()
    this._mensagemView = new MensagemView($('#mensagemView'))
    this._mensagemView.update(this._mensagem)
  }

  adiciona(event) {
    event.preventDefault(); 

    this._listaNegociacoes.adiciona(this._criaNegociacao())

    this._mensagem.texto = 'Negociação adicionada com sucesso!'
    this._mensagemView.update(this._mensagem)
    
    this._limpaFormulario()

  }

  _criaNegociacao() {
    return new Negociacao(
      DateHelper.textToDate(this._inputData.value),
      this._inputQntd.value,
      this._inputValor.value
    )
  }

  _limpaFormulario() {
      this._inputData.value = ''
      this._inputQntd.value = 1
      this._inputValor.value = 0.0

      this._inputData.focus()
  }

  apaga() {

      this._listaNegociacoes.esvazia();

      this._mensagem.texto = 'Negociações apagadas com sucesso';
      this._mensagemView.update(this._mensagem);
  }
}
