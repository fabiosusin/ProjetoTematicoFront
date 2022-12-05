import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { MatDialog } from '@angular/material/dialog';
import { PageTitleService } from 'src/app/core/services/page-title/page-title.service';
import { UserData } from 'src/app/core/models/output/session-output';
import { Company } from 'src/app/companies/models/output/company';
import { SituationDialog } from '../edit/situation.dialog';
import { SituationService } from '../../services/situation.service';

@Component({
  selector: 'app-situation-page',
  templateUrl: './situation.page.html',
  styleUrls: ['./situation.page.scss']
})
export class SituationListPage implements OnInit {
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private situationService: SituationService,
    private pageTitleService: PageTitleService,
    private providerService: ProviderService) {
  }

  form?: FormGroup;
  userSession?: UserData;
  isMasterUser: boolean = false;
  isLoading: boolean = false;
  displayedColumns: string[] = ['processNumber', 'varaOrigem', 'convictionQuantity', 'convictionType', 'fulfilledHours', 'remainingHours', 'finePrice', 'crimeType', 'edit', 'delete'];
  dataSource: Company[] = [];

  name?: string;

  ngOnInit(): void {
    this.pageTitleService.changePageTitle('Situação');
    this.getData();
    this.assignForm();
  }


  openDialog(data?: Company): void {
    const dialogRef = this.dialog.open(SituationDialog, {
      width: '700px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => { this.getData(); });
  }

  submit = async () => {
    this.getData();
  }

  getData = async () => {
    try {
      this.userSession = this.providerService.sessionService.getSession().user;
      this.isMasterUser = this.userSession?.isMasterUser ?? false;
      this.isLoading = true;

      const result = await this.situationService.getList()
      if (!result?.success)
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar buscar as Situaçãos!')

      this.dataSource = result?.situations ?? [];
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar buscar as Situaçãos!')
    }
    finally {
      this.isLoading = false;
    }
  }

  onClickDelete = async (id: string) => {
    if (!confirm("Deseja deletar a Situação?"))
      return;

    try {
      this.isLoading = true;
      const result = await this.situationService.deleteSituation(id);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar deletar a Situação!')
        return;
      }

      this.providerService.toast.successMessage('Situação deletada com sucesso!');
      this.getData();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar deletar a Situação!')
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
