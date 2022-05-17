import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  idProdutoEdit!: number;
  constructor(
    private fb: FormBuilder,
    public validacao: ValidarCamposService,
    private service: ProdutosService,
    public dialog: MatDialog,
    private router: Router,
    private activated: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idProdutoEdit = this.activated.snapshot.params['id'];

    if (this.idProdutoEdit) {
      this.service
        .visualizar(this.idProdutoEdit)
        .subscribe((produto: Produto) => {
          this.criarFormulario(produto);
        });
    } else {
      this.criarFormulario(this.criarProdutoEmBranco());
    }
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
    const produto = this.cadastroForm.getRawValue() as Produto;

    if (this.idProdutoEdit) {
      produto.id = this.idProdutoEdit;
      this.editar(produto);
    } else {
      this.salvar(produto);
    }
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

  editar(produto: Produto): void {
    this.service.editar(produto).subscribe(
      (response) => {
        const config = {
          data: {
            btnSucesso: 'Ir para a listagem',
            titulo: 'Registro atualizado com sucesso',
            possuiBtnFechar: true,
            colorBtnCancelar: 'primary',
          } as Alerta,
        };
        const dialogRef = this.dialog.open(AlertComponent, config);
        // caso for sucesso, ele vai para a parte de listagem
        // do contrario limpa o formulario
        dialogRef.afterClosed().subscribe((opcao: boolean) => {
          if (opcao) {
            this.router.navigateByUrl('/produtos');
          }
        });
      },
      (err) => {
        const config = {
          data: {
            btnSucesso: 'Fechar',
            titulo: 'Error ao editar o registro',
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

  criarFormulario(produto: Produto) {
    this.cadastroForm = this.fb.group({
      nome: [produto.nome, [Validators.required, Validators.minLength(10)]],
      dtCompra: [produto.dtCompra, Validators.required],
      preco: [
        produto.preco,
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
    });
  }

  criarProdutoEmBranco(): Produto {
    return {} as Produto;
  }
}
