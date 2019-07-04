
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

  //Edit question
  
  app.put("/question",   (req, res) => {
  
    Questions.findOne({ _id: req.body.id }, (error, doc) =>{
        if(error){
            res.send(error)
        } else {
            if(req.body.question){
               doc.question = req.body.question;
            }
            if(req.body.answers){
                doc.answers = req.body.answers
            }
        }
  
       doc.save(function(err, updateObject){
           if(err){
             return  res.send(err)
           } else {
            return   res.send(updateObject)
           }
       });
   })
  
  
  })

  

};

