import { Company } from '../../models/output/company';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProviderService } from 'src/app/core/services/provider/provider.service';
import { CompanyFilters } from '../../models/input/company-filters-input';
import { CompanyFiltersInput } from '../../models/input/company-list-input';
import { CompanyService } from '../../services/company.service';
import { MatDialog } from '@angular/material/dialog';
import { PageTitleService } from 'src/app/core/services/page-title/page-title.service';
import { UserData } from 'src/app/core/models/output/session-output';
import { CompanyDialog } from '../edit/company.dialog';

@Component({
  selector: 'app-company-page',
  templateUrl: './company.page.html',
  styleUrls: ['./company.page.scss']
})
export class CompanyPage implements OnInit {
  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private CompanyService: CompanyService,
    private pageTitleService: PageTitleService,
    private providerService: ProviderService) {
  }

  form?: FormGroup;
  userSession?: UserData;
  isMasterUser: boolean = false;
  isLoading: boolean = false;
  displayedColumns: string[] = ['name', 'cnpj', 'edit', 'delete'];
  dataSource: Company[] = [];
  filters: CompanyFiltersInput = new CompanyFiltersInput();

  name?: string;

  ngOnInit(): void {
    this.pageTitleService.changePageTitle('Parceiros');
    this.getData();
    this.assignForm();
  }

  submit = async (input: CompanyFilters) => {
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

      const result = await this.CompanyService.getList(this.filters)
      if (!result?.success)
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar buscar os Parceiros!')

      this.dataSource = result?.companies ?? [];
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar buscar os Parceiros!')
    }
    finally {
      this.isLoading = false;
    }
  }

  onClickDelete = async (id: string) => {
    if (!confirm("Deseja deletar o Parceiro?"))
      return;

    try {
      this.isLoading = true;
      const result = await this.CompanyService.deleteCompany(id);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar deletar o Parceiro!')
        return;
      }

      this.providerService.toast.successMessage('Parceiro deletado com sucesso!');
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

  openDialog(data?: Company): void {
    const dialogRef = this.dialog.open(CompanyDialog, {
      width: '700px',
      data: data,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(() => { this.getData(); });
  }

  private assignForm = async () => {
    this.form = this.formBuilder.group({
      name: [''],
      cnpj: ['']
    });
  };
}
