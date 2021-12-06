import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';
import { Grave } from '../model/grave-model';
import { GraveService } from '../service/grave.service';

@Component({
  selector: 'app-grave-form',
  templateUrl: './grave-form.component.html',
  styleUrls: ['./grave-form.component.scss']
})
export class GraveFormComponent implements OnInit {

  graveForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    availableSlots: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
  });

  setFormValues(grave: Grave): void {
    this.graveForm.addControl('id', new FormControl);
    this.graveForm.get('id')?.setValue(grave.id);
    this.graveForm.get('name')?.setValue(grave.name);
    this.graveForm.get('type')?.setValue(grave.type);
    this.graveForm.get('availableSlots')?.setValue(grave.availableSlots);
    this.graveForm.get('phoneNumber')?.setValue(grave.phoneNumber);
    this.graveForm.get('address')?.setValue(grave.address);
  }

  grave?: Grave;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly graveService: GraveService,
    private readonly router: Router,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        map((params) => params.id),
        switchMap((id: string) => {
          if (!id) return EMPTY;
          else return this.graveService.getGravesById(id);
        })
      )
      .subscribe(
        (grave: Grave) => {if (grave) {
          this.setFormValues(grave);
        } else {
          this.onReset();
        }},
      );
  }

  addGrave(): void {
    const grave: Grave = this.graveForm.value;
    console.log('grave form value:', grave);

    this.graveService
      .createGrave(grave)
      .pipe()
      .subscribe((grave: Grave)=> {
        this.onReset()
        this.router.navigateByUrl("/graves")
      },
      (error : any) => {
        console.error(error)
      },
      )
    
  }

  onReset(): void {
    this.grave = undefined;
    this.graveForm.reset();
  }

}
