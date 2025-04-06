import { Component, OnInit } from '@angular/core';
import { PostContainerComponent } from "../home/post-container/post-container.component";
import { ApiService } from '../../../service/api.service';
import { PostContainerService } from '../../../service/post-container.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ObjectResponse } from '../../../model/response/ObjectResponse';
import { Accessibility, UserCollection } from '../../../model/UserCollection';
import { UserAvatarComponent } from "../../shared/user/avatar/avatar.component";
import { NickComponent } from "../../shared/user/nick/nick.component";
import { PopularHashtagComponent } from "../home/popular-hashtag/popular-hashtag.component";
import { CollectionMenuComponent } from "./menu/menu.component";
import { ToastService, ToastType } from '../../../service/toast.service';
import { PopupService } from '../../../service/popup.service';
import { filter, switchMap, take, tap } from 'rxjs';
import { Response } from '../../../model/response/Response';
import { UserService } from '../../../service/user.service';
import { MainComponent } from '../main.component';

@Component({
  selector: 'app-user-collection',
  standalone: true,
  imports: [PostContainerComponent, UserAvatarComponent, NickComponent, PopularHashtagComponent, CollectionMenuComponent],
  templateUrl: './collection.component.html',
  styleUrl: './collection.component.scss'
})
export class UserCollectionComponent implements OnInit {
  uuid: string = "";

  collection: UserCollection | null = null;
  errorCode: number = -1;

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private postContainerService: PostContainerService,
    private toastService: ToastService,
    private route: ActivatedRoute,
    private popupService: PopupService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.uuid = params['uuid'];

      this.route.queryParams.subscribe(params => {
        var page = 1;
        if ('page' in params) {
          page = +params['page'];
        }

        this.loadPage(page - 1);
      })
    })
  }

  deleteCollection(event: MouseEvent) {
    event.stopPropagation();

    if (!this.collection) {
      return;
    }

    this.popupService.showConfirmPopup([
      { name: 'text', value: 'Czy na pewno chcesz usunąć kolekcję?' }
    ]).pipe(
      take(1),
      filter(response => response.event == 'confirm'),
      switchMap(() => this.apiService.delete<Response>(`/collection/${this.collection!.id}`, { withCredentials: true })),
      tap(response => {
        this.router.navigate(['/']);
        this.toastService.show(response.message, ToastType.SUCCESS);
      }),
      switchMap(() => this.userService.getUser()),
      tap(user => {
        if (user) {
          const index = user.ownedCollections.findIndex(collection => collection.id === this.collection!.id);
          if (index !== -1) {
            user.ownedCollections.splice(index, 1);
          }

          this.userService.saveUser(user);
        }
      })
    ).subscribe({
      error: (response) => {
        if (response.error) {
          this.toastService.show(response.error.message, ToastType.ERROR);
        }
      }
    });
  }

  editCollection($event: MouseEvent) {
    throw new Error('Method not implemented.');
  }
  copyLink(event: MouseEvent) {
    event.stopPropagation();

    const link = 'https://xmem.pl' + this.router.url;

    navigator.clipboard.writeText(link).then(() => {
      this.toastService.show('Skopiowano link do schowka');
    }).catch(err => {
      console.error('Błąd kopiowania: ', err);
    });
  }

  loadPage(page: number) {
    this.errorCode = -1;
    this.collection = null;
    this.postContainerService.load(null);

    this.apiService.get<ObjectResponse<UserCollection>>(`/collection/${this.uuid}/${page}`, { withCredentials: true }).subscribe({
      next: (response) => {
        window.scrollTo({ top: 0 });
        this.collection = response.object;

        if ((this.collection.content.number < 0 || this.collection.content.number >= this.collection.content.totalPages) && this.collection.content.number != 0) {
          this.errorCode = 300;
        }
        else {
          if (this.collection.content.totalElements == 0) {
            this.errorCode = 0;
          }
          else {
            this.postContainerService.load(response.object.content);
          }
        }
      },
      error: (response) => {
        this.errorCode = response.error.errorCode;
      }
    })
  }
}
