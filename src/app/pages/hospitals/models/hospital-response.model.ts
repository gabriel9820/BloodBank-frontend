import { AddressResponse } from 'src/app/shared/models/address-response.model';

interface HospitalBaseResponse {
  id: number;
  name: string;
  landlineNumber: string;
}

export interface HospitalListResponse extends HospitalBaseResponse {}

export interface HospitalDetailsResponse extends HospitalBaseResponse {
  address: AddressResponse;
}
