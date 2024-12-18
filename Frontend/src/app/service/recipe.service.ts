import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private apiUrl = 'http://localhost:3000/api';
  constructor(private http:HttpClient) { }

  recipeCreate(data: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/recipeCreate`, data);
  };

  recipeUpdate(id: String, data:any): Observable<any>{
    return this.http.put<any>(`${this.apiUrl}/recipeUpdate/${id}`, data);
  };

  recipeGet(recipeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/recipeGet/${recipeId}`);
  }
  

  recipeDelete(id: String): Observable<any>{
    return this.http.delete<any>(`${this.apiUrl}/recipeDelete/${id}`);
  };

  recipeGetAll(): Observable<any>{
    return this.http.get<any[]>(`${this.apiUrl}/recipeGetAll`);
  };
}
