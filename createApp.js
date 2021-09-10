import {
    reactive,
    effect,
} from './reactive.js';
import {
    mount,
} from './mount.js';
import {
    patch,
} from './patch.js';
import {
    isStr,
} from './is.js';


function component(data, render) {
    return {
        data,
        render, // return a vnode tree.
    };
}

function createApp(comp, container) {
    if (isStr(container)) container = document.querySelector(container);
    let status = reactive(comp.data);
    let mounted = false;
    let prevTree;
    effect(() => {
        let newTree = comp.render.call(status);
        if (!mounted) {
            // first mount.
            mount(newTree, container);
            mounted = true;
        } else {
            patch(prevTree, newTree);
        }
        prevTree = newTree;
    });
    return status;
}

export {
    component,
    createApp,
};