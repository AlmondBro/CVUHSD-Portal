var age = 17;
var allowed = (age > 18) ? 'yes' : 'no';

console.log(allowed);

var age = 15;

var locked = 1;
var canChange = locked != 1 ? true : false;
console.log(canChange); //outputs false

if (locked != 1) {
    canChange = true;
} else {
    locked = false;
}
console.log(canChange); //outputs false

var speed = 90;
var message = speed >= 120 ? 'Too Fast' : (speed >= 80 ? 'Fast' : 'OK');
console.log(message);

function avg() {
    var sum = 0;
    for (var i = 0, j = arguments.length; i < j; i++) {
        if (arguments[i] !== String) {
            sum += arguments[i];
        }
    }
    return sum;
}

console.log(avg('2', '5', '8', "capybara", 10, 12));