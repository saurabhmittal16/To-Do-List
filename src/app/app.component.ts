import { Component, OnInit } from '@angular/core';
import {ListService} from './list/list.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private listService: ListService) {
  };

  ngOnInit() {
    this.listService.initList();
    this.listService.setList();
  }
}
