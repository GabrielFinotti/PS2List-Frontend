import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Components
import { NavBarComponent } from '../../shared/components/nav-bar/nav-bar.component';
import { FooterComponent } from '../../shared/components/footer/footer.component';
import { FormUserService } from '../../shared/services/form-user.service';
import { UserNameService } from '../../shared/services/user-name.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavBarComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  // Variaveis do componente.
  protected user!: Array<string>;
  protected userLogin!: string;

  constructor(
    private formUserService: FormUserService,
    private userNameService: UserNameService,
    private router: Router
  ) {}

  // Funcao executada toda vez que o componente e inicalizado.
  ngOnInit(): void {
    // Recebendo o dado do nome do usuario que efetuou o login.
    this.userNameService.userHome.subscribe((res) => {
      // Setando o nome de usuario para renderizacao.
      this.userLogin = res;
    });

    // Recuperando os nomes dos usuários cadastrados no banco de dados.
    this.formUserService.listUser().subscribe(
      // Se positivo, seta os nomes dos usuarios na variavel para renderizacao.
      (res) => {
        this.user = res;
      },
      // Se nao efetuado, exibi no console o erro.
      (erro) => {
        console.error(`Lista indisponivel, erro: ${erro.message}`);
      }
    );
  }

  // Metodo que retorna para a pagina de login.
  protected returnLogin() {
    this.router.navigateByUrl('/');
  }

  // Metodo que exclui o usuario selecionado.
  protected deleteUser(user: string) {
    // Se excluido com sucesso, exclui a renderizacao do nome do usuario na tabela para vizualizacao do cliente, do contrario, retorna uma mensagem de erro no console.
    this.formUserService.deleteUser(user).subscribe(
      (res) => {
        const index = this.user.indexOf(user);
        if (index >= 0) {
          this.user.splice(index, 1);
        }
      },
      (erro) => {
        console.error(`Erro ao excluir usuario, erro: ${erro.message}`);
      }
    );
  }
}
