import {
    createApp,
    component,
} from '../createApp.js';
import {
    h,
} from '../h.js';

// tests
let comp1 = component({
    name: 'Mars',
    sex: 'Boy',
    age: 19,
    img: 1,
}, function() {
    return h('div', {
        style: 'border: 2px solid black; display: flex; flex-direction: column; align-items:center; width: 250px;'
    }, [
        h('img', {
            src: `../assets/${this.img}.jpg`,
            style: 'max-width: 100%;'
        }, []),
        h('p', {}, ['Name: ', this.name]),
        h('p', {}, ['Sex: ', this.sex]),
        h('p', {}, ['Age: ', this.age + '']),
    ]);
});

let appData = createApp(comp1, '#app');

document.querySelector('button').addEventListener('click', () => {
    appData.age = Math.floor(Math.random() * 100);
    appData.name += '.Wiz';
    appData.sex = Math.random() > 0.5 ? 'Boy' : 'Girl';
    appData.img = Math.ceil(Math.random()*3);
});