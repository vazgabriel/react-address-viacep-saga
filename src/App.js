// React/Redux Modules
import React, { Component } from "react";
import { connect } from "react-redux";

// Actions
import { changeCEP } from "./redux/actions";

// Sagas
import { sagaMiddleware } from "./redux";
import { getAddressCEP } from "./redux/sagas";

class App extends Component {
  // State just for debounce time the changes
  state = {
    debounce: null
  };

  _changeCEP = event => {
    // Cleartimeout to Debounce effect
    if (this.state.debounce) {
      clearTimeout(this.state.debounce);
    }

    // Get CEP
    let cep = event.target.value;

    // Check if cep is not null and get only numbers
    if (!!cep) {
      cep = cep.replace(/[^\d]+/g, "");
    }

    // Put "-" on CEP
    if (cep.length > 5) {
      cep = cep.substr(0, 5) + "-" + cep.substr(5);
    }

    // Change CEP
    this.props.onChangeCEP(cep);

    /**
     * Debounce time to get CEP
     */
    this.setState({
      debounce: setTimeout(() => {
        if (this.props.cep.length === 9) {
          // Get address data
          sagaMiddleware.run(getAddressCEP);
        }
      }, 300)
    });
  };

  render() {
    return (
      <div className="container my-5">
        <div className="row justify-content-center align-items-center">
          <div className="form-group col-md-7">
            <label className="form-label">Digite seu CEP</label>
            <input
              className="form-control"
              placeholder="Digite seu CEP"
              type="text"
              maxLength={9}
              value={this.props.cep}
              onChange={this._changeCEP}
            />
          </div>
          <div className="form-group col-md-7">
            <label className="form-label">UF</label>
            <input
              className="form-control"
              placeholder="UF"
              disabled
              type="text"
              value={this.props.uf}
            />
          </div>
          <div className="form-group col-md-7">
            <label className="form-label">Cidade</label>
            <input
              className="form-control"
              placeholder="Cidade"
              disabled
              type="text"
              value={this.props.localidade}
            />
          </div>
          <div className="form-group col-md-7">
            <label className="form-label">Bairro</label>
            <input
              className="form-control"
              placeholder="Bairro"
              disabled
              type="text"
              value={this.props.bairro}
            />
          </div>
          <div className="form-group col-md-7">
            <label className="form-label">Logradouro</label>
            <input
              className="form-control"
              placeholder="Logradouro"
              disabled
              type="text"
              value={this.props.logradouro}
            />
          </div>
          <div className="form-group col-md-7">
            <label className="form-label">IBGE</label>
            <input
              className="form-control"
              placeholder="IBGE"
              disabled
              type="text"
              value={this.props.ibge}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  onChangeCEP: cep => dispatch(changeCEP(cep))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
