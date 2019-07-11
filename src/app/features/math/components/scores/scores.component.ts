import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ScoresModel } from '../../models';
import { Store } from '@ngrx/store';
import { MathState, selectScoresModel } from '../../reducers';
import { playAgain } from '../../actions/questions.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrls: ['./scores.component.scss']
})
export class ScoresComponent implements OnInit {
  scoresModel$: Observable<ScoresModel>;
  constructor(private store: Store<MathState>, private router: Router) { }

  ngOnInit() {
    this.scoresModel$ = this.store.select(selectScoresModel);
  }

  playAgain() {
    this.router.navigate(['math', 'game']);
    this.store.dispatch(playAgain());
  }

}
