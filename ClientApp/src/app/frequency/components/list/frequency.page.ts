import { BasePage } from './../../../core/components/base-page';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { MatDialog } from '@angular/material/dialog';
import { PageTitleService } from 'src/app/core/services/page-title/page-title.service';
import { UserData } from 'src/app/core/models/output/session-output';
import { FrequencyDialog } from '../edit/frequency.dialog';
import { FrequencyService } from '../../services/frequency.service';
import { Frequency } from '../../models/output/frequency';
import { FilesService } from 'src/app/core/services/files/files.service';
import { GeneralService } from 'src/app/core/services/general/general.service';
import { Location } from '@angular/common';
import { HelperService } from 'src/app/core/services/helper/helper.service';
import { FrequencyFilters } from '../../models/input/frequency-filters-input';
import { FrequencyFiltersInput } from '../../models/input/frequency-list-input';

@Component({
  selector: 'app-frequency-page',
  templateUrl: './frequency.page.html',
  styleUrls: ['./frequency.page.scss']
})
export class FrequencyListPage extends BasePage implements OnInit {
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private frequencyService: FrequencyService,
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
  displayedColumns: string[] = ['personDocument', 'activity', 'entryTime', 'exitTime', 'activityTotalTime', 'fulfilledHours', 'remainingHours', 'edit', 'delete'];
  dataSource: Frequency[] = [];
  filters: FrequencyFiltersInput = new FrequencyFiltersInput();

  name?: string;

  async ngOnInit(): Promise<void> {
    this.pageTitleService.changePageTitle('Frequência');
    this.getData();
    this.assignForm();
  }


  openDialog(data?: Frequency): void {
    const dialogRef = this.dialog.open(FrequencyDialog, {
      width: '700px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => { this.getData(); });
  }

  submit = async (input: FrequencyFilters) => {
    this.filters.filters = input
    this.getData();
  }

  getData = async () => {
    try {
      this.userSession = this.providerService.sessionService.getSession().user;
      this.isMasterUser = this.userSession?.isMasterUser ?? false;
      this.isLoading = true;

      const result = await this.frequencyService.getList(this.filters)
      if (!result?.success)
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar buscar as Frequências!')

      this.dataSource = result?.frequencies ?? [];
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar buscar as Frequências!')
    }
    finally {
      this.isLoading = false;
    }
  }

  onClickDelete = async (id: string) => {
    if (!confirm("Deseja deletar a Frequência?"))
      return;

    try {
      this.isLoading = true;
      const result = await this.frequencyService.deleteFrequency(id);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar deletar a Frequência!')
        return;
      }

      this.providerService.toast.successMessage('Frequência deletada com sucesso!');
      this.getData();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar deletar a Frequência!')
    }
    finally {
      this.isLoading = false;
    }
  }

  async export() {
    try {
      this.isLoading = true;

      const result = await this.frequencyService.export(this.filters)
      if (!result?.fileContents)
        this.providerService.toast.warningMessage('Ocorreu um erro ao tentar exportar as Frequências!')

      super.downloadDocument(result);
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar exportar as Frequências!')
    }
    finally {
      this.isLoading = false;
    }
  }

  async import(event: any) {
    const base64Output = await HelperService.GetBase64FromFile(event);
    if (!base64Output?.success) {
      this.providerService.toast.errorMessage(base64Output?.message ?? 'Não foi possível importar as Pessoas');
      return;
    }

    try {
      this.isLoading = true;
      const result = await this.frequencyService.import({ dataBase64: base64Output.base64  })
      if (result?.success) {
        this.providerService.toast.successMessage('Contrato Anexado com Sucesso');
        this.getData();
      }
      else
        this.providerService.toast.errorMessage(result?.message ?? 'Não foi possível importar as Pessoas');
    }
    finally {
      this.isLoading = false;
    }
  }

  private assignForm = async () => {
    this.form = this.formBuilder.group({
      activity: [''],
      cpfCnpj: ['']
    });
  };
}
