import { Component, OnInit } from '@angular/core';
import { SavedScoresModel } from '../../models';
import { Observable } from 'rxjs';
import { loadSavedScores } from '../../actions/saved-scores.actions';
import { Store } from '@ngrx/store';
import { selectSavedScoresModel, MathState } from '../../reducers';

@Component({
  selector: 'app-saved-scores',
  templateUrl: './saved-scores.component.html',
  styleUrls: ['./saved-scores.component.scss']
})
export class SavedScoresComponent implements OnInit {
  model$: Observable<SavedScoresModel[]>;
  constructor(private store: Store<MathState>) { }

  ngOnInit() {

    this.model$ = this.store.select(selectSavedScoresModel);
  }


}
