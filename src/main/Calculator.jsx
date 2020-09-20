import React from "react";
import "./Calculator.css";
import Button from "../Components/Button";
import Display from "../Components/Display";

const initialState = {
  displayValue: "0",
  clearDisplay: false,
  operation: null,
  values: [0, 0],
  current: 0,
};

export default class Calculator extends React.Component {
  state = { ...initialState };
  clear = () => {
    this.setState({ ...initialState });
  };
  setOperation = (button) => {
    if (this.state.current === 0) {
      this.setState({ clearDisplay: true, operation: button, current: 1 });
    } else {
      const currentOperation = this.state.operation;
      const values = { ...this.state.values };
      try {
        switch(currentOperation){
          case '+':
            values[0] = values[0] + values[1];
            values[1] = 0;
            break;
          case '-':
            values[0] = values[0] - values[1];
            values[1] = 0;
            break;
          case '/':
            if(values[1] === 0){
              this.setState({displayValue:'Não é possível dividir por zero'});
              return;
            }
            values[0] = values[0] / values[1];
            values[1] = 0;
            break;
          case '*':
            values[0] = values[0] * values[1];
            values[1] = 0;
            break;  
          default:  
             return 0;
        }
      } catch (e) {
        console.log(e);
      }
      const isOperationEquals = button === "=";
      this.setState({
        displayValue: values[0],
        clearDisplay: !isOperationEquals,
        operation: isOperationEquals ? null : button,
        current: isOperationEquals ? 0 : 1,
        values,
      });
    }
  };
  addDigit = (button) => {
    let n = button;
    let zeroMsg = 'Não é possível dividir por zero';
    if(this.state.displayValue === zeroMsg){
      this.setState({...initialState});
      return;
    }
    if (this.state.displayValue === "0" && n === ".") {
      // do nothing
      return;
    }
    if (n === "." && this.state.displayValue.includes(".")) {
      // do nothing
      return;
    }
    const clearDisplay = this.state.displayValue === "0" || this.state.clearDisplay;
    const currentValue = clearDisplay ? "" : this.state.displayValue;
    const displayValue = currentValue + n;
    this.setState({ displayValue, clearDisplay: false });
    const pos = this.state.current;
    const values = { ...this.state.values };
    values[pos] = parseFloat(displayValue);
    this.setState({ values });
  };
  passInfo = (button) => {
    const isButtonOperation = isNaN(parseInt(button));
    if (isButtonOperation) {
      button === "." ? this.addDigit(button) : this.setOperation(button);
    } else {
      this.addDigit(button);
    }
  };

  render() {
    return (
      <div>
        <h1>Calculator</h1>
        <div className="Calculator">
          <Display result={this.state.displayValue}></Display>
          <Button buttonClick={this.clear} label="clc"></Button>
          <Button buttonClick={this.passInfo} label="7"></Button>
          <Button buttonClick={this.passInfo} label="8"></Button>
          <Button buttonClick={this.passInfo} label="9"></Button>
          <Button
            operation={true}
            buttonClick={this.passInfo}
            label="/"
          ></Button>
          <Button buttonClick={this.passInfo} label="4"></Button>
          <Button buttonClick={this.passInfo} label="5"></Button>
          <Button buttonClick={this.passInfo} label="6"></Button>
          <Button
            operation={true}
            buttonClick={this.passInfo}
            label="*"
          ></Button>
          <Button buttonClick={this.passInfo} label="1"></Button>
          <Button buttonClick={this.passInfo} label="2"></Button>
          <Button buttonClick={this.passInfo} label="3"></Button>
          <Button
            operation={true}
            buttonClick={this.passInfo}
            label="-"
          ></Button>
          <Button buttonClick={this.passInfo} label="0"></Button>
          <Button buttonClick={this.passInfo} label="."></Button>
          <Button
            operation={true}
            buttonClick={this.passInfo}
            label="="
          ></Button>
          <Button
            operation={true}
            buttonClick={this.passInfo}
            label="+"
          ></Button>
        </div>
      </div>
    );
  }
}
