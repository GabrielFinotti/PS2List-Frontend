import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

// Serviços
import { FormUserService } from '../../shared/services/form-user.service';

@Component({
  selector: 'app-form-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgClass],
  templateUrl: './form-cadastro.component.html',
  styleUrl: './form-cadastro.component.scss',
})
export class FormCadastroComponent {
  // Emissor de evento para o cartão de informação.
  @Output() private info = new EventEmitter();

  // Variaveis do componente.
  protected cadastro!: FormGroup;
  protected cardInfo!: string;

  constructor(
    private formBuilder: FormBuilder,
    private formUserService: FormUserService
  ) {
    // Gerando o formulario de cadastro e suas validacoes.
    this.cadastro = this.formBuilder.group({
      user: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(10),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(12),
        ],
      ],
      confPassword: ['', Validators.required],
    });
  }

  //Método para enviar os dados do formulário para cadastro do usuário.
  protected setUser() {
    // Validando se o formulário é válido e se a senha está igual em ambos os inputs de senha antes de enviar os dados!
    if (
      this.cadastro.valid &&
      this.cadastro.value['password'] === this.cadastro.value['confPassword']
    ) {
      // Enviandos os dados para o cadastramento na api.
      this.formUserService
        .setUser(
          this.cadastro.value['user'],
          this.cadastro.value['email'],
          this.cadastro.value['password']
        )
        .subscribe(
          (res) => {
            // Emitindo a resposta de sucesso para o cartão de informação.
            this.cardInfo = 'Succes';
            this.info.emit(this.cardInfo);
            this.cadastro.reset();
          },
          (error) => {
            // Emitindo a mensagem do erro no console.
            console.log(`Falha ao criar o save \n Erro: ${error.message}`);

            // Emitindo a resposta de erro para o cartão de informação.
            this.cardInfo = 'Erro';
            this.info.emit(this.cardInfo);
          }
        );
    } else {
      // Se o formulário for invalido, emitindo o aviso para o cartão de informação.
      this.cardInfo = 'Invalid';
      this.info.emit(this.cardInfo);
    }
  }
}
