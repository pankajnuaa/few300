export interface QuestionModel {
  num: number;
  of: number;
  question: string;
}
export interface ScoresModel {
  scores: ScoreLineModel[];
  numberOfWuestions: number;
  numberCorrect: number;
  numberWrong: number;
}

export interface ScoreLineModel {
  id: number;
  question: string;
  answer: number;
  incorrect: boolean;
  providedAnswer: number;
}
