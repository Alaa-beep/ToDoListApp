import {Component, OnInit} from "@angular/core";

import {TodoList} from "./todoList";
import {TodoListService} from "./todoList.services";

@Component({
    selector: "app-tasks",
    templateUrl: './todoList.component.html',
    providers: [TodoListService]
})

export class TodoListComponent implements OnInit {
    tasks: TodoList[];
    editTask: TodoList;

    constructor(private todoListService: TodoListService){}

    ngOnInit(){
        this.getTasks();
    }

    getTasks(): void{
        this.todoListService.getTasks().subscribe(tasks => (this.tasks = tasks));
    }
    
    add(text: string): void{
        this.editTask = undefined;
        text = text.trim();
        if(!text){
            return;
        }

        const newTask: TodoList = {text} as TodoList;
        this.todoListService.addTask(newTask).subscribe(task => this.tasks.push(task));
    }

    delete(task: TodoList): void{
        this.tasks = this.tasks.filter(h => h !== task);
        this.todoListService.deleteTask(task._id).subscribe();

    } 

    edit(task){
        this.editTask = task;
    }

    update(){
        if (this.editTask){
            this.todoListService.updateTask(this.editTask).subscribe(task => {
                const ix = task ? this.tasks.findIndex(h => h._id === task._id) : -1
                if (ix > -1)
                this.tasks[ix] = task;
            });
            this.editTask = undefined;
        }
    }
}