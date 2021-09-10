import {
    Dep
} from './Dep.js';

const objsMap = new WeakMap();
let activeEffect = null;

function track(obj, prop) {
    if (activeEffect !== null) {
        if (!objsMap.has(obj)) {
            objsMap.set(obj, new Map());
        }
        let depsMap = objsMap.get(obj);
        if (!depsMap.has(prop)) {
            depsMap.set(prop, new Dep());
        }
        let dep = depsMap.get(prop);
        dep.add(activeEffect);
    }
}

function effect(fn) {
    activeEffect = fn;
    fn();
    activeEffect = null;
}

function reactive(obj) {
    const handler = {
        get(obj, prop) {
            track(obj, prop);
            return Reflect.get(obj, prop);
        },
        set(obj, prop, value) {
            Reflect.set(obj, prop, value);
            if (objsMap.has(obj)) {
                if (objsMap.get(obj).has(prop)) {
                    objsMap.get(obj).get(prop).trigger();
                }
            }
            return true;
        }
    };
    return new Proxy(obj, handler);
}

export {
    reactive,
    effect,
    objsMap,
};