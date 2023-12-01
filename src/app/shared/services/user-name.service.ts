import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserNameService {
  // Criando o emissor do dado do nome de usuario que sera recebido ao efetuar o login.
  private userSubject = new BehaviorSubject<string>('');

  // Variavel para obsevar as mudancas do emissor do dado.
  public userHome: Observable<string> = this.userSubject.asObservable();

  // Metodo que recebe o dado do nome de usuario que foi efetuado o login.
  public setUserName(user: string) {
    // Enviando o ultimo dado recebido do nome de usuario.
    this.userSubject.next(user);
  }
}
