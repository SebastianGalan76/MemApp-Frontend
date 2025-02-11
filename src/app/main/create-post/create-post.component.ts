import { Component } from '@angular/core';
import { AutoTextareaResizeDirective } from '../../directive/auto-textarea-resize.directive';
import { FormsModule } from '@angular/forms';
import { ContentType, PostContent, PostContentComponent } from '../home/post-container/post/content/content.component';
import { ApiService } from '../../../service/api.service';

interface NewPostDto {
  text: string;
  content: string;
  type: string;
  visibility: string;
}

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [AutoTextareaResizeDirective, FormsModule, PostContentComponent],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  fileUrl: string = "";
  text: string = "";

  showPreview: boolean = false;

  fileName: string = "Nie wybrano pliku";
  selectedFile?: File;

  postContent: PostContent | null = null;

  private imageExtensions = ['png', 'jpeg', 'jpg', 'webp'];

  constructor(
    private apiService: ApiService
  ) { }

  onFileUrlChange() {
    if (this.isImageLink(this.fileUrl)) {
      this.showPreview = true;

      this.postContent = {
        type: ContentType.IMAGE,
        content: this.fileUrl
      };
    }
    else if (this.isTiktokUrl(this.fileUrl)) {
      const tiktokId = this.extractTikTokId(this.fileUrl);

      if (tiktokId) {
        this.showPreview = true;
        this.postContent = {
          type: ContentType.TIKTOK,
          content: tiktokId
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
            //this.notificationService.showNotification("Akceptujemy jedynie rozszerzenia jpeg, png, gif i webp", NotificationType.ERROR);
            return;
          case 2:
            //this.notificationService.showNotification("Rozmiar pliku jest za duży", NotificationType.ERROR);
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
    const formData: FormData = new FormData();

    if (this.selectedFile) {
      formData.append('contentFile', this.selectedFile);
    }

    const newPostDto: NewPostDto = {
      text: this.text,
      content: '',
      type: 'IMAGE',
      visibility: 'PUBLIC',
    }

    formData.append('newPostDto', JSON.stringify(newPostDto));

    this.apiService.post<Response>('/post/create', formData, { withCredentials: true }).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (response) => {
        if (response.error) {
          console.log(response);
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
        type: ContentType.IMAGE,
        content: reader.result as string
      };
    };
    reader.readAsDataURL(file);
  }

  private isTiktokUrl(url: string): boolean {
    return url.startsWith("https://www.tiktok.com/");
  }

  private extractTikTokId(url: string): string | null {
    const match = url.match(/\/video\/(\d+)\?/);
    return match ? match[1] : null;
  }
}
