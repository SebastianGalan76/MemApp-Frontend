import { Component, ViewChild } from '@angular/core';
import { AutoTextareaResizeDirective } from '../../directive/auto-textarea-resize.directive';
import { FormsModule } from '@angular/forms';
import { PostContent, PostContentComponent } from '../home/post-container/post/content/content.component';
import { ApiService } from '../../../service/api.service';
import { ContentType } from '../../../model/Post';
import { ToastService, ToastType } from '../../../service/toast.service';
import { Response } from '../../../model/response/Response';
import { Router } from '@angular/router';
import { UserAvatarComponent } from "../../shared/user/avatar/avatar.component";
import { Observable } from 'rxjs';
import { UserService } from '../../../service/user.service';
import { CommonModule } from '@angular/common';
import { NickComponent } from "../../shared/user/nick/nick.component";
import { FlagSettingsComponent } from "./flag-settings/flag-settings.component";
import { HashtagSettingsComponent } from "./hashtag-settings/hashtag-settings.component";
import { User } from '../../../model/User';

interface NewPostDto {
  text: string;
  content: string;
  type: string;
  visibility: string;
  flags: string[];
  hashtags: string[];
}

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [AutoTextareaResizeDirective, FormsModule, PostContentComponent, UserAvatarComponent, CommonModule, NickComponent, FlagSettingsComponent, HashtagSettingsComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  user$: Observable<User | null>;

  @ViewChild('flagSettings') flagSettings!: FlagSettingsComponent;
  @ViewChild('hashtagSettings') hashtagSettings!: HashtagSettingsComponent;

  fileUrl: string = "";
  text: string = "";

  showPreview: boolean = false;

  fileName: string = "Nie wybrano pliku";
  selectedFile?: File;

  postContent: PostContent | null = null;
  errorMessage: string = "";

  //Flags
  nsfwFlag: boolean = false;
  spoilerFlag: boolean = false;
  racistFlag: boolean = false;

  private imageExtensions = ['png', 'jpeg', 'jpg', 'webp'];

  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private toastService: ToastService,
    private router: Router
  ) {
    this.user$ = userService.getUser();
  }

  onFileUrlChange() {
    if (this.isImageLink(this.fileUrl)) {
      this.showPreview = true;

      this.postContent = {
        id: 0,
        type: ContentType.IMAGE,
        content: this.fileUrl,
        flags: null
      };
    }
    else if (this.isTiktokUrl(this.fileUrl)) {
      const tiktokId = this.extractTikTokId(this.fileUrl);

      if (tiktokId) {
        this.showPreview = true;
        this.postContent = {
          id: 0,
          type: ContentType.TIKTOK,
          content: tiktokId,
          flags: null
        }
      }
    }
  }

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];

      if (this.selectedFile) {
        switch (this.checkFile(this.selectedFile)) {
          case 1:
            this.toastService.show("Akceptujemy jedynie rozszerzenia jpeg, png, gif i webp", ToastType.ERROR);
            return;
          case 2:
            this.toastService.show("Rozmiar pliku jest za duży", ToastType.ERROR);
            return;
        }

        this.fileName = this.selectedFile.name;
        this.createImagePreview(this.selectedFile);
        this.showPreview = true;
      }
    } else {
      this.fileName = 'Nie wybrano pliku';
      this.selectedFile = undefined;

      this.postContent = null;
    }

    this.fileUrl = "";
  }

  createPost() {
    if (!this.checkContent()) {
      return;
    }

    this.errorMessage = "";

    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('contentFile', this.selectedFile);
    }

    const newPostDto: NewPostDto = {
      text: this.text,
      content: this.postContent!.content,
      type: this.postContent!.type,
      visibility: 'PUBLIC',
      flags: this.flagSettings.getSelectedFlags(),
      hashtags: this.hashtagSettings.getHashtags(),
    }

    formData.append('newPostDto', JSON.stringify(newPostDto));

    this.apiService.post<Response>('/post/create', formData, { withCredentials: true }).subscribe({
      next: (response) => {
        this.toastService.show(response.message, ToastType.SUCCESS);
        this.router.navigate(['/']);
      },
      error: (response) => {
        if (response.error) {
          this.toastService.show(response.error.error, ToastType.ERROR);
        }
      }
    })
  }

  editContent() {
    this.showPreview = false;

    this.fileUrl = "";

    this.fileName = "Nie wybrano pliku";
    this.selectedFile = undefined;
  }

  private checkContent(): boolean {
    if (!this.postContent) {
      return false;
    }

    if (this.postContent.type == ContentType.IMAGE) {
      if (this.selectedFile) {
        const checkFileStatus = this.checkFile(this.selectedFile);

        if (checkFileStatus == 2) {
          this.errorMessage = "Akceptujemy jedynie rozszerzenia PNG, JPG, GIF i WEBP";
          return false;
        }
        if (checkFileStatus == 3) {
          this.errorMessage = "Wielkość pliku jest zbyt duża";
          return false;
        }
      }
      else {
        if (!this.isImageLink(this.fileUrl)) {
          this.errorMessage = "Wprowadziłeś nieprawidłowy link do obrazka";
          return false;
        }
      }
    }

    return true;
  }

  private isImageLink(url: string): boolean {
    if (!url) {
      return false;
    }

    const regex = new RegExp(`\\.(${this.imageExtensions.join('|')})(\\?.*)?$`, 'i');
    return regex.test(url);
  }

  private checkFile(file: File | null): number {
    if (!file) {
      return 1;
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return 2;
    }

    if (file.size > 4 * 1024 * 1024) {
      return 3;
    }

    return -1;
  }

  private createImagePreview(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.postContent = {
        id: 0,
        type: ContentType.IMAGE,
        content: reader.result as string,
        flags: null
      };
    };
    reader.readAsDataURL(file);
  }

  private isTiktokUrl(url: string): boolean {
    return url.startsWith("https://www.tiktok.com/");
  }

  private extractTikTokId(url: string): string | null {
    const match = url.match(/\/video\/(\d+)/);
    return match ? match[1] : null;
  }
}
