class Trivia {
   constructor () {
    
   }
}

const App = ({ title, model }) => {
   return (
      
   );
};

let trivia = new Trivia();
let render = () => {
   ReactDOM.render(
      <App />,
      document.getElementById('container')
   );
};

trivia.subscribe(render);
render(); 