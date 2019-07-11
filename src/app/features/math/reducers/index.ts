
export const featureName = 'mathFeature';
import * as fromQuestions from './questions.reducers';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionModel, ScoresModel } from '../models';

export interface MathState {
  questions: fromQuestions.MathQuestionsState;
}

export const reducers = {
  questions: fromQuestions.reducer
};


// 1. Create a feature selector (that knows how to find the feature in the state)
const selectMathFeature = createFeatureSelector<MathState>(featureName);

// 2. Create a selector for each "branch" of the MathState (e.g., questions)

const selectQuestionsBranch = createSelector(selectMathFeature, m => m.questions);

// 3. Selectors that are "helpers" to get the data you need for step 4.
const selectCurrentQuestionId = createSelector(selectQuestionsBranch, q => q.currentQuestionId);
// Object Destructuring - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
const {
  selectTotal: selectTotalNumberOfQuestions,
  selectAll: selectAllQuestions,
  selectEntities: selectQuestionEntities } = fromQuestions.adapter.getSelectors(selectQuestionsBranch);

const selectSelectedQuestion = createSelector(
  selectQuestionEntities,
  selectCurrentQuestionId,
  (entities, current) => entities[current]
);
// 4. Create a selector for each component model

// TODO Create a selector that returns a QuestionModel
// current id, how many total, question for the current question

export const selectQuestionModel = createSelector(
  selectTotalNumberOfQuestions,
  selectSelectedQuestion,
  selectCurrentQuestionId,
  (total, selected, currentId) => {
    if (currentId > total) { return null; }
    return {
      num: selected.id,
      of: total,
      question: selected.question
    } as QuestionModel;
  }
);

export const selectAtEndOfQuestions = createSelector(
  selectTotalNumberOfQuestions,
  selectCurrentQuestionId,
  (total, current) => total === current
);

export const selectGameOverMan = createSelector(
  selectQuestionsBranch,
  q => q.missedQuestions.length === 3
);

// create a selector that returns the ScoresModel
const selectScores = createSelector(
  selectQuestionsBranch,
  b => b.missedQuestions
);
const selectNumberCorrect = createSelector(
  selectTotalNumberOfQuestions,
  selectScores,
  (total, wrong) => total - wrong.length
);

export const selectScoresModel = createSelector(
  selectTotalNumberOfQuestions,
  selectNumberCorrect,
  selectScores,
  selectAllQuestions,
  (numberOfQuestions, numberCorrect, scores, questions) => {
    const result: ScoresModel = {
      numberOfQuestions,
      numberCorrect,
      numberWrong: numberOfQuestions - numberCorrect,
      scores: questions.map(q => {
        const incorrect = scores.some(s => s.id === q.id);
        const providedAnswer = incorrect ? scores.filter(s => s.id === q.id)[0].providedAnswer : null;
        const questionResponse = {
          num: q.id,
          question: q.question,
          answer: q.answer,
          incorrect,
          providedAnswer
        };
        return questionResponse;

      })
    };
    return result;
  }
);

/*
export interface ScoresModel {
  scores: ScoreLineModel[];
  numberOfQuestions: number;
  numberCorrect: number;
  numberWrong: number;
}
interface ScoreLineModel {
  num: number;
  question: string;
  answer: number;
  incorrect: boolean;
  providedAnswer: number;
}
*/
