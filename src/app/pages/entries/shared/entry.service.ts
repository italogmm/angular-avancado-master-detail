import {Injectable, Injector} from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, flatMap} from 'rxjs/operators';
import {Entry} from './entry.model';
import {CategoryService} from '../../categories/shared/category.service';
import {BaseResourceService} from '../../../shared/services/base-resource.service';

@Injectable({
  providedIn: 'root'
})
export class EntryService extends BaseResourceService<Entry> {

  constructor(protected injector: Injector, private categoryService: CategoryService) {
    super('api/entries', injector, Entry.fromJson);
  }

  create(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToService(entry, super.create.bind(this));
  }

  update(entry: Entry): Observable<Entry> {
    return this.setCategoryAndSendToService(entry, super.update.bind(this));
  }

  private setCategoryAndSendToService(entry: Entry, sendFn: any): Observable<Entry> {
    return this.categoryService.getById(entry.categoryId).pipe(
      flatMap(category => {
        entry.category = category;
        return sendFn(entry);
      }),
      catchError(this.handleError)
    );
  }
}
