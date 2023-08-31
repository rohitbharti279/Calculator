const calc = {
  symbols: ["+", "-", "&times;", "&div;", "%", "="], // array that contains the symbols
  memory: [], // array that will store the numbers and symbols entered by the user
  screenMemory: "", // string that represents the current value displayed on the calculator screen.

  key: function (numb) {
    document.querySelector(".screen").innerHTML += numb;
    this.screenMemory += numb;
  },
  keySymbols: function (symbol) {
    const lastSymbol = this.memory[this.memory.length - 1];
    // Check if the last symbol is not in the symbols array
    // and the current symbol is not the same as the last symbol
    if (!this.symbols.includes(lastSymbol) && lastSymbol !== symbol) {
      document.querySelector(".screen").innerHTML += symbol;
      this.memory.push(this.screenMemory);
      this.memory.push(symbol);
      this.screenMemory = ""; // reset screen memory to empty string
    } else if (this.symbols.includes(lastSymbol)) {
      // Evaluate the expression and store the result
      this.result();

      // Add the evaluated result and the new symbol
      this.memory.push(this.screenMemory);
      this.memory.push(symbol);
      this.screenMemory = ""; // reset screen memory to empty string

      // Update the screen with the new symbol
      document.querySelector(".screen").innerHTML += symbol;
    }
  },

  clearAll: function () {
    this.memory = [];
    this.screenMemory = "";
    document.querySelector(".screen").innerHTML = "";
  },
  deleteLast: function () {
    this.screenMemory = this.screenMemory.slice(0, -1);
    const screen = document.querySelector(".screen");
    screen.innerHTML = screen.innerHTML.slice(0, -1);
  },
  addDecimal: function () {
    if (!this.screenMemory.includes(".")) {
      document.querySelector(".screen").innerHTML += ".";
      this.screenMemory += ".";
    }
  },
  toggleSign: function () {
    this.screenMemory = -this.screenMemory;
    const screen = document.querySelector(".screen");
    screen.innerHTML = this.screenMemory;
  },

  result: function () {
    this.memory.push(this.screenMemory);

    for (let i = 0; i < this.memory.length; i++) {
      if (this.memory[i] === this.symbols[0]) {
        let res = Number(this.memory[i - 1]) + Number(this.memory[i + 1]);
        if (res != res.toFixed(3)) {
          const round = res.toFixed(3);
          res = round;
        }
        document.querySelector(".screen").innerHTML = res;
        this.screenMemory = res; // keep track of the current input on the calculator screen
        this.memory.push(res); // keep track of the calculated value for future operations if needed
      } else if (this.memory[i] === this.symbols[1]) {
        let res = Number(this.memory[i - 1]) - Number(this.memory[i + 1]);
        if (res != res.toFixed(3)) {
          const round = res.toFixed(3);
          res = round;
        }
        document.querySelector(".screen").innerHTML = res;
        this.screenMemory = res;
        this.memory.push(res);
      } else if (this.memory[i] === this.symbols[2]) {
        if (this.memory[i + 1] === "") {
          this.memory[i + 1] = 1; // to fix errors due to repeatation of operators
        }
        let res = Number(this.memory[i - 1]) * Number(this.memory[i + 1]);
        if (res != res.toFixed(3)) {
          const round = res.toFixed(3);
          res = round;
        }
        document.querySelector(".screen").innerHTML = res;
        this.screenMemory = res;
        this.memory.push(res);
      } else if (this.memory[i] === this.symbols[3]) {
        if (this.memory[i + 1] === "") {
          this.memory[i + 1] = 1; // to fix errors due to repeatation of operators
        }
        let res = Number(this.memory[i - 1]) / Number(this.memory[i + 1]);
        if (res != res.toFixed(3)) {
          const round = res.toFixed(3);
          res = round;
        }
        document.querySelector(".screen").innerHTML = res;
        this.screenMemory = res;
        this.memory.push(res);
      } else if (this.memory[i] === this.symbols[4]) {
        let res = Number(this.memory[i - 1]) / 100;
        if (res != res.toFixed(3)) {
          const round = res.toFixed(3);
          res = round;
        }
        document.querySelector(".screen").innerHTML = res;
        this.screenMemory = res;
        this.memory.push(res);
      }
    }
  },
};
