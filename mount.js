function mount(vnode, container, anchor) {
    if (vnode.type === '') {
        // string vnode.
        let el = document.createTextNode(vnode.props.text);
        vnode.el = el;
        if (anchor === undefined) container.appendChild(el);
        else container.insertBefore(el, anchor);
    } else {
        // element vnode.
        let el = document.createElement(vnode.type);
        vnode.el = el;
        for (let prop of Reflect.ownKeys(vnode.props)) {
            el.setAttribute(prop, Reflect.get(vnode.props, prop));
        }
        if (vnode.children.length > 0) {
            for (let child of vnode.children) {
                mount(child, el);
            }
        }
        if (anchor === undefined) container.appendChild(el);
        else container.insertBefore(el, anchor);
    }
}

export {
    mount,
};