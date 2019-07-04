
const Questions = require('./schema/question');

module.exports = function(app) {
 

//Create Question
app.post('/question', (req,res, next) => {
  const question = new Questions({
      question: req.body.question,
      answers: req.body.answers
  })
   question.save()
   .then(result =>  res.send(result))
   .catch(err => res.send(err))
      
})
  

  //Get all Questions 
  app.get('/questions', (req, res) => {  
  
    Questions.find()
    .then(questions => {
      res.json(questions);
    })
    .catch(error => {
      res.json(error);
    });
  });
  

  

};

