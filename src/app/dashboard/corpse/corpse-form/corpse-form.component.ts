import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EMPTY } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Corpse } from '../model/corpse-model';
import { CorpseService } from '../service/corpse.service';


@Component({
  selector: 'app-corpse-form',
  templateUrl: './corpse-form.component.html',
  styleUrls: ['./corpse-form.component.scss']
})
export class CorpseFormComponent implements OnInit {

  corpseForm: FormGroup = new FormGroup({
    name: new FormControl(),
    location: new FormControl(),
    date: new FormControl(),
    parentName: new FormControl(),
  });

  setFormValues(corpse: Corpse): void {
    this.corpseForm.addControl('id', new FormControl);
    this.corpseForm.get('id')?.setValue(corpse.id);
    this.corpseForm.get('name')?.setValue(corpse.name);
    this.corpseForm.get('location')?.setValue(corpse.location);
    this.corpseForm.get('date')?.setValue(corpse.date);
    this.corpseForm.get('parentName')?.setValue(corpse.parentName);
  }

  corpse?: Corpse;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly corpseService: CorpseService,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    
  }

  addCorpse(): void {
    const corpse: Corpse = this.corpseForm.value;
    console.log('corpse form value:', corpse);

    this.corpseService
      .addCorpse(corpse)
      .pipe()
      .subscribe((corpse: Corpse)=> {
        this.onReset()
        this.router.navigateByUrl("/corpses")
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


