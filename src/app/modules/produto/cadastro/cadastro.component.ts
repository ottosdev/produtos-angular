import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ProdutosService } from 'src/app/core/service/produtos.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Produto } from 'src/app/shared/models/produto';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
})
export class CadastroComponent implements OnInit {
  cadastroForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public validacao: ValidarCamposService,
    private service: ProdutosService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.criarFormulario();
  }

  get f() {
    return this.cadastroForm.controls;
  }

  submit() {
    this.cadastroForm.markAllAsTouched();
    console.log(this.cadastroForm);
    if (this.cadastroForm.invalid) {
      return;
    }

    // pega todos os valores dentro do formulario
    const filme = this.cadastroForm.getRawValue() as Produto;

    this.salvar(filme);
    // alert(JSON.stringify(this.cadastroForm.value, null, 4));
  }

  salvar(produto: Produto): void {
    this.service.salvar(produto).subscribe(
      (response) => {
        const config = {
          data: {
            btnSucesso: 'Ir para a listagem',
            btnCancelar: 'Cadastrar um novo produto',
            possuiBtnFechar: true,
            colorBtnCancelar: 'primary',
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertComponent, config);
        // caso for sucesso, ele vai para a parte de listagem
        // do contrario limpa o formulario
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.router.navigateByUrl('produtos');
          } else {
            this.reset();
          }
        });
      },
      (err) => {
        const config = {
          data: {
            btnSucesso: 'Fechar',
            titulo: 'Error ao cadastrar',
            descricao: 'Nao conseguimos salvar seu registro',
            colorBtnSucesso: 'warn',
          } as Alerta,
        };
        this.dialog.open(AlertComponent, config);
      }
    );
  }

  reset() {
    this.cadastroForm.reset();
  }

  criarFormulario() {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(10)]],
      dtCompra: ['', Validators.required],
      preco: ['', [Validators.required, Validators.min(0), Validators.max(10)]],
    });
  }
}
