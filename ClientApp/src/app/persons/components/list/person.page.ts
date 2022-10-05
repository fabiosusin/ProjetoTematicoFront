import { Person } from '../../models/output/person';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { PersonFilters } from '../../models/input/person-filters-input';
import { PersonFiltersInput } from '../../models/input/person-list-input';
import { PersonService } from '../../services/person.service';
import { MatDialog } from '@angular/material/dialog';
import { PageTitleService } from 'src/app/core/services/page-title/page-title.service';
import { UserData } from 'src/app/core/models/output/session-output';
import { PersonDialog } from '../edit/person.dialog';

@Component({
  selector: 'app-Person-page',
  templateUrl: './Person.page.html',
  styleUrls: ['./Person.page.scss']
})
export class PersonPage implements OnInit {
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private pageTitleService: PageTitleService,
    private providerService: ProviderService) {
  }

  form?: FormGroup;
  userSession?: UserData;
  isMasterUser: boolean = false;
  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'cpfCnpj', 'edit', 'delete'];
  dataSource: Person[] = [];
  filters: PersonFiltersInput = new PersonFiltersInput();

  name?: string;

  ngOnInit(): void {
    this.pageTitleService.changePageTitle('Pessoas');
    this.getData();
    this.assignForm();
  }

  submit = async (input: PersonFilters) => {
    this.filters.filters = input
    this.getData();
  }

  getData = async () => {
    try {
      this.userSession = this.providerService.sessionService.getSession().user;
      this.isMasterUser = this.userSession?.isMasterUser ?? false;
      this.isLoading = true;

      if (!this.filters.filters)
        this.filters.filters = {};

      const result = await this.personService.getList(this.filters)
      if (!result?.success)
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar buscar os Clientes!')

      this.dataSource = result?.persons ?? [];
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar buscar os Clientes!')
    }
    finally {
      this.isLoading = false;
    }
  }

  onClickDelete = async (id: string) => {
    if (!confirm("Deseja deletar o Cliente?"))
      return;

    try {
      this.isLoading = true;
      const result = await this.personService.deletePerson(id);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar deletar o Cliente!')
        return;
      }

      this.providerService.toast.successMessage('Cliente deletado com sucesso!');
      this.getData();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar deletar o Cliente!')
    }
    finally {
      this.isLoading = false;
    }
  }

  openDialog(data?: Person): void {
    const dialogRef = this.dialog.open(PersonDialog, {
      width: '700px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => { this.getData(); });
  }

  private assignForm = async () => {
    this.form = this.formBuilder.group({
      name: [''],
      cpfCnpj: ['']
    });
  };
}
