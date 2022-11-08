import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
    providedIn: 'any'
})
export class UserService {
    
    public get url(): string {
        return `https://localhost:5001/api/v1/users`;
    }
    constructor(private http: HttpClient) {

    }

    get = (): Observable<any> =>
        this.http.get<any>(`${this.url}`);

    getById = (id: any): Observable<any> =>
        this.http.get<any>(`${this.url}/${id}`);

    post = (data: any): Observable<any> =>
        this.http.post<any>(`${this.url}`, data).pipe(map(resp => resp.data));
    
    put = (id: string, data: any): Observable<any> =>
        this.http.put<any>(`${this.url}/${id}`, data).pipe(map(resp => resp.data));

    remove = (id: string): Observable<any> =>
        this.http.delete<any>(`${this.url}/${id}`).pipe(map(resp => resp?.data));    
 
}