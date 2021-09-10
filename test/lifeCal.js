import {
    reactive,
    effect
} from '../reactive.js';


// test
let a = reactive({
    name: 'Mars',
    sex: 'Boy',
    age: 28,
});

effect(() => {
    let age = a.age;
    let remain = ((88 - age) * 365).toFixed(6);
    let lived = (age * 365).toFixed(6);
    document.querySelector('#info').innerHTML = `You have lived <span style="color: red;">${lived}</span> days, your remain life contains <span style="color: red;">${remain}</span> days.`;
});

setInterval(() => {
    a.age += 1/(365*24*60*60);
}, 1000);