import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { PagedResponse } from 'src/app/shared/models/paged-response.model';
import {
  HospitalDetailsResponse,
  HospitalListResponse,
} from '../models/hospital-response.model';
import {
  HospitalCreateRequest,
  HospitalUpdateRequest,
} from '../models/hospital-request.model';

@Injectable({
  providedIn: 'root',
})
export class HospitalsService {
  constructor(private readonly http: HttpClient) {}

  getAll(pageNumber: number, pageSize: number) {
    return this.http.get<PagedResponse<HospitalListResponse>>(
      `${environment.apiUrl}/hospitals?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }

  getById(id: number) {
    return this.http.get<HospitalDetailsResponse>(
      `${environment.apiUrl}/hospitals/${id}`
    );
  }

  create(payload: HospitalCreateRequest) {
    return this.http.post<void>(`${environment.apiUrl}/hospitals`, payload);
  }

  update(id: number, payload: HospitalUpdateRequest) {
    return this.http.put<void>(
      `${environment.apiUrl}/hospitals/${id}`,
      payload
    );
  }

  delete(id: number) {
    return this.http.delete<void>(`${environment.apiUrl}/hospitals/${id}`);
  }
}
