import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './modules/produto/cadastro/cadastro.component';
import { ListagemComponent } from './modules/produto/listagem/listagem.component';
import { ProdutoModule } from './modules/produto/produto.module';
import { VisualizarProdutoComponent } from './modules/produto/visualizar-produto/visualizar-produto.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'produtos',
    pathMatch: 'full',
  },
  {
    path: 'produtos',
    children: [
      {
        path: '',
        component: ListagemComponent,
      },
      {
        path: 'cadastro',
        children: [
          {
            path: '',
            component: CadastroComponent
          },
          {
            path: ':id',
            component: CadastroComponent
          }
        ]
      },
      {
        path: 'visualizar',
        component: VisualizarProdutoComponent,
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', redirectTo: 'produtos' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProdutoModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
