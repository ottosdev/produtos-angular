import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'app-input-date',
  templateUrl: './input-date.component.html',
  styleUrls: ['./input-date.component.scss'],
})
export class InputDateComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlNome!: string;
  @Input() titulo!: string;

  constructor(public validacao: ValidarCamposService) {}

  ngOnInit(): void {}

  get formControl(): AbstractControl {
    return this.formGroup.controls[this.controlNome];
  }
}
