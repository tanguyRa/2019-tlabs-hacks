export interface RequestRequirement {
  requestId: string;
  company: string;
  paymentPerSample: number;
  requirements: Array<Requirement>
}

export interface Requirement {
  diagnotic: string;
  startDate: string;
  endDate: string;
  items: Array<string>;
}