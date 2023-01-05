export interface UpdateBillingDomainRequest {
  currentDomain: string;
  newDomain: string;
}

export abstract class UpdateBillingDomainUseCaseAbstract {
  abstract updateDomain({
    currentDomain,
    newDomain,
  }: UpdateBillingDomainRequest): Promise<void>;
}
