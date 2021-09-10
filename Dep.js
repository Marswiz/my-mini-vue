class Dep {
    constructor() {
        this.dep = new Set();
    }

    add(e) {
        this.dep.add(e);
    }

    trigger() {
        for (let e of this.dep) {
            e();
        }
    }
}

export {
    Dep,
};