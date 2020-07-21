import {ToyReact, ToyComponent} from './ToyReact';
class MyComponent extends ToyComponent{
    render(){
        return <div>
            <span>cool</span> <a href="jkl">1111</a>
            {this.children}
            </div>
    }

}
// let a = <div name="a" >
//     <span>Hello</span>
//     <span>111</span>
//     <span>890</span>
//     </div>

let a = <MyComponent name="a" >
    <div>Hello world</div>
    </MyComponent>

    ToyReact.render(a, document.body)


