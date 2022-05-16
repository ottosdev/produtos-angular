import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { AbstractConstructor } from '@angular/material/core/common-behaviors/constructor';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrls: ['./input-text.component.scss']
})
export class InputTextComponent {

    @Input() formGroup!: FormGroup;
    @Input() controlNome!: string;
    @Input() titulo!: string;

  constructor(public validacao: ValidarCamposService) { }

  get formControl() : AbstractControl {
    return this.formGroup.controls[this.controlNome];
  }

}
