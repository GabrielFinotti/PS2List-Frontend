import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormUserService } from '../../shared/services/form-user.service';
import { UserNameService } from '../../shared/services/user-name.service';

@Component({
  selector: 'app-form-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './form-login.component.html',
  styleUrl: './form-login.component.scss',
})
export class FormLoginComponent {
  // Enviando um evento para ser recebido pelos cards de informações.
  @Output() private info = new EventEmitter();

  // Variaveis de uso do componente.
  public userName!: string;
  protected login!: FormGroup;
  protected cardInfo!: string;

  constructor(
    private formBuilder: FormBuilder,
    private formUserService: FormUserService,
    private userNameService: UserNameService
  ) {
    // Gerando o formulário de login e suas validações.
    this.login = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      saveUser: [''],
    });
  }

  // Método para buscar o usuário.
  protected getUser() {
    // Fazendo a verificacao se o formulario esta valido antes de executar a requisicao.
    if (this.login.valid) {
      this.formUserService
        .getUser(this.login.value['email'], this.login.value['password'])
        .subscribe(
          (res) => {
            // Emitindo o indicaitvo de sucesso para ativar o cartao de sucesso para informacao vizual para o usuario.
            this.cardInfo = 'loginSucces';
            this.info.emit(this.cardInfo);

            // Pegando o valor da chave user do retorno do servidor.
            this.userName = (res as Record<string, any>)['user'];

            // Enviando o valor da chave user para o servico de compartilhamento do usuario.
            this.userNameService.setUserName(this.userName);
          },
          (error) => {
            // Emitindo a mensagem de erro no console.
            console.log(`Falha ao carregar o save \n Erro: ${error.message}`);

            // Emitindo o indicaitvo do erro para ativar o cartao de erro para informacao vizual para o usuario.
            this.cardInfo = 'loginErro';
            this.info.emit(this.cardInfo);
          }
        );
    }
  }
}
