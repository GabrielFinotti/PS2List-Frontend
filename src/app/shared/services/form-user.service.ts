import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormUser } from '../../model/interfaces/form-user';

@Injectable({
  providedIn: 'root',
})
export class FormUserService {
  // Variaveis de uso do servico.
  private url!: string;

  constructor(private http: HttpClient) {
    // Setando a url da api.
    this.url = 'api-ps2list.up.railway.app/api/usr';
  }

  // Buscar Usuário
  public getUser(email: string, password: string): Observable<Array<FormUser>> {
    // Enviando os dados de email e senha para a api. Se positivo, esperando um retorno em json do nome do usuario relativo os valores enviados.
    return this.http.post<Array<FormUser>>(`${this.url}/get.php`, {
      email: email,
      password: password,
    });
  }

  // Cadastrar usuário.
  public setUser(
    user: string,
    email: string,
    password: string
  ): Observable<Array<FormUser>> {
    // Enviando os dados de cadastro para a api. Se positivo, esperando um retorno em json dos mesmos dados cadastrado nao renderizado para o usuario.
    return this.http.post<Array<FormUser>>(`${this.url}/post.php`, {
      user: user,
      email: email,
      password: password,
    });
  }

  // Listar usuarios.
  public listUser(): Observable<string[]> {
    // Recebendo os dados de todos os usuarios cadastrados recuperados do banco de dados.
    return this.http.get<string[]>(`${this.url}/get.php`);
  }

  // Excluir usuario.
  public deleteUser(user: string): Observable<string[]> {
    // Enviando o nome de usuario para a api. Se positvo, exclui o usuario do banco de dados.
    return this.http.post<string[]>(`${this.url}/delete.php`, {
      user: user,
    });
  }
}
