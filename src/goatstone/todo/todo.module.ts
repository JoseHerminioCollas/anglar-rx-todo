import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TodoComponent } from 'goatstone/todo/todo.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ TodoComponent ],
  bootstrap:    [ TodoComponent ]
})
export class TodoModule { }