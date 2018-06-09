import { Component, OnInit, Input } from '@angular/core';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css']
})
export class ListItemComponent implements OnInit {

  @Input() listItem: string;
  @Input() index: number;

  constructor(private listService: ListService) { }

  ngOnInit() {
  }

  onDelete() {
    this.listService.removeListItem(this.index);
  }

}

