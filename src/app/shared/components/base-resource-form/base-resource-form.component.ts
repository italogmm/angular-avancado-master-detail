import {OnInit, AfterContentChecked, Injector} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { switchMap } from "rxjs/operators";
import toastr from "toastr";
import {BaseResourceModel} from '../../models/base-resource.model';
import {BaseResourceService} from '../../services/base-resource.service';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitle: string;
  serverErrorMessages: string[] = null;
  submittingForm: boolean = false;

  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    protected resourceService: BaseResourceService<T>,
    protected jsonDataToResourceFn: (jsonData) => T
  ) {
    this.route = this.injector.get(ActivatedRoute);
    this.router = this.injector.get(Router);
    this.formBuilder = this.injector.get(FormBuilder);
  }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(){
    this.setPageTitle();
  }

  submitForm(){
    this.submittingForm = true;
    if(this.currentAction == "new"){
      this.createResource();
    }else{
      this.updateResource();
    }
  }

  protected setCurrentAction(){
    if(this.route.snapshot.url[0].path == "new"){
      this.currentAction = "new";
    }else{
      this.currentAction = "edit"
    }
  }

  protected loadResource(){
    if(this.currentAction == "edit"){
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getById(+params.get("id")))
      )
        .subscribe(
          (resource) => {
            this.resource = resource;
            this.resourceForm.patchValue(resource) //binds loaded resource data to resourceForm
          },
          (error) => alert("Ocorreu um erro no servidor, tente mais tarde")
        )
    }
  }

  protected setPageTitle(){
    if(this.currentAction == "new"){
      this.pageTitle = this.creationPageTittle();
    }else{
      const categoryName = this.category.name || "";
      this.pageTitle = `Editando Categoria: ${categoryName}`;
    }
  }

  protected createResource(){
    const category: Category = Object.assign(new Category(), this.resourceForm.value);
    this.categoryService.create(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      );
  }

  protected actionsForSuccess(category : Category){
    toastr.success("Solicitação processada com sucesso!");

    // redirect/reload component page
    this.router.navigateByUrl('categories', {skipLocationChange: true}).then(
      () => this.router.navigate(['categories', category.id, 'edit'])
    );
  }

  protected actionsForError(error){
    toastr.error("Ocorreu um erro ao processar a sua solicitação!");
    this.submittingForm = false;
    if(error.status === 422){
      this.serverErrorMessages = JSON.parse(error._body).errors; //de acordo com o backend
    }else{
      this.serverErrorMessages = ["Falha na comunicação com o servidor. Por favor, tente mais tarde."]
    }
  }

  protected updateResource(){
    const category: Category = Object.assign(new Category(), this.resourceForm.value);
    this.categoryService.update(category)
      .subscribe(
        category => this.actionsForSuccess(category),
        error => this.actionsForError(error)
      );;
  }

  protected creationPageTittle() {
    return '';
  }
}
