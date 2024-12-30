export interface RequestState<T> {
  isLoading: boolean;
  value?: T;
  error?: Error;
}
