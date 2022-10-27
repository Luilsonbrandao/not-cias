import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import {Article} from '../interfaces';
@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private _storage: Storage | null = null;
  private _localArticle: Article[] = [];

  constructor(private storage: Storage) {
    this.init();
  }
  get getLocalArticles() {
    return [...this._localArticle];
  }

  async init() {
    const storage = await this.storage.create();
    // eslint-disable-next-line no-underscore-dangle
    this._storage = storage;

    this.loadFavorites();
  }
  async saveRemoveArticle(article: Article) {
    // eslint-disable-next-line no-underscore-dangle
    const exists = this._localArticle.find( localArticle => localArticle.title === article.title );
    if ( exists ) {
      // eslint-disable-next-line no-underscore-dangle
      this._localArticle = this._localArticle.filter(localArticle => localArticle.title !== article.title);
    } else {
      // eslint-disable-next-line no-underscore-dangle
      this._localArticle = [article,...this._localArticle];
    }
    // eslint-disable-next-line no-underscore-dangle
    this.storage.set('articles', this._localArticle );

  }
  async loadFavorites() {
    try {
      const articles = await this._storage.get('articles');
      this._localArticle = articles || [];
    } catch (error) {

    }
  }

  articleInFavorites( article: Article ) {
    return !!this._localArticle.find( localArticle => localArticle.title === article.title );
  }

}
