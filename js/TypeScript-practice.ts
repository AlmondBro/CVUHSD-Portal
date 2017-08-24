//Interfaces are similar to structures in C++, so they're not really classes?
interface JQuery {  
    text(content: string);  
}  
  
interface JQueryStatic {  
    get(url: string, callback: (data: string) => any);     
    (query: string): JQuery; //Bare function signature - indicates that instances of the interface are callable.
}

declare var $: JQueryStatic; //Declare $, an instance of the JQueryStatic named object type (class)

$.get("http://mysite.org/divContent",  
      function (data: string) {  
          $("div").text(data);  
      }  
);

//Contextual typing is "top-down" inference 

class BankAccount {  
    balance = 0;  
    deposit(credit: number) {  
        this.balance += credit;  
        return this.balance;  
    }  
}  

//The following TypeScript code generates in Vanilla JS:
var BankAccount = (function () {  
    function BankAccount() {  
        this.balance = 0;  
    }  
    BankAccount.prototype.deposit = function(credit) {  
        this.balance += credit;  
        return this.balance;  
    };  
    return BankAccount;  
})();