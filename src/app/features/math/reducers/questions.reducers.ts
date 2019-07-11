import { Action, createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as questionAction from '../actions/questions.actions';
import { tassign } from 'tassign';
export interface QuestionEntity {
  id: number;
  question: string;
  answer: number;
}

export interface MathQuestionsState extends EntityState<QuestionEntity> {
  currentQuestionId: number;
  missedQuestions: { id: number, providedAnswer: number }[];
}

const initialState: MathQuestionsState = {
  currentQuestionId: 4,
  missedQuestions: [],
  ids: [1, 2, 3, 4, 5],
  entities: {
    1: {
      id: 1,
      question: '1 + 1',
      answer: 2
    },
    2: {
      id: 2,
      question: '3 * 3',
      answer: 9
    },
    3: {
      id: 3,
      question: '18 - 2',
      answer: 16
    },
    4: {
      id: 4,
      question: '32 / 2',
      answer: 16
    },
    5: {
      id: 5,
      question: '20 - 5',
      answer: 15
    }
  }
};

export const adapter = createEntityAdapter<QuestionEntity>();

// export function reducer(state: MathQuestionsState = initialState,
//   action: Action): MathQuestionsState {
//   return state;
// }// this will be replaced with line below

const mathreducer = createReducer(
  initialState,
  on(questionAction.playAgain, () => initialState),
  on(questionAction.answerProvided, (state, action) => {
    // we need to kow if the guess is the answer tot he current question
    let tempState = { ...state }; // make shallow copy of this

    const currentQuestion = state.entities[state.currentQuestionId];

    if (action.guess !== currentQuestion.answer) {
      // add the questionId and their guess to the array of missedQuestions
      tempState = { ...tempState, missedQuestions: [...state.missedQuestions, { id: currentQuestion.id, providedAnswer: action.guess }] };
    }
    // const newState = ({ ...tempState, currentQuestionId: state.currentQuestionId + 1 });
    const newState = tassign(tempState, { currentQuestionId: state.currentQuestionId + 1 });
    return newState;
  })
);

export function reducer(state: MathQuestionsState | undefined, action: Action) {
  return mathreducer(state, action);
}

