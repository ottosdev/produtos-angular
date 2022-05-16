import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigParams } from 'src/app/shared/models/config-params';
import { Produto } from 'src/app/shared/models/produto';
import { ConfigParamsService } from './config-params.service';
const url = 'http://localhost:3000/produtos/';
@Injectable({
  providedIn: 'root',
})
export class ProdutosService {
  constructor(private http: HttpClient, private configService: ConfigParamsService) {}

  salvar(produto: Produto): Observable<Produto> {
    return this.http.post<Produto>(url, produto);
  }

  listar(config: ConfigParams): Observable<Produto[]> {
   const configParams = this.configService.configurarParametros(config);

    return this.http.get<Produto[]>(url, { params: configParams });
  }
}
