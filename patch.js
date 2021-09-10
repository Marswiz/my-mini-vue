import {
    mount
} from './mount.js'

function patch(v1, v2) {
    let el = v1.el;
    let container = v1.el.parentNode;
    let anchor = el.nextSibling || undefined;
    if (v1.type !== v2.type) {
        container.removeChild(el);
        mount(v2, container, anchor);
    } else {

        // copy el.
        v2.el = el;

        if (v1.type === '') {
            // text node both.
            el.data = v2.props.text;
        } else {
            // same tag.
            // patch props:
            for (let prop of Reflect.ownKeys(v2.props)) {
                if (Reflect.get(v2.props, prop) !== Reflect.get(v1.props, prop)) el.setAttribute(prop, Reflect.get(v2.props, prop));
            }
            for (let prop of Reflect.ownKeys(v1.props)) {
                if (!prop in v2.props) el.removeAttribute(prop);
            }

            // patch children;
            let c1 = v1.children;
            let c2 = v2.children;
            let commonLength = c1.length > c2.length ? c2.length : c1.length;
            for (let i = 0; i < commonLength; i++) {
                patch(c1[i], c2[i]);
            }
            if (commonLength === c2.length) {
                for (let i = commonLength; i < c1.length; i++) {
                    el.removeChild(c1[i]);
                }
            } else {
                for (let i = commonLength; i < c2.length; i++) {
                    mount(c2[i], el);
                }
            }
        }
    }
}

export {
    patch,
};