import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { ValidarCamposService } from '../validar-campos.service';

@Component({
  selector: 'app-input-number',
  templateUrl: './input-number.component.html',
  styleUrls: ['./input-number.component.scss'],
})
export class InputNumberComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() controlNome!: string;
  @Input() titulo!: string;
  @Input() min: number = 0;
  @Input() max: number = 10;
  @Input() step: number = 1;

  constructor(public validacao: ValidarCamposService) {}

  ngOnInit(): void {}

  get formControl() : AbstractControl {
    return this.formGroup.controls[this.controlNome];
  }
}
