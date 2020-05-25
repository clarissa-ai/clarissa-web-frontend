import COV19 from "./COV-19.json"

class SurveyDAG {
    /**
     * Represents as Survey as a DAG.
     * @constructor
     * @param {String} name The name of the survey.
     */
    constructor() {
        // TODO: Fetch the survey. For now we import the COV-19.
        // Load previous questions.
        this.previousQuestions = [];
        // Create question map.
        this.questionMap = new Map();
        // Add questions to question map.
        COV19.questions.forEach(question => {
            this.questionMap.set(question.id, new QuestionNode(question));
        });
        // Set the root "node". This is the first question. However, the currentQuestion is going to be set to the start button page.
        this.root = this.questionMap.get(COV19.root);
        // Set the current question.
        this.currentQuestion = new LandingNode();
        //Bind functions
        this.start = this.start.bind(this);
        this.next = this.next.bind(this);
        this.prev = this.prev.bind(this);
    }

    getRoot = () => {
        return this.root;
    }

    start = () => {
        this.currentQuestion = this.root;
    }

    next = (nextID) => {
        this.previousQuestions.push(currentQuestion);
        this.currentQuestion = this.questionMap.get(nextID);
    }

    prev = () => {
        this.currentQuestion = previousQuestions.pop();
    }
}

class QuestionNode {
    /**
     * Represents a Node (or question) in the DAG.
     * @constructor
     * @param {Object} question The question object.
     */
    constructor(question) {
        this.id = question.id;
        this.type = question.type;
        this.title = question.title;
        this.description = question.description;
        this.options = question.options;
    }
}

class LandingNode {
    /**
     * Represents a Starting Node (start card) in the DAG.
     * @constructor
     * @param {String} title The title of the whole survey(i.e. the title to be displayed on the start page).
     * @param {String} description The description of the whole survey(i.e. the description to be displayed on the start page).
     */
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }
}

class EndingNode {
    /**
     * Represents the Ending Node (end card) in the DAG.
     * @constructor
     */
    constructor() {
        
    }
}

export default SurveyDAG;