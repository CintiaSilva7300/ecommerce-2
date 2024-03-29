import { Directive, EmbeddedViewRef, Input, TemplateRef, ViewContainerRef } from "@angular/core";

@Directive({
  selector: '[jvIf]',
})

export class jvIfDirective {
  private embedded!: EmbeddedViewRef<any>;

constructor(
  private vcRef: ViewContainerRef,
  private template: TemplateRef<any>
  ) {

}

@Input('jvIf') set flag(value: boolean){
  if(value){
    this.embedded = this.vcRef.createEmbeddedView(this.template);
  }else {
    this.embedded.destroy();
  }
}
}
