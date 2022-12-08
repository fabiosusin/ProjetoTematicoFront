import { ProviderService } from '../../../core/services/provider/provider.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CpfCnpjValidator } from 'src/app/core/functions/cpf-cnpj-validator.function';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/output/person';

@Component({
  selector: 'app-person-dialog',
  templateUrl: './person.dialog.html',
  styleUrls: ['./person.dialog.scss']
})
export class PersonDialog implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private PersonService: PersonService,
    private providerService: ProviderService,
    public dialogRef: MatDialogRef<PersonDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Person,
  ) {
    if (!this.data)
      this.data = new Person();
  }

  form?: FormGroup;
  isLoading?: boolean;

  async ngOnInit() {
    this._assignForm();
  }

  onSubmit = async (item: Person) => {
    if (!this._validateData())
      return;

    try {
      this.isLoading = true;

      const result = await this.PersonService.upsert(item);
      if (!result?.success) {
        this.providerService.toast.warningMessage(result?.message ?? 'Ocorreu um erro ao tentar salvar a Pessoa!')
        return;
      }

      this.providerService.toast.successMessage(result.message ?? 'Pessoa salva com sucesso!')
      this.closeDialog();
    }
    catch (e) {
      console.error('e => ', e)
      this.providerService.toast.errorMessage('Ocorreu um erro ao tentar salvar a Pessoa!')
    }
    finally {
      this.isLoading = false;
    }
  }

  private _assignForm = async () => {
    this.form = this.formBuilder.group({
      id: [this.data.id],
      name: [this.data.name, [Validators.required]],
      cpfCnpj: [this.data.cpfCnpj, Validators.compose([Validators.required, Validators.minLength(11), Validators.maxLength(14), CpfCnpjValidator()])],
      naturally: [this.data.naturally],
      motherName: [this.data.motherName],
      maritalStatus: [this.data.maritalStatus],
      birthDay: [new Date(this.data.birthDay ?? new Date())?.toISOString().split('T')[0]]
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
