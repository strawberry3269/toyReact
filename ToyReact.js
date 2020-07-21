
class ElementWrapper{
    constructor(type){
        this.root = document.createElement(type);
    }

    setAttribute(name, value){
        this.root.setAttribute(name, value)
    }

    appendChild(vchild){
        vchild.mountTo(this.root)
    }
    mountTo(parent){
        parent.appendChild(this.root)
    }
}


class TextWrapper{
    constructor(type){
        this.root = document.createTextNode(type);
    }

    mountTo(parent){
        parent.appendChild(this.root)
    }
}


export class ToyComponent{
    constructor(){
        this.children = []
    }
    setAttribute(name, value){
        this[name] = value
    }

    mountTo(parent){
        let vdom = this.render();
        vdom.mountTo(parent);
    }

    appendChild(vchild){
       this.children.push(vchild)
    }

}



export let ToyReact = {
    createElement(type, attributes, ...children){
        let element;
        if(Object.prototype.toString.call(type) === '[object String]'){
            element = new ElementWrapper(type)
        }else{
            element = new type;
        }
        for(let name in attributes){
            element.setAttribute(name, attributes[name])
        }

        const insertChildren = (children) => {
            for(let child of children){
                if(Object.prototype.toString.call(child) === '[object Array]'){
                    insertChildren(child)
                }else{
                    if(!(child instanceof ToyComponent) && !(child instanceof ElementWrapper) && !(child instanceof TextWrapper)){
                        child = String(child)
                    }
                    if(Object.prototype.toString.call(child) === '[object String]'){
                        child = new TextWrapper(child)
                    }
                    element.appendChild(child);
                }
            }
        }

        insertChildren(children)
        return element
    },

    render(vdom, element){
        vdom.mountTo(element)
    }
}