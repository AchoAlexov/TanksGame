// var myString = 'wkhfn#|rx#jhqfkr#phf#exw#|rxu#uholf#lv#khfgohg#lq#hfrwhu#sohfhw';
// var decodedString = [];

// var asdasd = 'ec an';

// for(var i = 0; i < myString.length; i++) {
//     var char = myString.charCodeAt(i) - 3;
//     decodedString.push(String.fromCharCode(char));
//     if (String.fromCharCode(char) == 'c' && decodedString[decodedString.length -2] == 'e') {
//         decodedString[decodedString.length - 1] = 'n';
//         decodedString[decodedString.length - 2] = 'a';
//     }
// }

// console.log(decodedString.join(''));

let myMap = new Map();
myMap.set(100100, { arr:[1,2,3]})
myMap.set(100101, {arr: [1,2,3]})
myMap.set(100102, 
    [1, 2, 3333]
)
myMap.set(100103, {
    arr: [1, 2, 3]
})



myMap.forEach(function(val, key) {
    if (key === 100102) {
        console.log(val[2]);
    }
});

let n = parseInt(3 + "" + 4);


