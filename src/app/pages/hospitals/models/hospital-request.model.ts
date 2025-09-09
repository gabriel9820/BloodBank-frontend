import { AddressRequest } from 'src/app/shared/models/address-request.model';

interface HospitalBaseRequest {
  name: string;
  landlineNumber: string;
  address: AddressRequest;
}

export interface HospitalCreateRequest extends HospitalBaseRequest {}

export interface HospitalUpdateRequest extends HospitalBaseRequest {}
