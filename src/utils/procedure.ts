import type { UseMutationOptions } from '@tanstack/react-query';
import type { FieldValues } from 'react-hook-form';
import type { UseFormMutationOptions } from '~/hooks/use-form-mutation';
import type { HttpError, HttpReply } from '~/utils/http';

export { infiniteQueryOptions, queryOptions } from '@tanstack/react-query';

export const mutationOptions = <TData = HttpReply<unknown>, TParams = unknown>(
  options: UseMutationOptions<TData, HttpError, TParams>,
) => options;

export const formMutationOptions = <TData = HttpReply<unknown>, TFields extends FieldValues = FieldValues>(
  options: UseFormMutationOptions<TFields, TData>,
) => options;
