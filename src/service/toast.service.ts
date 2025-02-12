import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Toast {
    message: string;
    type: ToastType;
    id: number;
}

export enum ToastType {
    SUCCESS = "success", ERROR = "error", INFO = "info"
}

@Injectable({
    providedIn: 'root'
})
export class ToastService {
    private toastsSubject = new BehaviorSubject<Toast[]>([]);
    toasts$ = this.toastsSubject.asObservable();

    private currentId = 0;

    show(message: string, type: ToastType = ToastType.INFO) {
        const newToast: Toast = { message, type, id: this.currentId++ };
        this.toastsSubject.next([...this.toastsSubject.value, newToast]);

        setTimeout(() => this.remove(newToast.id), 6000);
    }

    remove(id: number) {
        const toasts = this.toastsSubject.value.filter(n => n.id !== id);
        this.toastsSubject.next(toasts);
    }
}
