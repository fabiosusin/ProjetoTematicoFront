import { ProviderService } from '../../../core/services/provider/provider.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpfCnpjValidator } from 'src/app/core/functions/cpf-cnpj-validator.function';
import { CompanyService } from '../../services/company.service';
import { Company } from '../../models/output/company';

@Component({
  selector: 'app-company-dialog',
  templateUrl: './company.dialog.html',
  styleUrls: ['./company.dialog.scss']
})
export class CompanyDialog implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private CompanyService: CompanyService,
    private providerService: ProviderService,
    public dialogRef: MatDialogRef<CompanyDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Company,
  ) {
    if (!this.data)
      this.data = new Company();
  }

  form?: FormGroup;
  isLoading?: boolean;

  async ngOnInit() {
    this._assignForm();
  }

  onSubmit = async (item: Company) => {
    if (!this._validateData())
      return;

    try {
      this.isLoading = true;

      const result = await this.CompanyService.upsert(item);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar salvar o Funcionário!')
        return;
      }

      this.providerService.toast.successMessage(result.message ?? 'Funcionário salvo com sucesso!')
      this.closeDialog();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar salvar o Funcionário!')
    }
    finally {
      this.isLoading = false;
    }
  }

  private _assignForm = async () => {

    this.form = this.formBuilder.group({
      id: [this.data.id],
      name: [this.data.name, [Validators.required]],
      cnpj: [this.data.cnpj, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14), CpfCnpjValidator()])],
      socialReason: [this.data.socialReason],
      address: [this.data.address],
      phone: [this.data.phone],
      email: [this.data.email]
    });
  };

  private _validateData = (): boolean => {
    const invalidFields = [];
    if (!this.form?.valid)
      invalidFields.push('Informe os campos corretamente!')

    if (invalidFields.length) {
      this.providerService.toast.warningMessage('Nem todos os campos foram preenchidos corretamente:<br>' + invalidFields.join('<br>'));
      return false;
    }
    else
      return true;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
