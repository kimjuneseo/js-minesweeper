const evt = new App()
class App{
    constructor(){
        this.easy 
        const level = document.querySelectorAll('.level>button');
        // this.level = level
        this.addEvent();
    };

     addEvent(){
         this.level.addEventListener('click', () => {
             console.log(1);
         })
         console.log(this.level);
     }
}
level.addEventListener('click', (e) => {
console.log(e);
})