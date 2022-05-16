import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProdutosService } from 'src/app/core/service/produtos.service';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Produto } from 'src/app/shared/models/produto';
import { debounceTime } from 'rxjs';
@Component({
  selector: 'app-listagem',
  templateUrl: './listagem.component.html',
  styleUrls: ['./listagem.component.scss'],
})
export class ListagemComponent implements OnInit {
  produtos: Produto[] = [];

  config: ConfigParams = {
    pagina: 0,
    limite: 4,
  };

  constructor(private service: ProdutosService, private fb: FormBuilder) {}

  filtragem!: FormGroup;

  ngOnInit(): void {
    this.criarListagemForm();

    // verificar o valor digitado
    this.filtragem
      .get('pesquisa')
      ?.valueChanges.pipe(debounceTime(400))
      .subscribe((val: string) => {
        this.config.pesquisa = val;
        this.resetarConsulta();
      });

    this.listarProdutos();
  }

  criarListagemForm(): void {
    this.filtragem = this.fb.group({
      pesquisa: ['', Validators.required],
    });
  }

  onScroll() {
    this.listarProdutos();
  }

  private listarProdutos(): void {
    this.config.pagina = this.config.pagina + 1;
    this.service
      .listar(this.config)
      .subscribe((produtos: Produto[]) => this.produtos.push(...produtos));
  }

  resetarConsulta() {
    this.config.pagina = 0;
    this.produtos = [];
    this.listarProdutos();
  }
}
