import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserServiceService} from '../Services/user-service.service';
import {AuthServiseService} from '../Services/auth-servise.service';
import {LoadServiceService} from '../Services/load-service.service';
import {FormBuilder, Validators} from '@angular/forms';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import {LoadDialogComponent} from '../load-dialog/load-dialog.component';
import {TruckServiceService} from '../Services/truck-service.service';
import {UpdateTruckComponent} from '../update-truck/update-truck.component';

const DELAY_TIME = 10000;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, OnDestroy {

  user;
  userLoads;
  loadForm;
  userTrucks;
  cache;
  constructor(private userService: UserServiceService,
              private authService: AuthServiseService,
              private loadService: LoadServiceService,
              private truckService: TruckServiceService,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              public dialog: MatDialog) {

  }

  ngOnDestroy(): void {
    clearInterval(this.cache);
  }

  ngOnInit(): void {
    this.cache = setInterval(() => this.update(), DELAY_TIME);
    this.loadForm = this.fb.group({
      name: ['', Validators.required],
      payload: ['', Validators.required],
      pickup_address: ['', Validators.required],
      delivery_address: ['', Validators.required],
      width: ['', Validators.required],
      length: ['', Validators.required],
      height: ['', Validators.required],
    });

    this.userService.getUser().pipe(
      map((user: any) => {
        this.user = user.res;
        if (user.res.role === 'DRIVER') {
          this.truckService.getMyTrucks().subscribe(res => {
            this.userTrucks = res.trucks;
          });
        }
        this.loadService.getAllLoads().subscribe(res => {
          this.userLoads = res.loads;
        });
      })
    ).subscribe(res => {
      this.user = res.res;
    });
  }

  deleteUser(): any {
    this.userService.deleteUser();
  }

  exit(): any {
    this.authService.signOut();
  }

  saveLoad(): any {
    const value = this.loadForm.value;
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
    this.loadService.postLoad(load).subscribe(res => {
      if (res.massage === 'Load created successfully') {
        this.openSnackBar(res.massage + ' You can check load status in the next tab');
      } else {
        this.openSnackBar(res.massage + ' Please try one more time');
      }
    });
    this.updateLoads();
  }

  saveAndPostLoad(): void {
    const value = this.loadForm.value;
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
    this.loadService.postLoad(load).pipe(
      map((res: any) => {
        if (res.massage === 'Load created successfully') {
          this.loadService.getAllLoads().subscribe((loads) => {
            const currentLoad = loads.loads.find(l => l.name === load.name);
            this.loadService.postLoadForId(currentLoad._id).subscribe(loadForId => {
              if (loadForId.driver_found) {
                this.openSnackBar('Load posted successfully and we find the driver for you');
              } else {
                this.openSnackBar('We can`t find driver for this load, you can try later from the next tab');
              }
            });
          });
        }
        return res;
      })
    ).subscribe(res => {
      this.updateLoads();
      console.log(res);
    });
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 4000,
    });
  }

  MyLoadsPostLoad(id: string): void {
    this.loadService.postLoadForId(id).subscribe(res => {
      console.log(res);
      if (res.driver_found) {
        this.openSnackBar('Load posted successfully and we find the driver for you');
      } else {
        this.openSnackBar('We can`t find driver for this load, please try later');
      }
      this.updateLoads();
    });
  }

  editLoad(load): void {
    const dialogRef = this.dialog.open(LoadDialogComponent, {
      width: '800px',
      data: {load}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateLoads();
    });
  }

  updateLoads(): void {
    this.loadService.getAllLoads().subscribe(res => {
      this.userLoads = res.loads;
    });
  }

  deleteLoad(id): void {
    this.loadService.deleteLoadForId(id).subscribe(res => {
      this.openSnackBar(res.massage);
      this.updateLoads();
    });
    this.updateLoads();
  }

  updateTrucks(): void {
    this.truckService.getMyTrucks().subscribe(res => {
      this.userTrucks = res.trucks;
    });
  }

  assignTruck(id): void {
    this.truckService.assignTruck(id)
      .subscribe(res => {
        this.openSnackBar(res.massage);
        this.updateTrucks();
      });
  }

  unAssignTruck(id): void {
    this.truckService.unAssignTruck(id)
      .subscribe(res => {
        this.openSnackBar(res.massage);
        this.updateTrucks();
      });
  }

  updateTruck(id, currentType): void {
    const dialogRef = this.dialog.open(UpdateTruckComponent, {
      width: '800px',
      data: {currentType, id}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateTrucks();
    });

  }

  deleteTruck(id): void {
    this.truckService.deleteTruck(id).subscribe(res => {
      this.openSnackBar(res.massage);
      this.updateTrucks();
    });
  }

  createTruck(): void {
    const dialogRef = this.dialog.open(UpdateTruckComponent, {
      width: '800px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(() => {
      this.updateTrucks();
    });

  }
  activeLoadChangeState(id): void {
    this.loadService.changeState(id)
      .subscribe(res => {
        this.openSnackBar(res.massage);
        this.update();
      });

  }
  update(): void {
    if(this.user.role === 'DRIVER') {
      this.updateTrucks();
    }
    this.updateLoads();
  }
}
