import { Subject } from 'rxjs';

export class ListService {

    listChanged = new Subject<string[]>();
    itemClicked = new Subject<{ item: string, index: number }>();
    itemDeleted = new Subject<boolean>();

    private list: string[];

    private deletedItem: {
        item: string,
        i: number
    };

    initList() {
        const list = JSON.parse(localStorage.getItem('items'));
        if (list)
            this.list = list;
        else
            this.list = [];
    }

    setList() {
        localStorage.setItem('items', JSON.stringify(this.list.slice()));
    }

    getLists() {
        return this.list.slice();
    }

    addListItem(item: string) {
        this.list.push(item);
        this.listChanged.next(this.list.slice());
        this.setList();
    }

    removeListItem(index: number) {
        this.deletedItem = {
            item: this.list[index],
            i: index
        };
        this.itemDeleted.next(true);
        this.list.splice(index, 1);
        this.listChanged.next(this.list.slice());
        this.setList();
    }

    updateListItem(val: string, index: number) {
        this.list[index] = val;
        this.listChanged.next(this.list.slice());
        this.setList();
    }

    undoDeleted() {
        this.list.splice(this.deletedItem.i, 0, this.deletedItem.item);
        this.deletedItem = null;
        this.itemDeleted.next(false);
        this.listChanged.next(this.list.slice());
        this.setList();
    }
}
