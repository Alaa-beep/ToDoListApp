import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from '@angular/common/http';
import {HttpHeaders} from '@angular/common/http';

import {Observable} from "rxjs";
import {catchError} from "rxjs/operators"

import {TodoList} from "./todoList";
import {HttpErrorHandler, HandleError} from '../http-error-handler.service';

@Injectable()
export class TodoListService {
    private handleError: HandleError;

    constructor(private http: HttpClient, httpErrorHandler: HttpErrorHandler){
        this.handleError = httpErrorHandler.createHandleError("TodoListService");
    }

    getTasks(): Observable<TodoList[]>{
        return this.http
        .get<TodoList[]>("api/tasks")
        .pipe(catchError(this.handleError("getTasks", [])));
    }

    addTask(todoList: TodoList): Observable<TodoList>{
        return this.http
        .post<TodoList>("api/addTask", todoList)
        .pipe(catchError(this.handleError("addTask", todoList)));
    }

    deleteTask(id: number): Observable<{}>{
        const url = `api/deleteTask/${id}`;
        return this.http
        .delete(url)
        .pipe(catchError(this.handleError("deleteTask")));
    }

    updateTask(todoList: TodoList): Observable<TodoList>{
        return this.http
        .put<TodoList>(`api/updateTask/${todoList._id}`, todoList)
        .pipe(catchError(this.handleError("updateTask", todoList)));
    }
}