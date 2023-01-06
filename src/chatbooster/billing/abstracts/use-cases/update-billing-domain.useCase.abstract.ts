export interface UpdateBillingDomainRequest {
  currentDomain: string;
  newDomain: string;
}

export abstract class AbstractUpdateBillingDomainUseCase {
  abstract updateDomain({
    currentDomain,
    newDomain,
  }: UpdateBillingDomainRequest): Promise<void>;
}
