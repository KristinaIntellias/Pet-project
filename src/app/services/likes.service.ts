import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

import { Like } from "../models/like.model";

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/api/likes';

  addLike(articleId: string): Observable<Like> {
    return this.http.post<Like>(this.url, {usersId: [], articleId: articleId});
  }

  getLikes(): Observable<Like[]> {
    return this.http.get<Like[]>(this.url);
  }

  deleteLike(id: string): Observable<Like> {
    return this.http.delete<Like>(`${this.url}/${id}`);
  }

  toggleFavorite(like: Like, userId: string): Observable<Like> {
    return this.http.put<Like>(this.url, {like, userId});
  }
}
