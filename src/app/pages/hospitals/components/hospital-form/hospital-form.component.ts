import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { HospitalsService } from '../../services/hospitals.service';
import { isInvalid } from 'src/app/shared/utils/helpers';
import { formMessages } from 'src/app/shared/utils/messages';
import { FormMode } from 'src/app/shared/models/form-mode.model';
import { masks } from 'src/app/shared/utils/masks';

@Component({
  selector: 'app-hospital-form',
  templateUrl: './hospital-form.component.html',
  styleUrls: ['./hospital-form.component.scss'],
})
export class HospitalFormComponent implements OnInit {
  formMessages = formMessages;
  masks = masks;
  mode: FormMode = '';
  title: string = '';
  id: string | null = null;

  hospitalForm = this.fb.group({
    id: [{ value: '', disabled: true }],
    name: ['', [Validators.required]],
    landlineNumber: ['', [Validators.required]],
    address: this.fb.group({
      street: ['', [Validators.required]],
      number: ['', [Validators.required]],
      neighborhood: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      zipCode: ['', [Validators.required]],
    }),
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly hospitalsService: HospitalsService
  ) {}

  ngOnInit(): void {
    this.mode = this.getMode();
    this.title = this.getTitle();
    this.id = this.route.snapshot.params['id'] || null;

    if (this.id) this.fillInputs(+this.id);
  }

  fillInputs(id: number) {
    this.hospitalsService.getById(Number(id)).subscribe(
      (hospital) => {
        this.hospitalForm.patchValue({
          id: hospital.id,
          name: hospital.name,
          landlineNumber: hospital.landlineNumber,
          address: hospital.address,
        });
      },
      (error) => {
        console.error('Error ao carregar os dados do hospital', error);
      }
    );
  }

  onSubmit() {
    if (!this.hospitalForm.valid) {
      this.hospitalForm.markAllAsTouched();
      return;
    }

    const payload = this.hospitalForm.value;

    if (this.mode === 'create') {
      this.hospitalsService.create(payload).subscribe(
        (response) => {
          console.log('Hospital cadastrado com sucesso!', response);
          this.router.navigate(['/hospitals']);
        },
        (error) => {
          console.error('Error ao criar hospital', error);
        }
      );
    } else if (this.mode === 'edit' && this.id) {
      this.hospitalsService.update(+this.id, payload).subscribe(
        (response) => {
          console.log('Hospital atualizado com sucesso!', response);
          this.router.navigate(['/hospitals']);
        },
        // (error) => {
        //   console.error('Error ao atualizar hospital', error);
        // }
      );
    }
  }

  getMode(): FormMode {
    const path = this.route.snapshot.routeConfig?.path;

    if (path?.startsWith('create')) return 'create';
    else if (path?.startsWith('edit')) return 'edit';

    return '';
  }

  getTitle() {
    return this.mode === 'create' ? 'Cadastrar Hospital' : 'Editar Hospital';
  }

  isInvalid(field: string, validator: string): boolean {
    return isInvalid(this.hospitalForm, field, validator);
  }
}
