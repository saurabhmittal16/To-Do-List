import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  list: string[] = [];

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.list = this.listService.getLists();

    this.listService.listChanged.subscribe(
      (list: string[]) => {
        this.list = list;
      }
    );
  }

  onClick(item: string, index: number) {
    this.listService.itemClicked.next({item: item, index: index});
  }
}
