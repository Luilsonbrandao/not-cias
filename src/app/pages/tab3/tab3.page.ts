import { Component } from '@angular/core';
import {StorageService} from '../../services/storage.service';
import {Article} from '../../interfaces';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  get articles(): Article[]{
  return this.storageServe.getLocalArticles;
  }
  constructor( private storageServe: StorageService ) {}

}
