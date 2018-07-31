import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ListService } from '../list.service';

@Component({
  selector: 'app-list-add',
  templateUrl: './list-add.component.html',
  styleUrls: ['./list-add.component.css']
})
export class ListAddComponent implements OnInit {

  item = '';
  index: number;
  editMode = false;
  undo = false;

  @ViewChild('f') form: NgForm;

  constructor(private listService: ListService) { }

  ngOnInit() {
    this.listService.itemClicked.subscribe(
      (data) => {
        this.editMode = true;
        this.item = data.item;
        this.index = data.index;
      }
    );

    this.listService.itemDeleted.subscribe(
      (value) => {
        this.undo = value;
        this.item = '';
        this.onCancel();
      }
    );
  }

  onAdd(form: NgForm) {
    const item = form.value['item'];
    if (!this.editMode) {
      this.listService.addListItem(item);
    } else {
      this.listService.updateListItem(item, this.index);
    }
    this.onCancel();
  }

  onCancel() {
    this.editMode = false;
    this.form.reset();
  }

  onUndo() {
    this.listService.undoDeleted();
  }
}
