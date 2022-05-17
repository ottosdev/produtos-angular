import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutosService } from 'src/app/core/service/produtos.service';
import { AlertComponent } from 'src/app/shared/components/alert/alert.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Produto } from 'src/app/shared/models/produto';

@Component({
  selector: 'app-visualizar-produto',
  templateUrl: './visualizar-produto.component.html',
  styleUrls: ['./visualizar-produto.component.scss'],
})
export class VisualizarProdutoComponent implements OnInit {
  produto!: Produto;
  idProduto!: number;
  constructor(
    private activatedRoute: ActivatedRoute,
    private produtosService: ProdutosService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.idProduto = this.activatedRoute.snapshot.params['id'];
    this.visualizar();
  }

  private visualizar(): void {
    this.produtosService
      .visualizar(this.idProduto)
      .subscribe((res: Produto) => {
        this.produto = res;
      });
  }

  excluir() {
    const config = {
      data: {
        titulo: 'Voce quer excluir?',
        descricao: 'Caso voce tenha certeza... clique no botao ok',
        possuiBtnFechar: true,
      } as Alerta,
    };
    const dialogRef = this.dialog.open(AlertComponent, config);
    // caso for sucesso, ele vai para a parte de listagem
    // do contrario limpa o formulario
    dialogRef.afterClosed().subscribe((opcao: boolean) => {
      if (opcao) {
        this.produtosService.excluir(this.idProduto).subscribe(() => {
          this.router.navigateByUrl("/produtos");
        });
      }
    });
  }


  editar() {
    this.router.navigateByUrl("/produtos/cadastro/" + this.idProduto)
  }
}
