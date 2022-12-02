import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { PageTitleService } from 'src/app/core/services/page-title/page-title.service';
import { UserData } from 'src/app/core/models/output/session-output';
import { Company } from 'src/app/companies/models/output/company';
import { InterviewDialog } from '../edit/interview.dialog';

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
    public dialogRef: MatDialogRef<any>,
    private providerService: ProviderService
  ) {}

  form?: FormGroup;
  userSession?: UserData;
  isMasterUser: boolean = false;
  isLoading: boolean = false;
  displayedColumns: string[] = [
    'nome',
    'rendaFamiliar',
    'municipio',
    'habilidadesLaborais',
    'bairro',
    'rua',
    'numero',
    'telefone',
    'complemento',
    'horariosTrabalho',
    'edit',
    'delete',
  ];
  dataSource: Company[] = [];

  name?: string;

  ngOnInit(): void {
    this.pageTitleService.changePageTitle('Entrevista');
    this.assignForm();
  }

  openDialog(data?: Company): void {
    const dialogRef = this.dialog.open(InterviewDialog, {
      width: '700px',
      data: data,
      disableClose: true,
    });

    // dialogRef.afterClosed().subscribe(() => { this.getData(); });
  }

  private assignForm = async () => {
    this.form = this.formBuilder.group({
      name: [''],
      cpfCnpj: [''],
    });
  };

  closeDialog(): void {
    this.dialogRef.close();
  }
}
