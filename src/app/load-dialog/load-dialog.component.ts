import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {LoadServiceService} from '../Services/load-service.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-load-dialog',
  templateUrl: './load-dialog.component.html',
  styleUrls: ['./load-dialog.component.css']
})
export class LoadDialogComponent implements OnInit {
  form;
  constructor(public dialogRef: MatDialogRef<LoadDialogComponent>,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private loadService: LoadServiceService,
              @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: [this.data.load.name, Validators.required],
      payload: [this.data.load.payload, Validators.required],
      pickup_address: [this.data.load.pickup_address, Validators.required],
      delivery_address: [this.data.load.delivery_address, Validators.required],
      width: [this.data.load.dimensions.width, Validators.required],
      length: [this.data.load.dimensions.length, Validators.required],
      height: [this.data.load.dimensions.height, Validators.required],
    });
  }
  saveLoad(): void {
    const value = this.form.value;
    const load = {
      name: value.name,
      payload: value.payload,
      pickup_address: value.pickup_address,
      delivery_address: value.delivery_address,
      dimensions: {
        width: value.width,
        height: value.height,
        length: value.length,
      }
    };
    this.loadService.updateLoadForId(load, this.data.load._id).subscribe(res => {
      this.snackBar.open(res.massage);
    });
  }
  deleteLoad(id): void {
    this.loadService.deleteLoadForId(id).subscribe(  () => {
      this.close();
    });
  }
  close(): void {
    this.dialogRef.close();
  }
}
