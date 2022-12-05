import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { MatDialog } from '@angular/material/dialog';
import { PageTitleService } from 'src/app/core/services/page-title/page-title.service';
import { UserData } from 'src/app/core/models/output/session-output';
import { FrequencyDialog } from '../edit/frequency.dialog';
import { FrequencyService } from '../../services/frequency.service';
import { Frequency } from '../../models/output/frequency';

@Component({
  selector: 'app-frequency-page',
  templateUrl: './frequency.page.html',
  styleUrls: ['./frequency.page.scss']
})
export class FrequencyListPage implements OnInit {
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private frequencyService: FrequencyService,
    private pageTitleService: PageTitleService,
    private providerService: ProviderService) {
  }

  form?: FormGroup;
  userSession?: UserData;
  isMasterUser: boolean = false;
  isLoading: boolean = false;
  displayedColumns: string[] = ['activity', 'entryTime', 'exitTime', 'activityTotalTime', 'fulfilledHours', 'remainingHours', 'edit', 'delete'];
  dataSource: Frequency[] = [];

  name?: string;

  ngOnInit(): void {
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

  submit = async () => {
    this.getData();
  }

  getData = async () => {
    try {
      this.userSession = this.providerService.sessionService.getSession().user;
      this.isMasterUser = this.userSession?.isMasterUser ?? false;
      this.isLoading = true;

      const result = await this.frequencyService.getList()
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

  private assignForm = async () => {
    this.form = this.formBuilder.group({
      name: [''],
      cpfCnpj: ['']
    });
  };
}
