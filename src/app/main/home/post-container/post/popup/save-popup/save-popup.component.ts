import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { PopupComponent } from '../../../../../../shared/popup-container/popup/popup.component';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../../../../../../service/api.service';
import { ObjectResponse } from '../../../../../../../model/response/ObjectResponse';
import { UserMemeList } from '../../../../../../../model/UserMemeList';
import { User, UserService } from '../../../../../../../service/user.service';
import { HttpParams } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { Response } from '../../../../../../../model/response/Response';
import { Post } from '../../../../../../../model/Post';
import { debounceTime, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { ToastService, ToastType } from '../../../../../../../service/toast.service';

class ListElement {
  list!: UserMemeList;
  isSelected!: boolean;
}

@Component({
  selector: 'meme-save-popup',
  standalone: true,
  imports: [FormsModule, RouterLink, NgClass],
  templateUrl: './save-popup.component.html',
  styleUrl: './save-popup.component.scss'
})
export class SaveMemePopupComponent implements AfterViewInit, OnDestroy {
  @ViewChild('listContainer', { read: ViewContainerRef }) listContainer!: ViewContainerRef;
  @ViewChild('listTemplate', { read: TemplateRef }) listTemplate!: TemplateRef<any>;

  @Input({ required: true }) post!: Post;

  listElements: ListElement[] = [];

  formErrorMessage: string | null = null;
  isFormVisible: boolean = false;

  listName: string = '';
  accessibility: string = 'PUBLIC';

  user: User | null = null;

  private requestSubject = new Subject<ListElement>();
  private destroy$ = new Subject<void>();

  constructor(
    private parent: PopupComponent,
    private apiService: ApiService,
    private userService: UserService,
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {
    this.requestSubject.pipe(
      debounceTime(500),
      switchMap((element) => this.sendRequest(element)),
      takeUntil(this.destroy$)
    ).subscribe();
  }

  ngAfterViewInit(): void {
    this.userService.getUser().subscribe({
      next: (user) => {
        this.user = user;
        this.cdr.detectChanges();
        this.populateContainer();
      },
      error: (err) => {
        console.error('Błąd pobierania użytkownika:', err);
      }
    });
  }

  createList() {
    if (!this.user) {
      this.formErrorMessage = 'Zaloguj się, aby tworzyć listy';
      return;
    }

    if (this.listName.length == 0) {
      this.formErrorMessage = 'Wprowadź nazwę listy';
      return;
    }
    this.formErrorMessage = null;

    const params = new HttpParams()
      .set('name', this.listName.trim())
      .set('accessibility', this.accessibility);

    this.apiService.post<ObjectResponse<UserMemeList>>(
      "/user-post-list/create", null, { withCredentials: true, params: params })
      .subscribe({
        next: (response) => {
          this.isFormVisible = false;
          this.createListElement(response.object);

          this.user!.ownedMemeLists.push(response.object);
          this.userService.saveUser();

          this.toastService.show(response.message, ToastType.SUCCESS);

          this.listName = "";
          this.accessibility = "PUBLIC";
        },
        error: (response) => {
          this.formErrorMessage = response.error?.message || 'Wystąpił błąd';
        }
      })
  }

  selectList(element: ListElement) {
    element.isSelected = !element.isSelected;

    this.requestSubject.next(element);
  }

  private sendRequest(element: ListElement): Observable<Response> {
    return this.apiService.post<Response>("/user-post-list/save/" + this.post.id + "/" + element.list.id, null, { withCredentials: true })
      .pipe(tap(() => {
        if (element.isSelected) {
          this.post.user.postListIds.push(element.list.id);

          this.toastService.show("Dodano post do listy " + element.list.name);
        }
        else {
          this.post.user.postListIds = this.post.user.postListIds.filter(id => id != element.list.id);

          this.toastService.show("Usunięto post z listy " + element.list.name);
        }
      })
      );
  }

  private populateContainer() {
    if (this.listContainer && this.user) {
      this.listContainer.clear();

      this.user.ownedMemeLists.forEach(list => {
        this.createListElement(list);
      });
    }
  }

  private createListElement(list: UserMemeList): void {
    const element = {
      list: list,
      isSelected: this.post.user.postListIds.includes(list.id)
    }

    this.listElements.push(element);
    this.listContainer.createEmbeddedView(this.listTemplate, { element: element });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  close() {
    this.parent.close();
  }
}
