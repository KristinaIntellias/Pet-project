import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators } from "@angular/forms";

import { Article } from "../../models/article.model";
import { Controls, ErrorDescription, ErrorKey } from "../../models/article-dialog.model";
import { articleDialogErrors } from "../../constants/errors";

@Component({
  selector: 'app-article-dialog',
  templateUrl: './article-dialog.component.html',
  styleUrls: ['./article-dialog.component.scss']
})
export class ArticleDialogComponent implements OnInit {
  form!: FormGroup;
  errorMap: Map<ErrorKey, ErrorDescription> = articleDialogErrors;

  constructor(
    public dialogRef: MatDialogRef<ArticleDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public formData: Article
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  submit() {
    this.dialogRef.close(
      { _id: this.formData._id, date: this.formData.date, author: this.formData.author, ...this.form.value} as Article
    );
  }

  cancel() {
    this.dialogRef.close();
  }

  getErrorMessage(control: Controls): ErrorDescription | null {
    for (let error of this.errorMap.entries()) {
      if (this.form.get(control)?.hasError(error[0])) {
        return error[1];
      }
    }
    return null;
  }

  private initForm(): void {
    this.form = new FormGroup({
      title: new FormControl(this.formData.title, [Validators.required]),
      description: new FormControl(this.formData.description, [Validators.required]),
      content: new FormControl(this.formData.content),
    });
  }
}
