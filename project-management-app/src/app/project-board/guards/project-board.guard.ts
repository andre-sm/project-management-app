import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, Observable,of, switchMap, tap } from 'rxjs';
import { BoardService } from '../services/board.service';

@Injectable({ providedIn: 'root' })
export class ProjectBoardGuard implements CanActivate {
  constructor(private router: Router,  private boardService: BoardService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const boardId = route.url[0].path;
    return this.boardService.getBoardById(boardId).pipe(
      switchMap(() => {
        return of(true);
      }),
      catchError(() => {
        this.router.navigate(['/not-found']);
        return of(false);
      })
    )
  }
}
