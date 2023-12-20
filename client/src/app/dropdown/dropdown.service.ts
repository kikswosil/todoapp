import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  private list: string = '';

  public setOpenList(id: string) {
    this.list = id;
  }

  public getOpenList() {
    return this.list;
  }

}
