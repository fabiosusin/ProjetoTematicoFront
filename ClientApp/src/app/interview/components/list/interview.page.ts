import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageTitleService } from 'src/app/core/services/page-title/page-title.service';
import { UserData } from 'src/app/core/models/output/session-output';
import { InterviewDialog } from '../edit/interview.dialog';
import { InterviewService } from '../../services/interview.service';
import { Interview } from '../../models/output/interview';

@Component({
  selector: 'app-interview-page',
  templateUrl: './interview.page.html',
  styleUrls: ['./interview.page.scss'],
})
export class InterviewListPage implements OnInit {
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private pageTitleService: PageTitleService,
    private interviewService: InterviewService,
    private providerService: ProviderService
  ) {}

  form?: FormGroup;
  userSession?: UserData;
  isMasterUser: boolean = false;
  isLoading: boolean = false;
  displayedColumns: string[] = [
    'familyIncome',
    'workSkills',
    'city',
    'neighborhood',
    'street',
    'streetNumber',
    'phone',
    'complement',
    'serviceHours',
    'edit',
    'delete',
  ];
  dataSource: Interview[] = [];

  name?: string;

  ngOnInit(): void {
    this.pageTitleService.changePageTitle('Entrevista');
    this.getData();
    this.assignForm();
  }

  openDialog(data?: Interview): void {
    const dialogRef = this.dialog.open(InterviewDialog, {
      width: '700px',
      data: data,
      disableClose: true,
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

      const result = await this.interviewService.getList()
      if (!result?.success)
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar buscar as Entrevistas!')

      this.dataSource = result?.interviews ?? [];
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar buscar as Entrevistas!')
    }
    finally {
      this.isLoading = false;
    }
  }

  onClickDelete = async (id: string) => {
    if (!confirm("Deseja deletar a Entrevista?"))
      return;

    try {
      this.isLoading = true;
      const result = await this.interviewService.deleteInterview(id);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar deletar a Entrevista!')
        return;
      }

      this.providerService.toast.successMessage('Entrevista deletada com sucesso!');
      this.getData();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar deletar a Entrevista!')
    }
    finally {
      this.isLoading = false;
    }
  }

  private assignForm = async () => {
    this.form = this.formBuilder.group({
      name: [''],
      cpfCnpj: [''],
    });
  };
}
