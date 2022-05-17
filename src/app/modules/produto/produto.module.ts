import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListagemComponent } from './listagem/listagem.component';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro/cadastro.component';
import { CamposModule } from 'src/app/shared/components/campos/campos.module';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { VisualizarProdutoComponent } from './visualizar-produto/visualizar-produto.component';

@NgModule({
  declarations: [ListagemComponent, CadastroComponent, VisualizarProdutoComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    CamposModule,
    InfiniteScrollModule
  ],
})
export class ProdutoModule {}
