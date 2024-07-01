import { ZodError, ZodIssue } from 'zod';
import { IGenericErrorResponse } from '../interfaces/common';
import { IGenericErrorMessage } from '../interfaces/error';

const handleZodError = (error: ZodError): IGenericErrorResponse => {

  const errors: IGenericErrorMessage[] = error.issues.map((issue: ZodIssue) => {
    if (issue.code === 'invalid_union') {
      console.log( issue.unionErrors);

      const unionMessages = issue.unionErrors.map(unionError =>
        unionError.issues.map(unionIssue => unionIssue.message).join(' ')
      );

      return {
        path: issue.path[issue.path.length - 1] || '',
        message: unionMessages.join(' or '),
      };
    }


    return {
      path: issue.path[issue.path.length - 1] || '', 
      message: issue.message,
    };
  });

  const statusCode = 400;

  return {
    statusCode,
    message: errors.map(el=>el.message).join(' '),
    errorMessages: errors,
  };
};

export default handleZodError;