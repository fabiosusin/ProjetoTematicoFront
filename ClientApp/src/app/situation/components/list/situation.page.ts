import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { MatDialog } from '@angular/material/dialog';
import { PageTitleService } from 'src/app/core/services/page-title/page-title.service';
import { UserData } from 'src/app/core/models/output/session-output';
import { Company } from 'src/app/companies/models/output/company';
import { SituationDialog } from '../edit/situation.dialog';

@Component({
  selector: 'app-situation-page',
  templateUrl: './situation.page.html',
  styleUrls: ['./situation.page.scss']
})
export class SituationListPage implements OnInit {
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private pageTitleService: PageTitleService,
    private providerService: ProviderService) {
  }

  form?: FormGroup;
  userSession?: UserData;
  isMasterUser: boolean = false;
  isLoading: boolean = false;
  displayedColumns: string[] = ['numeroProcesso', 'varaOrigem','condenaAnteriores', 'tipoCondenaAnteriores', 'horasCumpridas','horasRestantes', 'valorMulta', 'tipoCrime', 'dataPena', 'edit', 'delete'];
  dataSource: Company[] = [];

  name?: string;

  ngOnInit(): void {
    this.pageTitleService.changePageTitle('Situação');
    this.assignForm();
  }


  openDialog(data?: Company): void {
    const dialogRef = this.dialog.open(SituationDialog, {
      width: '700px',
      data: data,
      disableClose: true
    });

    // dialogRef.afterClosed().subscribe(() => { this.getData(); });
  }

  private assignForm = async () => {
    this.form = this.formBuilder.group({
      name: [''],
      cpfCnpj: ['']
    });
  };
}
