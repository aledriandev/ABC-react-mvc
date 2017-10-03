function Questions (question, correct, wrong1,wrong2){
      this.question = question;
      this.choices = [ correct, wrong1, wrong2];
      this.id = [Utils.uuid(),Utils.uuid(),Utils.uuid()];
}

class Model {
      constructor() {
            this.render = undefined;
            this.questions = [
                  new Questions ('Which is the oldest airline in the world?','KLM', 'Abianca', 'Qantas'),
                  new Questions ('Which is the largest port in the world?','Port of Shanghai', 'Port de Singapore', 'Port of Rotterdam'),
                  new Questions ('What is the longest distance cycling backwards?','337.60 Km', '89.30 Km', '675.10 Km'),
                  new Questions ('What is the highest speed ever reached by a school bus?','590 Km/h', '320 Km/h', '245 Km/h'),
                  new Questions ('What is the longest car trip on one tank of gas?','2617 Km', '3568 Km', '1732 Km')
            ];
            this.images = ['img/1.svg','img/2.svg','img/3.svg','img/4.svg','img/5.svg','img/6.svg'];
            this.count= 0;
            this.question = this.questions[this.count].question;
            this.choices= this.questions[this.count].choices;
            this.id= this.questions[this.count].id;
            this.imge = this.images[this.count]
            this.answers= [];
            this.answersCorrect= [];
            this.complete= false;
            this.solution= false;
            this.init= true;
      }
      subscribe(render) {
            this.render = render;
      }
      inform() {
            this.render();
      }
      next (index) {
            if (this.count<4) {
                  this.answers.push(index);
            }else if (this.count ==4){
                  this.answers.push(index);
                  console.log(this.answers);
                  this.changeStateComplete();
            }
            if (index == 0) {
                  this.answersCorrect.push(index);
            }
            this.count= this.count +1;
      }

      changeStateComplete () {
            this.init= false;
            this.complete= true;
      }

      showSolution () {
            this.solution= true;
            this.complete= false;
      }

      prev () {
            this.count= this.count-1;
            this.answers.pop();
      }

      again () {
            console.log('click ');
            this.answers = [];
            this.answersCorrect = [];
            this.count= 0;
            this.complete= false;
            this.solution= false;
            this.init= true;
      }

}

const Trivia = ({ model }) => {
      const showImage = <img src={model.image} alt=""/>
      const letters = ['img/a.gif' ,'img/b.gif' ,'img/c.gif' ];
      const showChoices = model.choices.map((choice,index)=>{
            return (<div key={model.id} className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
                        <button className='btn-question' onClick={()=>modal.next(index)}>
                        <img className='letter' src={letters[index]} alt=""/>
                        <p>{choice}</p>
                        <div className='div-check'></div>
                        <div className='div-option'></div>
                        </button>
                  </div>);
            });
      };

      const showQuestions = (
                  <div>
                  <h3>{model.question}</h3>
                  <div className="row text-center choices">
                        {showChoices}
                  </div>
                  </div>
      );

      const answersUser = model.answers.map((answer,index)=>{
            return (
            <div key={model.id}>
                  <p>{model.questions[index].question}: <b>{model.questions[index].choices[answer]}</b></p>
            </div>
            );
      });

      const showAnswers = (
                  <div>
                  <h3>Here are you answers:</h3>
                  {tanswersUser}
                  <button className='btn-quiz' onClick={e=>model.showSolution(e)}>Submit</button>
                  </div>
            );

      const solution = modal.answers.map((answer,index)=>{
            if( answer == 0){
            return <p className='correct' key={index}>
                        {model.questions[index].question}: <b>{model.questions[index].choices[parseInt(answer)]}</b>
                        </p>;
            }else{
            return <p className='incorrect' key={index}>
                        <del>{model.questions[index].question}: {model.questions[index].choices[parseInt(answer)]}</del>
                        <b>{model.questions[index].choices[0]}</b>
                        </p>;
            }
      });

      return (
            <div>
                  <h1> {title} </h1>
                  <form
                        onSubmit={e => {
                              e.preventDefault();
                              model.addTodo(model.inputValue);
                        }}
                  >
                        <input onChange={e => (model.inputValue = e.target.value)} />
                        <button type="submit">Add Item</button>
                  </form>
                  <ol> {items} </ol>
            </div>
      );
};

let model = new Model();
let counter = 1;
let render = () => {
      console.log('render times: ', counter++);
      ReactDOM.render(
            <Trivia model={model} />,
            document.getElementById('container')
      );
};

model.subscribe(render);
render(); 