class VNode {
    constructor(type, props = {}, children = []){
        if (type === undefined) {
            console.error('No type offered when create a VNode.');
            return;
        }
        this.type = type;
        this.props = props;
        this.children = children;
    }
}

export {
    VNode,
};