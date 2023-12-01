import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

// Components
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormLoginComponent } from '../../components/form-login/form-login.component';
import { FormCadastroComponent } from '../../components/form-cadastro/form-cadastro.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    FormLoginComponent,
    FormCadastroComponent,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // Variaveis do componente.
  protected cardForm!: boolean;
  protected cardInfoCad!: string;
  protected cardInfoLogin!: string;

  constructor(private router: Router) {
    // Iniciando o componente com o formulario de login ativo.
    this.cardForm = true;
  }

  // Metodo para a troca entre os formularios de login e cadastro.
  protected toggleForm() {
    // Se true: formulario de login ativo.
    // Se false: formulario de cadastro ativo.
    if (this.cardForm == true) {
      this.cardForm = false;
    } else {
      this.cardForm = true;
    }
  }

  // Metodo que recebe a resposta do cadastramento do usuário para renderizar no cartão de informação.

  // Para erro: Ativa o card informativo de erro.
  // Para succes: ativa o card informativo de sucesso.
  protected getInfoCad(event: string) {
    this.cardInfoCad = event;

    // Criando um temporizador de vizualizacao do card informativo.
    if (this.cardInfoCad != '') {
      setTimeout(() => {
        this.cardInfoCad = '';
      }, 4000);
    }
  }

  // Metodo que recebe a resposta do login do usuário para renderizar no cartão de informação.

  // Para erro: Ativa o card informativo de erro.
  // Para succes: ativa o card informativo de sucesso.
  protected getInfoLogin(event: string) {
    this.cardInfoLogin = event;

    // Se o login for bem sucedido, redireciona o usuario para pagina home depois de 2s.
    if (this.cardInfoLogin === 'loginSucces') {
      setTimeout(() => {
        this.router.navigateByUrl('home');
      }, 2000);
    } else {
      // Criando um temporizador de vizualizacao do card informativo.
      setTimeout(() => {
        this.cardInfoLogin = '';
      }, 4000);
    }
  }
}
