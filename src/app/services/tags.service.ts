import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

import { Tag } from "../models/tag.model";

@Injectable({
  providedIn: 'root'
})
export class TagsService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/tags';

  getTags(): Observable<Tag[]> {
    return this.http.get<Tag[]>(this.url);
  }
}
