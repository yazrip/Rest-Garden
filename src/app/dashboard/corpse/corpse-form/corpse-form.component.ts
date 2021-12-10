import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY, Observer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Grave } from '../../grave/model/grave-model';
import { GraveService } from '../../grave/service/grave.service';
import { Corpse } from '../model/corpse-model';
import { CorpseService } from '../service/corpse.service';


@Component({
  selector: 'app-corpse-form',
  templateUrl: './corpse-form.component.html',
  styleUrls: ['./corpse-form.component.scss']
})
export class CorpseFormComponent implements OnInit {

  corpseForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    location: new FormControl('', [Validators.required]),
    parentName: new FormControl('', [Validators.required]),
  });

  setFormValues(corpse: Corpse): void {
    this.corpseForm.addControl('id', new FormControl);
    this.corpseForm.get('id')?.setValue(corpse.id);
    this.corpseForm.get('name')?.setValue(corpse.name);
    this.corpseForm.get('location')?.setValue(corpse.location);
    this.corpseForm.get('parentName')?.setValue(corpse.parentName);
  }
  graves: Grave[] = [];
  corpse?: Corpse;
  subscriber?: Observer<any>

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly corpseService: CorpseService,
    private readonly router: Router,
    private readonly graveService: GraveService
  ) { }

  ngOnInit(): void {
    this.getAllGrave();
  }

  getAllGrave(){
    this.subscriber = {
      next: (data: any) => {this.graves = data, console.log(data)},
      error: console.error,
      complete: () => {},
    };

    this.graveService.getAllGraves().pipe().subscribe(this.subscriber)
  }

  addCorpse(): void {
    const corpse: Corpse = this.corpseForm.value;
    console.log('corpse form value:', corpse);

    this.corpseService
      .addCorpse(corpse)
      .pipe()
      .subscribe((corpse: Corpse)=> {
        this.onReset()
        this.router.navigateByUrl("/corpse")
      },
      (error : any) => {
        console.error(error)
      },
      )
    
  }

  onReset(): void {
    this.corpse = undefined;
    this.corpseForm.reset();
  }
}


