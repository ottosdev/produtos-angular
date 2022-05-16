import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alerta } from '../../models/alerta';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  alerta = {
    titulo: 'Suceso',
    descricao: 'Seu registro foi cadastrado com sucesso',
    btnSucesso: 'Ok',
    btnCancelar: 'Cancelar',
    colorBtnSucesso: 'accent',
    colorBtnCancelar: "warn",
    possuiBtnFechar: false,
  } as Alerta;

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.alerta.titulo = this.data.titulo || this.alerta.titulo;
      this.alerta.descricao = this.data.descricao || this.alerta.descricao;
      this.alerta.btnSucesso = this.data.btnSucesso || this.alerta.btnSucesso;
      this.alerta.btnCancelar = this.data.btnCancelar || this.alerta.btnCancelar;
      this.alerta.colorBtnSucesso = this.data.colorBtnSucesso || this.alerta.colorBtnSucesso;
      this.alerta.colorBtnCancelar = this.data.colorBtnCancelar || this.alerta.colorBtnCancelar;
      this.alerta.possuiBtnFechar = this.data.possuiBtnFechar || this.alerta.possuiBtnFechar;
    }
  }
}
