import { Component, OnInit } from '@angular/core';
import { CommonService } from '../label/common.service';

@Component({
  selector: 'adv-crud',
  templateUrl: './crud.component.html'
})

export class CrudComponent implements OnInit {

  displayDialog: boolean;

  car: Car = new PrimeCar();

  selectedCar: Car;

  newCar: boolean;

  cars: Car[];

  constructor(private commonService: CommonService) {
  }

  ngOnInit() {
    this.commonService.getCarsSmall().then(cars => this.cars = cars);
  }

  showDialogToAdd() {
    this.newCar = true;
    this.car = new PrimeCar();
    this.displayDialog = true;
  }

  save() {
    if (this.newCar) {
      this.cars.push(this.car);
    } else {
      this.cars[this.findSelectedCarIndex()] = this.car;
    }
    this.car = null;
    this.displayDialog = false;
  }

  delete() {
    this.cars.splice(this.findSelectedCarIndex(), 1);
    this.car = null;
    this.displayDialog = false;
  }

  onRowSelect(event) {
    this.newCar = false;
    this.car = this.cloneCar(event.data);
    this.displayDialog = true;
  }

  cloneCar(c: Car): Car {
    let car = new PrimeCar();
    for (let prop in c) {
      car[prop] = c[prop];
    }
    return car;
  }

  findSelectedCarIndex(): number {
    return this.cars.indexOf(this.selectedCar);
  }

}

export interface Car {
  vin?: string;
  year?: number;
  brand?: string;
  color?: string;
};

class PrimeCar implements Car {

  constructor(public vin?, public year?, public brand?, public color?) { }
}
