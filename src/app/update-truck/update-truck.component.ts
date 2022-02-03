import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {LoadDialogComponent} from '../load-dialog/load-dialog.component';
import {TruckServiceService} from '../Services/truck-service.service';

@Component({
  selector: 'app-update-truck',
  templateUrl: './update-truck.component.html',
  styleUrls: ['./update-truck.component.css']
})
export class UpdateTruckComponent implements OnInit {
  isCreate = true;
  selectedType;
  name: string;

  constructor(public dialogRef: MatDialogRef<LoadDialogComponent>,
              private snackBar: MatSnackBar,
              private truckService: TruckServiceService,
              @Inject(MAT_DIALOG_DATA) public data) {
  }

  ngOnInit(): void {
    if (this.data.currentType) {
      this.isCreate = false;
      this.selectedType = new FormControl(this.data.currentType, Validators.required);
    }
    this.selectedType = new FormControl('', Validators.required);
  }


  submit(): void {
    if (this.isCreate) {
      this.createTruck(this.selectedType.value, this.name);
    } else {
      this.updateTruck(this.selectedType.value);
    }
  }
  exit(): void {
    this.dialogRef.close();
  }
  createTruck(type, name: string): void {
    this.truckService.addTruck(type, name).subscribe(res => {
      this.snackBar.open(res.massage, '', {duration : 4000});
    });
  }

  updateTruck(type): void {
    this.truckService.updateTruck(type, this.data.id).subscribe(res => {
      this.snackBar.open(res.massage, '', {duration : 4000});
    });
  }

}
