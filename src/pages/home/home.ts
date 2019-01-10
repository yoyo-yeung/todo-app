import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  todos: Array<Object> = [];
  finished: Array<Object> = [];
  newItem: String = "";
  finishedView:Boolean = false;
  constructor(public navCtrl: NavController, private storage: Storage) {
    this.storage.get('todo').then(item=>this.todos=item===null?[]: item).catch(err=>console.error('Fail to extract from storage', err))
    this.storage.get('finished').then(item=>this.finished=item===null?[]: item).catch(err=>console.error('Fail to extract from storage', err))
  }
  storeInLS(){
    this.storage.set('todo', this.todos)
    this.storage.set('finished', this.finished)
  }
  addToList(){
    this.todos.push({content: this.newItem, time: Date.now(), finished: false});
    this.newItem = "";
    this.storeInLS();
  }
  updateList(item){
    if(item.finished){
      this.todos = this.todos.filter(ele=>ele!==item)
      this.finished.push(item);
    }
    else {
      this.finished = this.finished.filter(ele=>ele!==item)
      this.todos.push(item);
    }
    this.storeInLS();

  }
  remove(item){
    this.todos = this.todos.filter(ele=>ele!==item)
    this.finished = this.finished.filter(ele=>ele!==item)    
    this.storeInLS();

  }
}
