import { Situation } from './../../models/output/situation';
import { FrequencyService } from './../../../frequency/services/frequency.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { MatDialog } from '@angular/material/dialog';
import { PageTitleService } from 'src/app/core/services/page-title/page-title.service';
import { UserData } from 'src/app/core/models/output/session-output';
import { Company } from 'src/app/companies/models/output/company';
import { SituationDialog } from '../edit/situation.dialog';
import { SituationService } from '../../services/situation.service';
import { BasePage } from 'src/app/core/components/base-page';
import { Location } from '@angular/common';
import { FilesService } from 'src/app/core/services/files/files.service';
import { GeneralService } from 'src/app/core/services/general/general.service';

@Component({
  selector: 'app-situation-page',
  templateUrl: './situation.page.html',
  styleUrls: ['./situation.page.scss']
})
export class SituationListPage extends BasePage implements OnInit {
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private situationService: SituationService,
    private pageTitleService: PageTitleService,
    private frequencyService: FrequencyService,
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
  displayedColumns: string[] = ['personDocument', 'processNumber', 'varaOrigem', 'convictionQuantity', 'convictionType', 'fulfilledHours', 'remainingHours', 'finePrice', 'crimeType', 'report', 'edit', 'delete'];
  dataSource: Situation[] = [];

  name?: string;

  async ngOnInit(): Promise<void> {
    this.pageTitleService.changePageTitle('Situa????o');
    this.getData();
    this.assignForm();
  }


  openDialog(data?: Situation): void {
    const dialogRef = this.dialog.open(SituationDialog, {
      width: '700px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => { this.getData(); });
  }

  submit = async () => {
    this.getData(this.form?.get('process')?.value ?? 0);
  }

  getData = async (number?: number) => {
    try {
      this.userSession = this.providerService.sessionService.getSession().user;
      this.isMasterUser = this.userSession?.isMasterUser ?? false;
      this.isLoading = true;

      const result = await this.situationService.getList(number ?? 0)
      if (!result?.success)
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar buscar as Situa????os!')

      this.dataSource = result?.situations ?? [];
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar buscar as Situa????os!')
    }
    finally {
      this.isLoading = false;
    }
  }

  onClickDelete = async (id: string) => {
    if (!confirm("Deseja deletar a Situa????o?"))
      return;

    try {
      this.isLoading = true;
      const result = await this.situationService.deleteSituation(id);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar deletar a Situa????o!')
        return;
      }

      this.providerService.toast.successMessage('Situa????o deletada com sucesso!');
      this.getData();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar deletar a Situa????o!')
    }
    finally {
      this.isLoading = false;
    }
  }

  async report(doc: string) {
    try {
      this.isLoading = true;

      const result = await this.frequencyService.report({ filters: { cpfCnpj: doc } })
      if (!result?.fileContents)
        this.providerService.toast.warningMessage('Ocorreu um erro ao tentar gerar o Relat??rio!')

      super.downloadDocument(result);
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar exportar os Clientes!')
    }
    finally {
      this.isLoading = false;
    }
  }

  private assignForm = async () => {
    this.form = this.formBuilder.group({
      process: [0]
    });
  };
}
