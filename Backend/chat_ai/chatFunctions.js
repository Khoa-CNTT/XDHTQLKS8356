const { Question } = require('../model/question');
const natural = require("natural");
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

const checkQuestion = async (question) => {
    
    const list_question = await Question.findAll();

    list_question.forEach(q => tfidf.addDocument(q.content));

    let bestMatch = { index: -1, score: 0 };

    tfidf.tfidfs(question, (i, measure) => {
        if (measure > bestMatch.score) {
            bestMatch = { index: i, score: measure };
        }
    });

    if (bestMatch.score <= 10) {
        return null;
    }

    const matchedQuestion = list_question[bestMatch.index];

    return matchedQuestion.text;
};

const answers = async (userQuestion) => {
    const check = await checkQuestion(userQuestion);
    if(check){
        return check;
    }
    else{
        return "Hiện tại dữ liệu chưa có thông tin để trả lời về câu hỏi của bạn...";
    }
};


module.exports = {answers};
