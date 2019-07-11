export const featureName = 'mathFeautre';

import * as fromQuestion from './questions.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { QuestionModel } from '../models';
export interface MathState {
  questions: fromQuestion.MathQuestionsState;
}

export const reducers = {
  questions: fromQuestion.reducer
};

// 1. Create a feature selector (that knows how to find the feature in the state)

const selectmathFeature = createFeatureSelector<MathState>(featureName);

// 2. Create a slector for each "branch"  of the MathState (e.g.  questions)
const selectQuestionBranch = createSelector(selectmathFeature, m => m.questions);

// 3. Selectors that are "helpers" to get the data you need for step 4
const selectCurrentQuestionId = createSelector(selectQuestionBranch, q => q.currentQuestionId);
const { selectTotal: totalNumOfQuestions,
  selectEntities: selectQuestionEntities
} = fromQuestion.adapter.getSelectors(selectQuestionBranch);
const selectSelectedQuestions = createSelector(
  selectQuestionEntities,
  selectCurrentQuestionId,
  (entities, current) => entities[current]
);
// 4. Create a selector for each component model

// TODO Create a selector that returns a questionModel
// current, how many total, question for current question

export const selectQuestionModel = createSelector(
  totalNumOfQuestions,
  selectSelectedQuestions,
  selectCurrentQuestionId,
  (total, select, currentid) => {
    if (currentid > total) { return null; }
    return {
      num: select.id,
      of: total,
      question: select.question
    } as QuestionModel;
  }
);

export const selectEndOfQuestions = createSelector(
  totalNumOfQuestions,
  selectCurrentQuestionId,
  (total, current) => total === current
);

export const selectGameOverman = createSelector(
  selectQuestionBranch, q => q.missedQuestions.length === 3
);

