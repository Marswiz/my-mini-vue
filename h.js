import {
    VNode,
} from './VNode.js';

import {
    isStr,
} from './is.js';

function h(type, props, children) {
    if (isStr(children)) children = [children];
    for (let i = 0; i < children.length; i++) {
        if (isStr(children[i])) {
            children[i] = h('', {
                text: children[i],
            }, []);
        }
    }
    return new VNode(type, props, children);
}

export {
    h
};