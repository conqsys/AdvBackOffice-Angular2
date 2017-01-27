import { Component, OnInit } from '@angular/core';
import { CommonService } from '../label/common.service';

export interface Car {
  vin;
  year;
  brand;
  color;
};

@Component({
  selector: 'adv-grid',
  templateUrl: './grid.component.html'
})

export class GridComponent implements OnInit {

  private cars: Car[];
  private selectedCar: Car = null;
  private displayDialog: boolean = false;
  private totalRecords: number = 0;

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.getCarsLarge().then(
      cars => this.cars = cars);
  }

  private selectCar(car: Car) {
    this.selectedCar = car;
    this.displayDialog = true;
  };

  private onDialogHide() {
    this.selectedCar = null;
  };


  /* this is used for lazy loading*/
  private loadData(event) {
    // this.totalRecords = this.cars.length;
    // if (event.first !== 0) {
    //   this.totalRecords = event.first + 20;
    //   event.rows += 10;
    // } else if (event.first === 0) {
    //   this.totalRecords = event.first + 20;
    //   event.rows += 10;
    // }
  };
}
