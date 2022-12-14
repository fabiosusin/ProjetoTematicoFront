import { BasePage } from './../../../core/components/base-page';
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
import { FilesService } from 'src/app/core/services/files/files.service';
import { GeneralService } from 'src/app/core/services/general/general.service';
import { Location } from '@angular/common';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { MenuSystemTypeEnum } from 'src/app/core/services/menu/menu.service';


@Component({
  selector: 'app-Person-page',
  templateUrl: './Person.page.html',
  styleUrls: ['./Person.page.scss']
})
export class PersonPage extends BasePage implements OnInit {
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private personService: PersonService,
    private pageTitleService: PageTitleService,
    private providerService: ProviderService,
    protected location: Location,
    protected provider: ProviderService,
    protected generalService: GeneralService,
    protected filesService: FilesService) {
    super(location, provider, generalService, filesService);
  }

  form?: FormGroup;
  userSession?: UserData;
  isMasterUser: boolean = false;
  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'cpfCnpj', 'edit', 'delete'];
  dataSource: Person[] = [];
  isMain: boolean = false;
  filters: PersonFiltersInput = new PersonFiltersInput();

  name?: string;

  async ngOnInit(): Promise<void> {
    this.pageTitleService.changePageTitle('Pessoas');
    this.isMain = HelperService.SystemType() == MenuSystemTypeEnum.Ciap;
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
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar buscar as Pessoas!')

      this.dataSource = result?.persons ?? [];
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar buscar as Pessoas!')
    }
    finally {
      this.isLoading = false;
    }
  }

  onClickDelete = async (id: string) => {
    if (!confirm("Deseja deletar o Pessoa?"))
      return;

    try {
      this.isLoading = true;
      const result = await this.personService.deletePerson(id);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar deletar a Pessoa!')
        return;
      }

      this.providerService.toast.successMessage('Pessoa deletada com sucesso!');
      this.getData();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar deletar a Pessoa!')
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

  async export() {
    try {
      this.isLoading = true;

      const result = await this.personService.export()
      if (!result?.fileContents)
        this.providerService.toast.warningMessage('Ocorreu um erro ao tentar exportar as Pessoas!')

      super.downloadDocument(result);
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar exportar as Pessoas!')
    }
    finally {
      this.isLoading = false;
    }
  }

  async import(event: any) {
    const base64Output = await HelperService.GetBase64FromFile(event);
    if (!base64Output?.success) {
      this.providerService.toast.errorMessage(base64Output?.message ?? 'N??o foi poss??vel importar as Pessoas');
      return;
    }

    try {
      this.isLoading = true;
      const result = await this.personService.import({ dataBase64: base64Output.base64  })
      if (result?.success) {
        this.providerService.toast.successMessage('Contrato Anexado com Sucesso');
        this.getData();
      }
      else
        this.providerService.toast.errorMessage(result?.message ?? 'N??o foi poss??vel importar as Pessoas');
    }
    finally {
      this.isLoading = false;
    }
  }

  private assignForm = async () => {
    this.form = this.formBuilder.group({
      name: [''],
      cpfCnpj: ['']
    });
  };
}
