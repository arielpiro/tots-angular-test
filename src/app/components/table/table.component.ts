import { Component, ViewChild } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { TotsListResponse } from '@tots/core';
import {
  TotsActionTable,
  TotsColumn,
  TotsStringColumn,
  TotsTableComponent,
  TotsTableConfig,
} from '@tots/table';
import { delay, of } from 'rxjs';
import { Client } from 'src/app/entities/client';
import { ClientService, ClientsData } from 'src/app/services/client.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @ViewChild('tableComp') tableComp!: TotsTableComponent;

  config = new TotsTableConfig();

  private id = 0;
  items!: Client[];

  // items = [
  //   {
  //     id: this.id++,
  //     name: 'Item 1, pedro',
  //     lastname: 'AB232',
  //     email: '2021-01-01',
  //   },
  //   { id: this.id++, name: 'Item 2', lastname: 'AB232', email: '2021-01-01' },
  //   { id: this.id++, name: 'Item 3', lastname: 'AB232', email: '2021-01-01' },
  //   { id: this.id++, name: 'Item 4', lastname: 'AB232', email: '2021-01-01' },
  //   { id: this.id++, name: 'Item 5', lastname: 'AB232', email: '2021-01-01' },
  // ];

  constructor(private clientSrv: ClientService) {}

  ngOnInit(): void {
    //this.legacyConfig();
    //this.configThroughFactories();
    this.miniConfig();
    this.clientSrv.getClientsList().subscribe({
      next: (res: ClientsData) => {
        console.log(res.response.data);
        this.items = res.response.data;

        let data = new TotsListResponse();
        data.data = [...this.items];
        data.total = 50;

        this.config.obs = of(data).pipe(delay(2000));
        this.tableComp.loadItems();
      },
      error: (err) => console.log(err),
      complete() {
        console.log('complete');
      },
    });
    // this.clientSrv.getClient().subscribe({
    //   next: (data) => console.log(data),
    //   error: (err) => console.log(err),
    //   complete() {
    //     console.log('complete');
    //   },
    // });
  }
  miniConfig() {
    this.config.id = 'clients-table';

    this.config.columns = [
      new TotsStringColumn(
        'firstname',
        'firstname',
        'Nombre',
        false,
        undefined,
        ''
      ),
      new TotsStringColumn(
        'lastname',
        'lastname',
        'Apellido',
        false,
        undefined,
        ''
      ),
      new TotsStringColumn('email', 'email', 'Email', false, undefined, ''),
    ];
  }

  onOrder(column: TotsColumn) {
    let response = new TotsListResponse();

    if (column.order == 'asc') {
      response.data = this.items.sort((a, b) =>
        a.firstname > b.firstname ? 1 : b.firstname > a.firstname ? -1 : 0
      );
    } else {
      response.data = this.items.sort((a, b) =>
        a.firstname < b.firstname ? 1 : b.firstname < a.firstname ? -1 : 0
      );
    }

    this.config.obs = of(response);
    this.tableComp.loadItems();
  }

  onTableAction(action: TotsActionTable) {
    if (action.key == 'click-order') {
      this.onOrder(action.item);
    } else if (action.key == 'select-item') {
      action.item.isSelected = true;
    } else if (action.key == 'unselect-item') {
      action.item.isSelected = false;
    } else if (action.key == 'form-change') {
      console.log(action.item.valid);
      console.log(action.item.values);
    } else if (action.key == 'delete') {
      this.removeItem(action.item);
    } else if (action.key == 'page-change') {
      this.changePage(action.item);
    }
  }

  addItem() {
    this.items = [
      ...this.items,
      {
        id: this.id++,
        title: 'Item 5',
        active: 1,
        subtitle: 'AB232',
        date: '2021-01-01',
        edit_field: 'pushed item',
      } as any,
    ];

    let data = new TotsListResponse();
    data.data = this.items;

    this.config.obs = of(data);
    this.tableComp?.loadItems();
  }

  removeItem(item: any) {
    this.items = this.items.filter((i) => i.id != item.id);
    let data = new TotsListResponse();
    data.data = this.items;

    this.config.obs = of(data);
    this.tableComp?.loadItems();
  }

  private changePage(pageEvent: PageEvent) {
    let data = new TotsListResponse();
    data.data = [...this.items];
    data.total = 50;

    this.config.obs = of(data).pipe(delay(2000));
    this.tableComp.loadItems();
  }
}