import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'calculator';
  screen = 0;
  oldNr = 0;
  onOperator = "";
  calculationMade = false;
  displayNextNr = false;
  floatingPoint = false;
  dec = 10;
  calcHistory = "";

  clear() {
    this.screen = 0
    this.oldNr = null
    this.onOperator = ""
    this.floatingPoint = false
    this.dec = 10
    this.calcHistory = ""
  }

  equal() {
    debugger
    switch (this.onOperator) {
      case "plus":
        this.screen += this.oldNr
        break
      case "minus":
        // debugger
        this.oldNr -= this.screen
        this.screen = this.oldNr
        break
      case "multiply":
        this.screen *= this.oldNr
        break
      case "divide":
        this.oldNr /= this.screen
        this.screen = this.oldNr
        break
    }

    if (this.onOperator != "")
      this.calcHistory += "="

    this.screen = parseFloat(this.screen.toFixed(9))
    this.onOperator = ""
    this.calculationMade = true
    this.floatingPoint = false
    this.dec = 10

  }

  operation(str) {

    if (this.onOperator == "") {

      if (this.calculationMade) {
        this.calcHistory = this.calcHistory.substring(0, this.calcHistory.length - 1)
        this.calcHistory = "(" + this.calcHistory + ")"
      }


      this.oldNr = this.screen
      this.onOperator = str //plus, minus, etc
      switch (str) {
        case "plus":
          this.calcHistory += "+"
          break
        case "minus":
          this.calcHistory += "-"
          break
        case "multiply":
          this.calcHistory += "*"
          break
        case "divide":
          this.calcHistory += "/"
          break
      }
      this.displayNextNr = false
      this.floatingPoint = false
      this.dec = 10
    }

  }

  createDigit(x: number) {
    if (this.calculationMade && this.onOperator == "") {
      this.screen = 0
      this.oldNr = 0
      this.calculationMade = false
      this.calcHistory = ""
    }

    if (this.onOperator != "" && this.displayNextNr == false) {
      this.screen = 0
      this.displayNextNr = true;
    }

    if (this.floatingPoint == false) {
      if (this.screen != 0) {
        this.screen *= 10;
        this.screen += x;
      }
      else {
        this.screen = x;
      }
    }
    else { // this.floatingPoint == true
      let nr = x / this.dec;
      this.screen += nr;
      this.dec *= 10;
    }

    if (this.screen != 0)
      this.calcHistory += x
  }

  floatingPointF() {
    if (this.floatingPoint == false)
      this.calcHistory += "."
    this.floatingPoint = true
  }

  square() {
    this.screen *= this.screen
    this.calculationMade = true
    this.screen = parseFloat(this.screen.toFixed(9))
    debugger
    if (this.calcHistory[this.calcHistory.length - 1] == "=") {
      this.calcHistory = this.calcHistory.substring(0, this.calcHistory.length - 1)
      this.calcHistory = "sqr(" + this.calcHistory + ")"
    }
    else if (!(this.calcHistory.includes("+") || this.calcHistory.includes("-") || this.calcHistory.includes("*") || this.calcHistory.includes("/")))
      this.calcHistory = "sqr(" + this.calcHistory + ")"
    else {
      let old = ""
      while (this.calcHistory[this.calcHistory.length - 1] != "+" && this.calcHistory[this.calcHistory.length - 1] != "-"
        && this.calcHistory[this.calcHistory.length - 1] != "*" && this.calcHistory[this.calcHistory.length - 1] != "/") {
        old += this.calcHistory[this.calcHistory.length - 1]
        this.calcHistory = this.calcHistory.substring(0, this.calcHistory.length - 1)
      }
      old = old.split("").reverse().join("")
      if (old != "")
        this.calcHistory = this.calcHistory + "sqr(" + old + ")"
      else
        this.calcHistory = this.calcHistory + "sqr(" + this.oldNr + ")"
    }
  }

  negate() {
    this.screen *= -1
    if (this.calcHistory != "") {
      if (this.calculationMade)
        this.calcHistory = this.calcHistory.substring(0, this.calcHistory.length - 1)
      this.calcHistory = "-(" + this.calcHistory + ")"
    }
  }

  plus() {
    this.operation("plus")
  }

  minus() {
    this.operation("minus")
  }

  multiply() {
    this.operation("multiply")
  }

  divide() {
    this.operation("divide")
  }

  digit0() {
    this.createDigit(0);
  }

  digit1() {
    this.createDigit(1);
  }

  digit2() {
    this.createDigit(2);
  }

  digit3() {
    this.createDigit(3);
  }

  digit4() {
    this.createDigit(4);
  }

  digit5() {
    this.createDigit(5);
  }

  digit6() {
    this.createDigit(6);
  }

  digit7() {
    this.createDigit(7);
  }

  digit8() {
    this.createDigit(8);
  }

  digit9() {
    this.createDigit(9);
  }

}


// pus switch in equal
// sa nu mai fie nevoie sa apesi egal mereu   $$$
// pus square si negate in istoric
//  facut istoric mare