const messageConfig = {
  frontContent: "Happy Birthday, Odin One-Eye!",
  insideContent: "From Asgard to Nifelheim, you're the best all-father ever.\n\nLove,",
  closing: {
      "Thor": "Admiration, respect, and love",
      "Loki": "Your son"
  },
  signatories: [
      "Thor",
      "Loki"
  ]
};

//BUGGED FUNCTION //
/*
const printCard = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
   this.signatories.forEach(function (signatory) {
    const message = `${this.closing[signatory]}, ${signatory}`;
    console.log(message);

   });

};
*/


//SOLUTION 1; (a) adding thisArg to avoid lost context bug //
const printCard = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
   this.signatories.forEach(function (signatory) {
    const message = `${this.closing[signatory]}, ${signatory}`;
    console.log(message);

   }, this);  //adding the thisArg 
  }
  console.log(printCard.call(messageConfig))

//SOLUTION (b)  using bind
const printCardd = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
   const contextBoundForEachExpr = function (signatory) {
    const message = `${this.closing[signatory]}, ${signatory}`;
    console.log(message);

   }.bind(this);  //adding the bind to the forEach
  this.signatories.forEach(contextBoundForEachExpr)
  }
  console.log(printCardd.call(messageConfig))

//SOLUTION 2 ; USING A CLOSURE TO REGAIN ACCESS TO THE LOST CONTEXT 
  const printCarddd = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
  const outerContext = this   //redeclating the outer context with a new variable.
   this.signatories.forEach(function (signatory) {
    const message = `${outerContext.closing[signatory]}, ${signatory}`;
    console.log(message);
    
   });
  }
  console.log(printCarddd.call(messageConfig))

  //BEST: using an arrow function expression which does not create its own function context but of parent  
  const printCardddd = function () {
  console.log(this.frontContent);
  console.log(this.insideContent);
   this.signatories.forEach(signatory => 
    console.log(`${this.closing[signatory]}, ${signatory}`)
   );
  };
  console.log(printCardddd.call(messageConfig));