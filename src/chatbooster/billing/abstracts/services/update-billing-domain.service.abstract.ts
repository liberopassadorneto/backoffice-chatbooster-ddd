export interface UpdateBillingDomainRequest {
  currentDomain: string;
  newDomain: string;
}

export abstract class AbstractUpdateBillingDomainService {
  abstract updateDomain({
    currentDomain,
    newDomain,
  }: UpdateBillingDomainRequest): Promise<void>;
}
